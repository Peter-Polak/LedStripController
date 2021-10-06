class Menu
{
    constructor()
    {
        
    }
    
    render(appendElement = "body")
    {
        return application.renderer.render(appendElement, "menu", "menu");
    }
    
    async registerListeners()
    {
        $("body").on
        (
            "mouseup",
            "#menuButton",
            function()
            {
                let menu = $("#menu");
                menu.toggleClass("open closed");
            }
        );
        
        let menu = await application.renderer.getLocalisation("menu");
        let items = menu.menu;
        
        items.forEach
        (
            item => 
            {
                $("body").on
                (
                    "mouseup", 
                    `#${item.id}`,
                    function()
                    {
                        window.location = `../html/${item.id}.html`;
                    }
                );
            }
        );
    }
}