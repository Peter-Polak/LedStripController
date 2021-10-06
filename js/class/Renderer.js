class Renderer
{
    localisationPath;
    templatePath;
    
    constructor(localisationPath, templatePath)
    {
        this.localisationPath = localisationPath;
        this.templatePath = templatePath;
        
        console.log("[Renderer - constructor] Initialized.");
        console.log("[Renderer - constructor] localisationPath = ", this.localisationPath);
        console.log("[Renderer - constructor] templatePath = ", this.templatePath);
    }
    
    async getLocalisation(localisationFileName)
    {
        return await $.ajax
        (
            {
                dataType: "json",
                url: `${this.localisationPath}${localisationFileName}.json`,
                succes : (localisation) =>
                {
                    console.log("[Renderer - getLocalisation - Succes] ", localisation);
                }
            }
        );
    }
    
    async getPartOfLocalisation(localisationFileName, keys)
    {
        let localisation = await this.getLocalisation(localisationFileName);
        let partOfLocalisation = {};
        
        keys.forEach
        (
            key => 
            {
                partOfLocalisation[key] = localisation[key];
            }
        );
        
        return partOfLocalisation;
    }
    
    async getTemplate(templateFileName)
    {
        return await $.get(
            `${this.templatePath}${templateFileName}.mu`,
            "text"
        );
    }
    
    async render(appendElement, templateFileName, localisationFileName, additionalData, partialTemplates, additionalComponents, afterRender)
    {
        let localisation = await this.getLocalisation(localisationFileName);
        
        let view = 
        {
            ...localisation,
            ...additionalData
        }
        
        return new Promise(
            async (resolve) =>
            {
                let template = await this.getTemplate(templateFileName);
                let renderedElements = Mustache.render(template, view, partialTemplates);
                
                $(appendElement).append(renderedElements);
                console.log(`[Renderer - render - succes] Template "${this.templatePath}${templateFileName}.mu" was rendered with localisation "${this.localisationPath}${localisationFileName}.json" in element "${appendElement}" with data `, additionalData);
                
                if(additionalComponents != undefined)
                {
                    additionalComponents.forEach
                    (
                        async component => 
                        {
                            await component.render();
                        }
                    );
                }
                
                if(afterRender != undefined) afterRender();
                
                resolve(renderedElements);
            }
        );
    }
    
    append(parent, elements)
    {
        $(parent).append(elements);
    }
    
    prepend(parent, elements)
    {
        $(parent).prepend(elements);
    }
    
    async getElements(templateFileName, localisationFileName, additionalData, partialTemplates)
    {
        let localisation = await this.getLocalisation(localisationFileName);
        
        let view = 
        {
            ...localisation,
            ...additionalData
        }
        
        let template = await this.getTemplate(templateFileName);
        let renderedElements = Mustache.render(template, view, partialTemplates);
        
        return renderedElements;
    }
}