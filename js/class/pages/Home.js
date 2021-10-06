class Home extends Page
{
    constructor()
    {
        
    }
    
    async initialize(strips)
    {
        await this.render(strips);
        this.registerListeners(strips);
    }
    
    render(strips)
    {
        let view = 
        {
            "strips" : strips
        };
        
        return application.renderer.render("main", "home", "home", view, {}, [], loadingScreen.delete);
    }
    
    registerListeners(strips)
    {
        $(document).on(
            "backbutton",
            function()
            {
                navigator.app.exitApp();
            }
        );
        
        $("#newStripSelection").on
        (
            "mouseup",
            function()
            {
                window.location = "../html/newStrip.html";
            }
        );
        
        strips.forEach(
            (strip) =>
            {
                $(`#strip${strip.id}`).on
                (
                    "mouseup",
                    function()
                    {
                        window.location = "../html/strip.html?index=" + strip.id;
                    }
                ); 
            }
        );
    }
}