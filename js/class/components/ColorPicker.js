class ColorPicker
{
    #id;
    
    red;
    green;
    blue;
    
    callback;
    
    #redRange;
    #greenRange;
    #blueRange;
    
    #redNumber;
    #greenNumber;
    #blueNumber;
    
    #colorPreview;
    #colorPicker;
    
    constructor(id, callback)
    {
        this.#id = id;
        this.red = 0;
        this.green = 0;
        this.blue = 0;
        
        this.callback = callback;
    }
    
    set Red(value)
    {
        this.red = value;
        
        this.updateComponent(this.red, this.green, this.blue);
        if(this.callback != undefined) this.callback(this.red, this.green, this.blue);
    }
    
    set Green(value)
    {
        this.green = value;
        
        this.updateComponent(this.red, this.green, this.blue);
        if(this.callback != undefined) this.callback(this.red, this.green, this.blue);
    }
    
    set Blue(value)
    {
        this.blue = value;
        
        this.updateComponent(this.red, this.green, this.blue);
        if(this.callback != undefined) this.callback(this.red, this.green, this.blue);
    }
    
    set RGB(value)
    {
        this.red = value.red;
        this.green = value.green;
        this.blue = value.blue;
        
        this.updateComponent(this.red, this.green, this.blue);
        if(this.callback != undefined) this.callback(this.red, this.green, this.blue);
    }
    
    async render(appendElement = "#contentContainer")
    {
        let view = 
        {
            id : this.#id
        }
        
        return application.renderer.render(appendElement, "color-picker", "color-picker", view);
    }
    
    initialize(red, green, blue)
    {
        let color = { red, green, blue };
        
        this.#redRange = $(`#colorPicker${this.#id} > .redContainer > .redRange`);
        this.#greenRange = $(`#colorPicker${this.#id} > .greenContainer > .greenRange`);
        this.#blueRange = $(`#colorPicker${this.#id} > .blueContainer > .blueRange`);
        
        this.#redNumber = $(`#colorPicker${this.#id} > .redContainer > .redNumber`);
        this.#greenNumber = $(`#colorPicker${this.#id} > .greenContainer > .greenNumber`);
        this.#blueNumber = $(`#colorPicker${this.#id} > .blueContainer > .blueNumber`);
        
        this.#colorPreview = $(".colorPreview");
        this.#colorPicker = $('.colorPreview > input[type="color"]');
        
        this.RGB = color;
    }
    
    updateRanges(red, green, blue)
    {
        this.#redRange.val(red);
        this.#greenRange.val(green);
        this.#blueRange.val(blue);
    }

    updateNumbers(red, green, blue)
    {
        this.#redNumber.val(red);
        this.#greenNumber.val(green);
        this.#blueNumber.val(blue);
    }
    
    updateColorPreview(red, green, blue)
    {
        this.#colorPreview.css("background-color", `rgb(${red}, ${green}, ${blue})`);
    }
    
    updateColorpicker(red, green, blue)
    {
        let redHex = this.intToHex(red);
        let greenHex = this.intToHex(green);
        let blueHex = this.intToHex(blue);
        
        let rgbHex = `#${redHex}${greenHex}${blueHex}`;
        
        this.#colorPicker.val(rgbHex);
    }
    
    updateComponent(red, green, blue)
    {
        this.updateRanges(red, green, blue);
        this.updateNumbers(red, green, blue);
        this.updateColorpicker(red, green, blue);
        this.updateColorPreview(red, green, blue)
    }
    
    getRangeValues()
    {
        let rangeValues = 
        {
            red : this.#redRange.val(),
            green : this.#greenRange.val(),
            blue : this.#blueRange.val()
        }
        
        return rangeValues;
    }
    
    getNumberValues()
    {
        let numberValues = 
        {
            red : this.#redNumber.val(),
            green : this.#greenNumber.val(),
            blue : this.#blueNumber.val()
        }
        
        return numberValues;
    }
    
    getColorPickerValues()
    {
        let hexValue = this.#colorPicker.val();
        
        let rgb = this.hexToRgb(hexValue);
        
        let colorPickerValues = 
        {
            red : rgb[0],
            green : rgb[1],
            blue : rgb[2]
        };
        
        return colorPickerValues;
    }

    registerListeners()
    {
        $("main").on
        (
            'input',
            'input[type="range"]',
            (event) =>
            {
                let rgb = this.getRangeValues();

                this.RGB = rgb;
            }
        );

        $("main").on
        (
            'input',
            `input[type="number"]`,
            (event) =>
            {
                let rgb = this.getNumberValues();

                this.RGB = rgb;
            }
        );
        
        $("main").on
        (
            'input',
            `input[type="color"]`,
            (event) =>
            {
                let rgb = this.getColorPickerValues();

                this.RGB = rgb;
            }
        );
    }
    
    intToHex(value)
    {  
        let hex = parseInt(value, 10); // values from getNumberValues and getRangeValues are string already so we have to convert them to int first
                
        hex = hex.toString(16);
        hex = hex.length == 1 ? "0" + hex : hex;
        
        return hex;
    }
    
    hexToRgb(value)
    {
        // #RRGGBB -> ["RR", "GG", "BB"]
        let rgbValues = value.match(/[A-Za-z0-9]{2}/g);

        // ["RR", "GG", "BB"] -> [red(0-255), green(0-255), blue(0-255)]
        rgbValues = rgbValues.map(function(v) { return parseInt(v, 16) });
        
        return rgbValues
    }
}