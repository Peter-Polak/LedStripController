class NFCManager
{
    static actions = 
    {
        actionElement: "#actionSelect",
        TurnOn : 
        {
            elements: ["#stripSelect"],
            execute: function(args)
            {
                application.stripManager.strips[args[0]].turnOn();
            }
        },
        TurnOff :
        {
            elements: ["#stripSelect"],
            execute: function(args)
            {
                application.stripManager.strips[args[0]].turnOff();
            }
        },
        SetRGB : 
        {
            elements: ["#stripSelect", "#redValue", "#greenValue", "#blueValue"],
            execute: function(args)
            {
                application.stripManager.strips[args[0]].setStripRgb(args[1], args[2], args[3]);
            }
        }
    };

    constructor()
    {
        
    }


    async registerWriteListeners()
    {
        let handler = this.overwriteTag;
        
        let popup = new Popup("⏳");
    
        let callbacks = 
        {
            cancel : 
            {
                callback : this.removeWriteListeners,
                args : handler
            }
        };
        
        await popup.render("nfc", "write");
        popup.registerEventListeners(callbacks);
        
        this.addAnyTagListener(handler); // For any non-mime tags of type "app/ledstripcontroller".
        this.addMimeListener(handler); // Only for "app/ledstripcontroller" mime tags. (Have to use addMimeListener because it is the only listener that works if app has an intent in Android manifest for specific mime type tag)
    }
    
    registerReadListeners()
    {
        this.addMimeListener(this.mimyTypeHandler);
    }
    
    removeWriteListeners(handler)
    {
        nfc.removeTagDiscoveredListener
        (
            handler,
            function(status)
            {
                console.log("[removeTagDiscoveredListener - Succes] : Removed listener for non-NDEF tags. Status: " + status);
            },
            function(error)
            {
                console.log("[removeTagDiscoveredListener - Error] : Failed to remove listener for non-NDEF tags. Status: " + error);
            }
        );
        nfc.removeMimeTypeListener
        (
            "app/ledstripcontroller", 
            handler,
            function(status)
            {
                console.log("[removeMimeTypeListener - Succes] : Removed listener for NDEF mime tags. Status: " + status);
            },
            function(error)
            {
                console.log("[removeMimeTypeListener - Error] : Failed to remove listener for NDEF mime tags. Status: " + error);
            }
        );
    }


    
    // NFC scan listeners
    
    // Add event listener for non-NDEF tag
    // Works on Android only!
    addAnyTagListener(handler)
    {
        nfc.addTagDiscoveredListener
        (
            handler,
            function(status)
            {
                console.log("[addAnyTagListener - Succes] : Listening for non-NDEF tags. Status: " + status);
            },
            function(error)
            {
                console.log("[addAnyTagListener - Error] : Failed to register listener for non-NDEF tags. Status: " + error);
            }
        );
    }
        
    /**
     * Add event listener for NDEF mime tag with mime type "app/ledstripcontroller"
     * 
     * @param {function} handler Handler executed when the listener fires
     */
    addMimeListener(handler)
    {
        nfc.addMimeTypeListener
        (
            "app/ledstripcontroller",
            handler,
            function(status)
            {
                console.log("[addMimeListener - Succes] : Listening for NDEF mime tags with mime type \"app/ledstripcontroller\". Status: " + status);
            },
            function(error)
            {
                console.log("[addMimeListener - Error] : Failed to register listener for NDEF mime tags. Status: " + error);
            }
        );
    }
    
    // Add event listener for NDEF tag
    addNdefListener(handler, records)
    {
        nfc.addNdefListener
        (
            (nfcEvent) =>
            {
                console.log("[addNdefListener - Scan] : NDEF tag scaned. Firing event handler.");
                //nfc.erase();
                if(handler == undefined)
                {
                    this.writeTag(records);
                }
                else
                {
                    handler(nfcEvent);
                }
            },
            function(status)
            {
                console.log("[addNdefListener - Succes] : Listening for NDEF tags. Status: " + status);
            },
            function(error)
            {
                console.log("[addNdefListener - Error] : Failed to register listener for NDEF tags. Status: " + error);
            }
        );
    }


    
    // Handlers
    
    /**
     * Handler that writes data to the NFC tag.
     * 
     * @param {nfcEvent} nfcEvent Event object provided by PhoneGap NFC plugin when tag is scanned.
     */
    writeEmptyTag(nfcEvent)
    {
        console.log("[writeEmptyTag - Triggered] : Non-NDEF tag scaned. Firing event handler.");
        NFCManager.printTag(nfcEvent);
        
        let act = $(NFCManager.actions.actionElement).val();
        
        let data = NFCManager.getDataFromElements(NFCManager.actions[act].elements);
        data.unshift(act);
        console.log(data);
        
        let records = NFCManager.getRecordsFromData(data);
        console.log(JSON.stringify(records));
        
        NFCManager.writeTag(records);
        console.log("[writeEmptyTag - Succes] : Records written succesfully.");
    }
    
    /**
     *  Handler that erases and then writes data to the NFC tag.
     * 
     * @param {nfcEvent} nfcEvent Event object provided by PhoneGap NFC plugin when tag is scanned.
     */
    async overwriteTag(nfcEvent)
    {
        await application.nfcManager.eraseTag();
        application.nfcManager.writeEmptyTag(nfcEvent);
        
        $("#cancelButton").trigger("mouseup");
        
        let notification = new Notification(0, "NFC Write", "Succes! NFC tag overwritten!", 5000, {emoji : "🚥"}, {emoji : "✔"});
        application.notificationManager.newNotification(notification);
    }
    
    /**
     * Handler for NDEF mime tags of type "app/ledstripcontroller".
     * 
     * @param {nfcEvent} nfcEvent Event object provided by PhoneGap NFC plugin when tag is scanned.
     */
    mimyTypeHandler(nfcEvent)
    {
        console.log("[mimyTypeHandler - Triggered] : NDEF mime tag scaned. Firing event handler.");
        NFCManager.printTag(nfcEvent);
        
        let args = [];
        nfcEvent.tag.ndefMessage.forEach
        (
            (message) =>
            {
                args.push(String.fromCharCode.apply(null, message.payload));
            }
        );
        console.log(args);
        
        let action = args.shift(); // Remove and store name of the action to be executed, so only arguments for function call are left.
        
        NFCManager.actions[action].execute(args);
    }
    
    
    
    //Helper functions
    
    /**
     * Get data from elements that need to be written to NFC tag.
     * 
     * @param {string[]} elements Array of strings containg ID names of elements that contain data.
     */
    static getDataFromElements(elements)
    {
        let data = [];

        elements.forEach
        (
            (element) =>
            {
                data.push($(element).val());
            }
        );

        return data;
    }
    
    /**
     * Create records from data.
     * 
     * @param {string[]} data Array of data to be 
     */
    static getRecordsFromData(data)
    {
        let records = [];  

        let mimeType = "app/ledstripcontroller";

        data.forEach
        (
            (payload, index) =>
            {
                records.push(ndef.mimeMediaRecord(mimeType, nfc.stringToBytes(payload), index));
            }
        );

        return records;
    }

    /**
     * Write records to NFC tag.
     * 
     * @param {NdefRecord[]} records Array of prepared data in for of NDEF records ready to be written to a NDEF tag.
     */
    static writeTag(records)
    {
        nfc.write
        (
            records,
            (status) =>
            {
                console.log("[writeTag - Succes] : Data Succesfully written to the tag. Status: " + status);
            },
            (error) =>
            {
                console.log("[writeTag - Error] : Failed to write data to the tag. Status: " + error);
            }
        );
    }
    
    /**
     * Helper that prints the content of NFC tag.
     * 
     * @param {nfcEvent} nfcEvent Event object provided by PhoneGap NFC plugin when tag is scanned.
     */
    static printTag(nfcEvent)
    {
        let tag = nfcEvent.tag;
        let tagJson = JSON.stringify(tag);
        
        console.log(nfcEvent);
        console.log(tagJson);
    }
    
    /**
     * Errases the contents of a NFC tag. Has to be called in a event handler function that executes after NFC tag is scanned.
     */
    eraseTag()
    {
        return new Promise
        (
            (resolve) =>
            {
                nfc.erase
                (
                    (status) =>
                    {
                        console.log("[eraseTag - Succes] : Data erased from the tag. Status: " + status);
                        resolve("succes");
                    },
                    (error) =>
                    {
                        console.log("[eraseTag - Error] : Failed to erase data from the tag. Status: " + error);
                        resolve("error");
                    }
                );
            }
        );
    }
}