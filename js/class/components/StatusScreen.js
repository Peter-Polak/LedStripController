class StatusScreen
{
    type;
    
    constructor(type)
    {
        this.type = type;
    }
    
    async render()
    {
        let view = await application.renderer.getPartOfLocalisation("status-screen", [this.type]);
        let elements = await application.renderer.getElements("status-screen", "status-screen", view[this.type], {});
        application.renderer.prepend("body", elements);
        
        // application.renderer.render("body", "status-screen", "status-screen", view, { button : await application.renderer.getTemplate("button") });
        // application.renderer.render("body", "status-screen", "status-screen", view);
    }

    delete()
    {
        $("#statusScreen").remove();
        console.log("[StatusScreen - delete] Status screen deleted.")
    }
}