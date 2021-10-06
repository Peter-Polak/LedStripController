class Application
{
    localStorage;
    databaseManager;
    
    renderer;
    
    settingsManager;
    nfcManager;
    notificationManager;
    stripManager;
    
    initialized;
    
    menu;
    
    constructor()
    {
        this.localStorage = window.localStorage;
        this.databaseManager = new DatabaseManager();
        this.settingsManager = new SettingsManager();
        this.signalrManager = new SignalrManager();
        
        const language = this.settingsManager.getLanguage();
        const languageCode = this.settingsManager.getLanguageCode(language);
        const localisationPath = `../localisation/${languageCode}/`;
        const templatePath = "../mustache-templates/";

        this.renderer = new Renderer(localisationPath, templatePath);
        
        this.notificationManager = new NotificationManager();
        this.nfcManager = new NFCManager();
        this.stripManager = new StripManager();
        
        $(document).on('deviceready', () => this.onDeviceReady());
    }
    
    initialize()
    {
        this.initialized = new Promise
        (
            async (resolve) =>
            {
                await this.databaseManager.initializedPromise;
                await this.stripManager.initialize();
                
                
                this.menu = new Menu();
                await this.menu.render();
                this.menu.registerListeners();
                
                resolve(this.stripManager.strips);
            }
        );
        
        return this.initialized;
    }
    
    onDeviceReady()
    {
        console.log("[onDeviceReady] Device ready.");
        
        var splitUrl = window.location.pathname.split('/');
        if(!splitUrl.includes("nfc.html"))
        {
            this.nfcManager.registerReadListeners();
        }
        
        // let scheduler = cordova.plugins.notification.local;
        // scheduler.on
        // (
        //     "trigger", 
        //     async (notification) => 
        //     {
        //         let strip = await application.stripManager.getStripByID(notification.data.stripId);
                
        //         switch(notification.data.action)
        //         {
        //             case "TurnOn":
        //             {
        //                 strip.turnOn();
        //                 break;
        //             }
        //             case "TurnOff":
        //             {
        //                 strip.turnOff();
        //                 break;
        //             }
        //         }
        //     }
        // );
    }
    
    
    // async onTrigger(notification)
    // {
    //     console.log("this", this);
    //     console.log(`Notification #${notification.id} triggered.`, notification);
    //     this.stripManager.strips[notification.id].turnOff();
    // }
    
    reset()
    {
        this.settingsManager.setSettingsToDefault();
        this.settingsManager.saveSettings();
        
        this.stripManager.clearStrips();
        this.stripManager.saveStrips();
    }
    
    getParameters()
    {
        let parameters = {};
        
        location.search.substr(1).split('&').forEach(
            parameter => 
            {
                parameters[parameter.split('=')[0]] = parameter.split('=')[1];
            }
        );
        
        return parameters;
    }
}