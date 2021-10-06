class Popup
{
    #icon;
    #text;
    #button;
    
    constructor(icon, text)
    {
        this.#icon = icon;
        this.#text = text;
    }
    
    async render(page, action)
    {
        let buttonLocalisation = await application.renderer.getLocalisation("button");
        let popupLocalisation = await application.renderer.getLocalisation("popup");

        let view =
        {
            icon: this.#icon,
            ...popupLocalisation[page][action],
            buttons : 
            [
                buttonLocalisation.cancel
            ]
        }
        
        if(this.#button != undefined) view.buttons.push(this.#button);
        
        return application.renderer.render("body", "popup", "popup", view, { button : await application.renderer.getTemplate("button") });
    }
    
    addButton(id, text, classes)
    {
        this.#button = 
        {
            id : id,
            text : text,
            classes: classes
        }
    }
    
    registerEventListeners(callbacks)
    {
        $("#cancelButton").on
        (
            "mouseup",
            () =>
            {
                this.close();
                if(callbacks != undefined && "cancel" in callbacks)
                {
                    callbacks.cancel.callback(callbacks.cancel.args);
                }
            }
        );
        
        if(this.#button != undefined)
        {
            $(`#${this.#button.id}Button`).on
            (
                "mouseup",
                () =>
                {
                    callbacks[this.#button.id].callback(callbacks[this.#button.id].args);
                }
            );
        }

        // if(callbacks.length > 0)
        // {
        //     callbacks.array.forEach
        //     (
        //         element => 
        //         {
        //             $(`#${this.#button.id}Button`).on
        //             (
        //                 "mouseup",
        //                 () =>
        //                 {
        //                     callbacks[this.#button.id].callback(callbacks[this.#button.id].args);
        //                 }
        //             );
        //         }
        //     );
        // }
        
    }
    
    close(callback)
    {
        $(".popupContainer").remove();
    }
}