// Executed code
var colorPicker;

initializePage();



// Events

$("main").on(
    "mouseup",
    "#writeButton",
    function()
    {
        application.nfcManager.registerWriteListeners();        
    }
);

$("main").on(
    "mouseup",
    "#backButton",
    function()
    {
        window.location = "../html/home.html";
    }
);


$("main").on(
    "change",
    "#actionSelect",
    async function()
    {
        if($("#actionSelect").val() == "SetRGB")
        {
            colorPicker = new ColorPicker(1);
            await colorPicker.render();
            colorPicker.initialize(0, 0, 0);
            colorPicker.registerListeners();
        }
        else
        {
            $("#colorContainer").html("");
        }
    }
);

$(document).on(
    "backbutton",
    function()
    {
        window.location = "../html/home.html";
    }
);



// Functions

async function initializePage()
{
    await application.initialized;
    
    let strips = await application.stripManager.getStrips();
    
    let buttonLocalisation = await application.renderer.getLocalisation("button");
    let stripView = 
    {
        "strips" : strips,
        buttons : 
        [
            buttonLocalisation.back,
            buttonLocalisation.write
        ]
    };
    
    return application.renderer.render("main", "nfc", "nfc", stripView, { button : await application.renderer.getTemplate("button") });
}