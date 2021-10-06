class Button
{
    type;
    parentElement;
    
    #localisation;
    
    constructor(type, parentElement)
    {
        this.type = type;
        this.parentElement = parentElement;
    }
    
    async initialize()
    {
        await application.initialized;
        this.#localisation = await application.renderer.getLocalisation("button");
    }
    
    async render()
    {  
        let buttonLocalisation = await application.renderer.getLocalisation("button");
        this.#localisation = buttonLocalisation[this.type];
        
        return application.renderer.render(this.parentElement, "button", "button", this.#localisation);
    }
    
    on(action, callback)
    {
        $("main").on
        (
            action,
            `#${this.#localisation[this.type].id}Button`,
            callback
        );
    }
    
    delete()
    {
        $(`#${this.#localisation[this.type].id}Button`).remove();
    }
}