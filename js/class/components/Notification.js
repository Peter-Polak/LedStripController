class Notification
{
    id;
    name;
    text;
    duration;
    icon;
    image;
    
    element;
    
    status;
    promise;
    #resolve;
    
    callbacks;
    
    constructor(id, name, text, duration = 3000, icon = {emoji : "🚥"}, image = {emoji : "💡"}, callbacks = {})
    {
        this.id = id;
        this.name = name;
        this.text = text;
        this.duration = duration;
        
        //{ "emoji": "...", "src" : "../img/..." }
        this.icon = icon;
        this.image = image;

        this.status = "created";
        console.log(`[Notification #${this.id}]: ${this.status}`);
        this.callbacks = callbacks;
        
        if(this.callbacks.onCreation !== undefined) this.callbacks.onCreation();
        
        this.promise = new Promise
        (
            (resolve) =>
            {
                this.#resolve = resolve;
            }
        );
    }
    
    async render()
    {
        // await application.renderer.render("body", );
        await $.get
        (
            `${application.renderer.templatePath}notification.mu`,
            (template) =>
            {
                $("body").prepend(Mustache.render(template, this));
                this.element = $(`#notification${this.id}`)
            },
            "text"
        );
        
        this.status = "rendered";
        console.log(`[Notification #${this.id}]: ${this.status}`);
        $(this.element).on("mouseup", () => this.interupt());
        
        setTimeout
        (
            () => 
            {
                if(this.status != "interupted") this.show();
            }, 
            20
        );
        
    }
    
    show()
    {
        
        
        this.status = "shown";
        console.log(`[Notification #${this.id}]: ${this.status}`);
        $(this.element).toggleClass("hidden visible");
        
        setTimeout
        (
            () => 
            {
                if(this.status != "interupted") this.hide();
            }, 
            this.duration
        );
    }
    
    hide()
    {
        // Get transition duration needed to wait before deleting
        // TODO : extract duration in ms
        // let transitionDuration = $(".notificationContainer").css("transition-duration").
        
        this.status = "hidden";
        console.log(`[Notification #${this.id}]: ${this.status}`);
        $(this.element).toggleClass("hidden visible");
        
        setTimeout
        (
            () => 
            {
                if(this.status != "interupted") this.delete();
            }, 
            500
        );
    }
    
    delete()
    {
        this.status = "deleted";
        console.log(`[Notification #${this.id}]: ${this.status}`);
        $(this.element).remove();
        this.#resolve();
    }
    
    async interupt()
    {
        this.hide();
        await this.promise;
        this.status = "interupted";
        console.log(`[Notification #${this.id}]: ${this.status}`);
    }
}