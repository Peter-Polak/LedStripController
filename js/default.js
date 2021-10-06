// Executed code

// renderLoadingScreen();
var application = new Application();
var parameters = application.getParameters();
application.initialize();


// if(application.localStorage.getItem("isNewUser") == null)
// {
//     application.notificationManager.newNotification(new Notification(1, "LED Strip Controller", "Welcome!", undefined, undefined,  "🚥", undefined, "👋"));
//     application.localStorage.setItem("isNewUser", false);
// }



// Events

$("main").on(
    "focus", 
    "input",
    function()
    {
        $(this).select();
});



// Functions

function renderHeader()
{
    
}