class Page
{
    name;
    
    constructor(name)
    {
        this.name = name;
    }
    
    render(view)
    {
        return application.renderer.render("main", name, name, view);
    }
    
    initilaize()
    {
        
    }
    
    registerListeners()
    {
        $(document).on(
            "backbutton",
            function()
            {
                window.location = "../html/home.html";
            }
        );
    }
}