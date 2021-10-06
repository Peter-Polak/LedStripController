// Executed code

initiliazePage();



// Events

$("main").on
(
    "mouseup",
    "#saveButton",
    function()
    {
        let name = $("#nameValue").val();
        let length = $("#lengthValue").val();
        let ledsPerMeter = $("#ledsPerMeterValue").val();
        let IP = $("#ipValue").val();
        
        let strip = new Strip(null, name, length, ledsPerMeter, IP);
        
        application.stripManager.addNewStrip(strip);
        // application.stripManager.saveStrips();
        
        window.location = "../html/home.html";
    }
);

$("main").on
(
    "mouseup",
    "#backButton",
    function()
    {
        window.location = "../html/home.html";
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

async function initiliazePage()
{
    await application.initialized;
    
    let buttonLocalisation = await application.renderer.getLocalisation("button");
    let view = 
    {
        buttons : 
        [
            buttonLocalisation.back,
            buttonLocalisation.save
            
        ]
    };
    
    return application.renderer.render("main", "newStrip", "newStrip", view, { button : await application.renderer.getTemplate("button") });
}