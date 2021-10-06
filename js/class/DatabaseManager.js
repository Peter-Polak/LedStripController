class DatabaseManager
{
    database;
    initializedPromise;
    
    constructor()
    {
        this.initializedPromise = this.openDatabase("LED Strip Controller", 1);
        this.initializedPromise.then((db) => {this.database = db;});
    }
      
    
    async openDatabase(name, version)
    {
        var db;
        let openRequest = window.indexedDB.open(name, version);
        
        // openRequest.onsuccess = (event) =>
        // {
        //     console.log("IndexDB (open - onsucces): ", event);
            
        //     this.database = event.target.result;
        // }

        openRequest.onerror = function(event)
        {
            console.log("IndexDB (open - onerror): ", event.target.errorCode);
        }

        openRequest.onupgradeneeded = function(event)
        {
            console.log("IndexDB (open - onupgradeneeded): ", event);
            
            let db = event.target.result;
            let objectStore = db.createObjectStore("strips", { keyPath: "id", autoIncrement: true });
            
            objectStore.createIndex("name", "name", { unique: false });
            objectStore.createIndex("length", "length", { unique: false });
            objectStore.createIndex("ledsPerMeter", "ledsPerMeter", { unique: false });
            objectStore.createIndex("ip", "ip", { unique: false });
        }
        
        return new Promise(
            function(resolve)
            {
                openRequest.onsuccess = function(event)
                {
                    db = event.target.result;
                    console.log("IndexDB (open - onsucces): ", db);
                    resolve(db);
                }
            });
    }
    
    async addItem(table, item)
    {
        await this.initializedPromise;
        
        var id;
        
        let transaction = this.database.transaction(table, "readwrite")
        
        // transaction.oncomplete = function(event) 
        // {
        //     console.log("IndexDB (add transaction - oncomplete): complete");
        // };
        
        transaction.onerror = function(event) 
        {
            console.log("IndexDB (add transaction - onerror): ", event.target.errorCode);
        };
        
        let objectStore = transaction.objectStore(table);
        let request = objectStore.add(item);
        
        return new Promise(
            function(resolve)
            {
                request.onsuccess = function(event)
                {
                    id = event.target.result;
                    console.log("IndexDB (add - onsucces): ", id);
                    resolve(id);
                }
            });
    }
    
    async removeItem(table, id)
    {
        await this.initializedPromise;
        
        let transaction = this.database.transaction(table, "readwrite");
        let objectStore = transaction.objectStore(table);
        let request = objectStore.delete(id);
        
        request.onsuccess = function(event)
        {
            console.log("IndexDB (delete transaction - onsuccess): deleted");
        };
    }
    
    async getItemByID(table, id)
    {
        await this.initializedPromise;
        
        var item;
        
        let transaction = this.database.transaction(table);
        let objectStore = transaction.objectStore(table);
        let request = objectStore.get(id);
        
        return new Promise(
            function(resolve)
            {
                request.onsuccess = function(event)
                {
                    item = event.target.result;
                    console.log("IndexDB (get - onsucces): ", item);
                    resolve(item);
                }
            });
    }
    
    async getAllItems(table)
    {
        await this.initializedPromise;
        
        var items = [];
        
        let transaction = this.database.transaction(table);
        let objectStore = transaction.objectStore(table);
        let request = objectStore.getAll();
        
        return new Promise(
        function(resolve)
        {
            request.onsuccess = function(event)
            {
                items = event.target.result;
                console.log("IndexDB (getAll - onsucces): ", items);
                resolve(items);
            }
        });
        
        // let request = objectStore.openCursor();
        
        // request.onsuccess = function(event)
        // {
        //     var cursor = event.target.result;
            
        //     if(cursor)
        //     {
        //         items.push(cursor.value);
        //         cursor.continue();
        //     }
        // };
    }
    
    async updateItem(table, updatedItem)
    {
        await this.initializedPromise;
        
        let objectStore = this.database.transaction(table, "readwrite").objectStore(table);
        let requestUpdate = objectStore.put(updatedItem);
        
        requestUpdate.onerror = function(event)
        {
            // Do something with the error
        };
        requestUpdate.onsuccess = function(event)
        {
            // Success - the data is updated!
        };
    }
}