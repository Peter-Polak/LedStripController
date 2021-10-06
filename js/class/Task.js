class Task
{
    id;
    name;
    description;
    
    callback;
    
    constructor(id, name, description, callback)
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.callback = callback;
    }
    
    
    
    async execute()
    {
        let scheduler = cordova.plugins.notification.local;
        let now = new Date().getTime();
        let scheduledTime = new Date(now + (5 * 1000));
        
        let notification = 
        {
            id: 2,
            title: "LED Strip Controller",
            text: "Testing",
            trigger: { at : now + 5000 },
            data: { stripId: 2, action: "TurnOn" }
        };

        scheduler.schedule(notification);
        
        // scheduler.on
        // (
        //     "trigger", 
        //     async (notification) => 
        //     {
        //         console.log("triggered with data ", notification);
        //         console.log("application = ", application);
        //         console.log(await application.stripManager.getStripByID(notification.data.stripId));
        //         if( == "TurnOn")
        //         {
        //             let strip = await application.stripManager.getStripByID(notification.data.stripId);
        //             strip.turnOn();
                    
                    
        //         }
        //     }
        // );
    }
    
    
}