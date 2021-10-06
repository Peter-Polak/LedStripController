class Scheduler
{
    
    schedule(notification)
    {
        let scheduler = cordova.plugins.notification.local;
        scheduler.schedule(notification);
    }
}