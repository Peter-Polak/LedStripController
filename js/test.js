var strip;
var notification0, notification1, notification2;

initializePage();



async function initializePage()
{
    await application.initialized;
    renderStripMenu();
    // application.stripManager.getStrips().then
    // (
    //     (strips) => 
    //     {
    //         strip = strips.find( strip => strip.name == "Home");
    //         console.log(strip);
            
    //         // var loops = 2;
            
    //         // while(loops > 0)
    //         // {
    //         //     for(i = 0; i < 360; i++)
    //         //     {
    //         //         setTimeout(400, setHSV(i, 100, 30));
    //         //     }
                
    //         //     loops--;
    //         // }
            
    //         setHSV(100, 100, 10);
    //     }
    // ); 
    
    
    
    
    
    // var popup = new Popup("😟", "NFC disabled!");
    
    // var callbacks = 
    // {
    //     cancel : 
    //     {
    //         callback : console.log,
    //         args : "Cancel"
    //     },
    //     ok : 
    //     {
    //         callback : console.log,
    //         args : "OK"
    //     }
    // };
    
    // popup.addButton("ok", "OK", "primary");
    // popup.render();
    // popup.registerEventListeners(callbacks);
    
    // let button = new Button("delete", "main");
    // await button.initialize();
    // button.render();
    
    // ledsTest();
    
    // taskTest();
}

function setHSV(hue, saturation, value)
{
    let query = "?hue=" + hue + "&saturation=" + saturation + "&value=" + value;
        
    $.ajax
    ({
        type: 'PUT',
        url: "http://" + strip.ip + "/api/strip/leds/hsv" + query,
        timeout: 2000,
        success:
        () =>
        {
            // connection.invoke("SendStrip");
        },
    });
}

function notificationTest()
{
    notification0 = new Notification(0, "Test0", "Testing0");
    notification1 = new Notification(1, "Test1", "Testing1");
    notification2 = new Notification(2, "Test2", "Testing2");
    application.notificationManager.newNotification(notification0);
    application.notificationManager.newNotification(notification1);
    application.notificationManager.newNotification(notification2);
}

function newNotification()
{
    let notification0 = new Notification(0, "Test0", "Testing0");
    application.notificationManager.newNotification(notification0);
}

async function ledsTest()
{
    await application.initialized;
    let leds = await application.stripManager.strips[17].getLeds();
    console.log(leds);
    // let leds =
    // [
    //     {id : 0, value : "#000000"}, {id : 1, value : "#000000"}, {id : 2, value : "#000000"}, {id : 3, value : "#000000"}, {id : 4, value : "#000000"}, {id : 5, value : "#000000"}, {id : 6, value : "#000000"}, {id : 6, value : "#000000"}, {id : 6, value : "#000000"}, {id : 6, value : "#000000"}, {id : 6, value : "#000000"}, {id : 6, value : "#000000"}, {id : 6, value : "#000000"}, {id : 6, value : "#000000"}, {id : 6, value : "#000000"}, {id : 6, value : "#000000"}, {id : 6, value : "#000000"}, {id : 6, value : "#000000"}, {id : 6, value : "#000000"}, {id : 6, value : "#000000"}, {id : 6, value : "#000000"}, {id : 6, value : "#000000"}, {id : 6, value : "#000000"}, {id : 6, value : "#000000"}
    // ];
    
    let buttons =
    {
        
    };
    
    let view = 
    {
        leds, ...buttons, strip: {name: "Home"}
    };
    
    application.renderer.render("main", "leds", "leds", view, {led : await application.renderer.getTemplate("led") });
}

function taskTest()
{
    var task = new Task();
    task.execute();
}

async function renderStripMenu()
{
    let buttonLocalisation = await application.renderer.getLocalisation("button");
    let view = 
    {
        strip : strip,
        buttons : 
        {
            modes: 
            [
                buttonLocalisation.solidColor,
                buttonLocalisation.pattern,
                buttonLocalisation.fade,
                buttonLocalisation.blink
            ],
            footer:
            [
                buttonLocalisation.back,
                buttonLocalisation.delete
            ]
        }
    };
    
    return new Promise
    (
        async (resolve) =>
        {
            await application.renderer.render("main", "strip", "strip", view, { button : await application.renderer.getTemplate("button") }, undefined, afterRender);
            // await application.renderer.render("main", "strip", "strip", view, { }, buttons, afterRender);
            
            resolve("rendered");
        }
    );
}