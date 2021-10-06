class StripManager
{
    strips = {};
    
    constructor()
    {
        
    }
    
    async initialize()
    { 
        let strips = await this.getStrips();
        
        strips.forEach(
            (strip) =>
            {
                this.strips[strip.id] = new Strip(strip.id ,strip.name, strip.length, strip.ledsPerMeter, strip.ip);
            }
        );
        
        return strips;
    }
    
    // saveStrips()
    // {
    //     if(this.strips.length == 0)
    //     {
    //         localStorage.clear();
    //     }
    //     else
    //     {
    //         this.strips.forEach
    //         (
    //             function(strip, index)
    //             {
    //                 localStorage.setItem("strip" + index, strip.name + "," + strip.length + "," + strip.ledsPerMeter + "," + strip.ip);
    //             }
    //         )
    //     }
    // }
    
    addNewStrip(newStrip)
    {
        // let isDuplicate = null;
        // isDuplicate = this.strips.find
        // (
        //     function(strip, index)
        //     {
        //         return newStrip.name == strip.name;
        //     }
        // );
        
        // if(isDuplicate == null)
        // {
        //     this.strips.push(newStrip);
        // }
        // else
        // {
        //     //Notify user
        // }
        let strip =
        {
            "name": newStrip.name,
            "length": newStrip.length,
            "ledsPerMeter": newStrip.ledsPerMeter,
            "ip": newStrip.ip
        };
        
        application.databaseManager.addItem("strips", strip);
    }
    
    removeStrip(index)
    {
        application.databaseManager.removeItem("strips", index);
    }
    
    clearStrips()
    {
        // this.strips.length = 0;
    }
    
    async getStrips()
    {
        let strips = await application.databaseManager.getAllItems("strips");
        
        return strips;
    }
    
    getStripByName(name)
    {
        return this.strips.find(strip => strip.name == name);
    }
    
    async getStripByID(id)
    {
        let strip = await application.databaseManager.getItemByID("strips", id);
        
        strip = new Strip(strip.id, strip.name, strip.length, strip.ledsPerMeter, strip.ip);
        
        return strip;
    }
}