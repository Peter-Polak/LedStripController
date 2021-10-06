// Executed code

initializePage();



// Events

$(document).on(
    "backbutton",
    function()
    {
        navigator.app.exitApp();
    }
);

var loadingScreen;

// Functions

async function initializePage()
{
    let strips = await application.stripManager.getStrips();
    
    loadingScreen = new StatusScreen("loading");
    await loadingScreen.render();
    
    await renderPage(strips);
    registerListeners(strips);
}

async function renderPage(strips)
{
    let view = 
    {
        "strips" : strips
    };
    
    return application.renderer.render("main", "home", "home", view, {}, [], loadingScreen.delete);
}

function registerListeners(strips)
{
    $("#newStripSelection").on
    (
        "mouseup",
        function()
        {
            window.location = "../html/newStrip.html";
        }
    );
    
    strips.forEach(
        (strip) =>
        {
            $(`#strip${strip.id}`).on
            (
                "mouseup",
                function()
                {
                    window.location = "../html/strip.html?index=" + strip.id;
                }
            ); 
        }
    );
}