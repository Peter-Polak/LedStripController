var strip;

initializePage();


async function initializePage()
{
    await application.initialized;
    let stripId = parseInt(parameters["index"], 10);
    strip = application.stripManager.strips[stripId];
    
    renderPage();
    addListeners();
}

async function renderPage()
{
    let buttonLocalisation = await application.renderer.getLocalisation("button");
    let view = 
    {
        stripName : strip.name,
        buttons : 
        {
            footer:
            [
                buttonLocalisation.back,
                buttonLocalisation.save
            ]
        }
    };
    
    let partialTemplates = 
    { 
        led: await application.renderer.getTemplate("led"), 
        button : await application.renderer.getTemplate("button")
    };
    
    await application.renderer.render("main", "pattern", "pattern", view, partialTemplates, undefined, undefined);
    renderLeds($("input[type=number]").val());
}

function addListeners()
{
    $("main").on
    (
        "change",
        "input[type=number]",
        function()
        {
            let numOfLeds = $("input[type=number]").val();
            renderLeds(numOfLeds);
        }
    );
    
    $("main").on
    (
        "mouseup",
        "#backButton",
        function()
        {
            window.location = "../html/strip.html?index=" + strip.id;
        }
    );
    
    $("main").on
    (
        "mouseup",
        "#saveButton",
        function()
        {
            console.log("save");
        }
    );
}

async function renderLeds(numOfLeds)
{
    let leds = "";
    
    
    for (let index = 0; index < numOfLeds; index++)
    {
        let view = 
        {
            id : index
        };
        
        leds += await application.renderer.getElements("led", "led", view);
    }
    $("#ledsContainer").html(leds);
}

function setPattern()
{
    
}