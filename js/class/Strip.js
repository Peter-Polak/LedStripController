class Strip
{
    id;
    name;
    length;
    ledsPerMeter;
    ip;
    
    constructor(id, name, length, ledsPerMeter, ip)
    {
        this.id = id;
        this.name = name;
        this.length = length;
        this.ledsPerMeter = ledsPerMeter;
        this.ip = ip;
    }

    
    async setStripRgb(red, green, blue)
    {
        let query = "?red=" + red + "&green=" + green + "&blue=" + blue;
        
        $.ajax
        ({
            type: 'PUT',
            url: "http://" + this.ip + "/api/strip/leds/rgb" + query,
            timeout: 2000,
            success:
            () =>
            {
                try
                {
                    connection.invoke("SendStrip");
                }
                catch
                {
                    
                }
            },
        });
        
    }
    
    async getLeds(handler)
    {
        return $.ajax
        ({
            type: 'GET',
            url: "http://" + this.ip + "/api/strip/leds",
            timeout: 2000,
            beforeSend:
            () =>
            {
                // application.notificationManager.newProgress(this.name + " - Load strip");
            },
            success:
            (leds) =>
            {
                if(handler != undefined) handler(leds);
                
                application.notificationManager.interuptCurrentNotification();
                application.notificationManager.newStatus(this.name + " - Load strip", "Succes!");
            },
            error:
            (error, two, three) =>
            {
                console.log(error);
                console.log(two);
                console.log(three);
                application.notificationManager.interuptCurrentNotification();
                application.notificationManager.newError(this.name + " - Load strip", error.statusText);
            }      
        });
    }
    
    async clearStrip()
    {
        $.ajax
        ({
            type: 'DELETE',
            url: "http://" + this.ip + "/api/strip/leds",
            timeout: 2000,
            beforeSend:
            () =>
            {
                // application.notificationManager.newProgress(this.name + " - Clear");
            },
            success:
            () =>
            {
                application.notificationManager.interuptCurrentNotification();
                application.notificationManager.newStatus(this.name + " - Clear", "Succes!");
            },
            error:
            (error) =>
            {
                console.log(error);
                application.notificationManager.interuptCurrentNotification();
                application.notificationManager.newError(this.name + " - Clear", error.statusText);
            }  
        });
    }
    
    async turnOn()
    {
        let query = "?ison=true";
        
        $.ajax
        ({
            type: 'PUT',
            url: "http://" + this.ip + "/api/strip/power" + query,
            // data: data,
            // dataType: "json",
            // contentType:"application/json;charset=UTF-8",
            timeout: 2000,
            beforeSend:
            () =>
            {
                // application.notificationManager.newProgress(this.name + " - Turn on", );
            },
            success:
            () =>
            {
                connection.invoke("SendStrip");
                application.notificationManager.interuptCurrentNotification();
                application.notificationManager.newStatus(this.name + " - Turn on", "Succes!");
            },
            error:
            (error) =>
            {
                console.log(error);
                application.notificationManager.interuptCurrentNotification();
                application.notificationManager.newError(this.name + " - Turn on", error.statusText);
            }  
        });
    }
    
    async turnOff()
    {
        let query = "?ison=false";
        
        $.ajax
        ({
            type: 'PUT',
            url: "http://" + this.ip + "/api/strip/power" + query,
            /*data: data,
            dataType: "json",
            contentType:"application/json;charset=UTF-8",*/
            timeout: 2000,
            beforeSend:
            () =>
            {
                // application.notificationManager.newProgress(this.name + " - Turn off");
            },
            success:
            () =>
            {
                connection.invoke("SendStrip");
                application.notificationManager.interuptCurrentNotification();
                application.notificationManager.newStatus(this.name + " - Turn off", "Succes!");
            },
            error:
            (error) =>
            {
                console.log(error);
                application.notificationManager.interuptCurrentNotification();
                application.notificationManager.newError(this.name + " - Turn off", error.statusText);
            }   
        });
    }
    
    async switchPower()
    {
        $.ajax
        ({
            type: 'PUT',
            url: "http://" + this.ip + "/api/strip/power/switch",
            /*data: data,
            dataType: "json",
            contentType:"application/json;charset=UTF-8",*/
            timeout: 2000,
            beforeSend:
            () =>
            {
                // application.notificationManager.newProgress(this.name + " - Turn off");
            },
            success:
            () =>
            {
                connection.invoke("SendStrip");
                application.notificationManager.interuptCurrentNotification();
                application.notificationManager.newStatus(this.name + " - Turn off", "Succes!");
            },
            error:
            (error) =>
            {
                console.log(error);
                application.notificationManager.interuptCurrentNotification();
                application.notificationManager.newError(this.name + " - Turn off", error.statusText);
            }   
        });
    }
    
    async getPower()
    {
        return new Promise
        (
            (resolve) =>
            {
                $.ajax
                (
                    {
                        type: 'GET',
                        url: "http://" + this.ip + "/api/strip/power",
                        timeout: 2000,
                        success:
                        (value) =>
                        {
                            resolve(value);
                        },
                        error:
                        (error) =>
                        {
                            resolve(error);
                        }
                    }
                );
            }
        );
    }
}