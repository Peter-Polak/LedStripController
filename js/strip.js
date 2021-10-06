// Executed code
var strip;
var connection;
var colorPicker;

initializePage();



// Events

$("main").on
(
    "mouseup",
    "#turnOnButton",
    function()
    {
        $("#turnOnButton, #turnOffButton").toggleClass("visible hidden");
        strip.turnOn();
    }
);

$("main").on
(
    "mouseup",
    "#turnOffButton",
    function()
    {
        // $("#turnOnButton").removeClass("hidden").addClass("visible");
        // $("#turnOffButton").removeClass("visible").addClass("hidden");
        $("#turnOnButton, #turnOffButton").toggleClass("visible hidden");
        strip.turnOff();
    }
);

$("main").on
(
    "mouseup",
    "#deleteButton",
    function()
    {
        application.stripManager.removeStrip(parseInt(parameters["index"]));
        window.location = "../html/home.html";
    }
);

$("main").on
(
    "mouseup",
    "#backButton",
    function()
    {
        // window.location = "../html/home.html";
        window.location = "../html/pattern.html?index=" + strip.id;
    }
);


// Functions

function getStrip(id)
{
    return application.stripManager.strips[id];
}

async function renderStrip(strip)
{
    let buttonLocalisation = await application.renderer.getLocalisation("button");
    let view = 
    {
        strip : strip,
        buttons : 
        {
            power: 
            [
                buttonLocalisation.turnOn,
                buttonLocalisation.turnOff
            ],
            footer:
            [
                buttonLocalisation.back,
                buttonLocalisation.delete
            ]
        }
    };
    
    let buttons = [new Button("turnOn", "#powerButtonsContainer"), new Button("turnOff", "#powerButtonsContainer"), new Button("back", "footer"), new Button("delete", "footer")];
    
    // buttons.forEach
    // (
    //     async component => 
    //     {
    //         await component.initialize();
    //     }
    // );
    let isOn = await strip.getPower();
    let afterRender = async function()
    {
        switchPowerButtonState(isOn);
    }

    return new Promise
    (
        async (resolve) =>
        {
            await application.renderer.render("main", "strip", "strip", view, { button : await application.renderer.getTemplate("button") }, undefined, afterRender);
            // await application.renderer.render("main", "strip", "strip", view, { }, buttons, afterRender);
            
            colorPicker = new ColorPicker(1, (red, green, blue) => strip.setStripRgb(red, green, blue));
            await colorPicker.render();
            
            let leds = await strip.getLeds();
            colorPicker.initialize(leds[0].red, leds[0].green, leds[0].blue);
            colorPicker.registerListeners();
            
            resolve("rendered");
        }
    );
}

async function initializePage()
{
    await application.initialized;

    loadingScreen = new StatusScreen("loading");
    await loadingScreen.render();
    
    strip = getStrip(parseInt(parameters["index"], 10));
    
    connectToStripHub();
    // console.log(connectToStripHub().catch
    // (
    //     async () =>
    //     {
    //         loadingScreen.delete();
    //         let errorScreen = new StatusScreen("networkError");
    //         await errorScreen.render();
    //     }
    // ));

    
    await renderStrip(strip);
    
    loadingScreen.delete();
}


async function connectToStripHub()
{
    connection = await application.signalrManager.connectToServer(strip.ip, "striphub", "ReceiveStrip");
    connection.on(
        "ReceiveStrip", 
        (strip) =>
        {
            console.log(strip);
            colorPicker.initialize(strip.leDs[0].red, strip.leDs[0].green, strip.leDs[0].blue);
            
            switchPowerButtonState(strip.isOn);
        }
    );
}

function switchPowerButtonState(isOn)
{
    $("#turnOnButton, #turnOffButton").removeClass("visible hidden");
    if(isOn)
    {
        $("#turnOnButton").addClass("hidden");
        $("#turnOffButton").addClass("visible");
    }
    else
    {
        $("#turnOnButton").addClass("visible");
        $("#turnOffButton").addClass("hidden");
    }
}