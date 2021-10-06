// Executed code

initializePage().then(
    () => 
    {
        $("#languageSelect").val(application.settingsManager.getLanguage()); // Load current language value
    }
);



// Events

// Discard settings
$("main").on
(
    "mouseup",
    "#backButton",
    function()
    {
        window.location = "../html/home.html";
    }
);

// Save settings
$("main").on
(
    "mouseup",
    "#saveButton",
    function()
    {
        let language = $("#languageSelect").val();
        
        application.settingsManager.setLanguage(language);
        application.settingsManager.saveSettings();
        
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

async function initializePage()
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
    
    return application.renderer.render("main", "settings", "settings", view, { button : await application.renderer.getTemplate("button") });
}