class SettingsManager
{
    static supportedSettings = 
    {
        language : 
        [
            {
                code: "en",
                language : "English"
            },
            {
                code: "sk",
                language : "Slovak"
            }
        ]
    };
    
    
    #localStorage;
    #language;
    
    constructor()
    {
        this.#localStorage = window.localStorage;
        this.loadSettings();
    }
    
    loadSettings()
    {
        let language;
        
        if((language = this.#localStorage.getItem("language")) == null)
        {
            this.setSettingsToDefault();
            this.saveSettings();
        }
        else
        {
            this.#language = this.#localStorage.getItem("language");
        }
    }
    
    saveSettings()
    {
        this.#localStorage.setItem("language", this.#language);
    }
    
    setSettingsToDefault()
    {
        this.#language = "English";
    }
    
    setLanguage(language)
    {
        let isSupportedLanguage = SettingsManager.supportedSettings.language.some(
            languageObject => 
            languageObject.language === language
        );
        
        if(isSupportedLanguage)
        {
            this.#language = language;
        }
    }
    
    getLanguage()
    {
        return this.#language;
    }
    
    getLanguageCode(language)
    {
        let languageObject = SettingsManager.supportedSettings.language.find(
            languageObject => 
            languageObject.language === language
        );
        
        return languageObject.code;
    }
}