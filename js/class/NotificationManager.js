class NotificationManager
{
    #notifications;
    isReady;
    currentNotification;
    currentId;
    
    constructor()
    {
        // this.#notifications = {};
        this.#notifications = [];
        this.isReady = true;
        this.currentNotification = undefined;
        this.currentId = 0;
    }
    
    newNotification(notification)
    {
        // this.#notifications[notification.id] = notification;
        notification.id = this.currentId;
        this.currentId++;
        notification.status = "queued";
        
        this.#notifications.push(notification);
        this.checkNotifications(this);
        
        return notification.id;
    }
    
    async checkNotifications(me)
    {   
        while(me.#notifications.length != 0 && me.isReady)
        {
            me.isReady = false;
            me.currentNotification = me.#notifications[0];
            me.#notifications[0].render();
            
            await this.#notifications[0].promise;
            
            this.#notifications.splice(0, 1);
            me.isReady = true;
        }
        
        // setTimeout(() => me.checkNotifications(me), 1000);
    }
    
    interuptCurrentNotification()
    {
        if(this.currentNotification !== undefined)
        {
            this.currentNotification.interupt();
        }
    }
    
    newError(name, error, callbacks = {})
    {
        return this.newNotification(new Notification(1, name, "Error: " + error, 2000, {emoji : "🚥"}, {emoji : "❌"}, callbacks));
    }
    
    newStatus(name, message, callbacks = {})
    {
        return this.newNotification(new Notification(1, name, message, 2000, {emoji : "🚥"}, {emoji : "💡"}, callbacks));
    }
    
    newProgress(name, callbacks = {})
    {
        let after = function()
        {
            $(".notificationImage").addClass("rotate");
        };
        
        return this.newNotification(new Notification(1, name, "Working...", 20000000, {emoji : "🚥"}, {emoji : "⌛"}, {afterRender : after}));
    }
}