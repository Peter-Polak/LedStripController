<div id="colorPicker{{id}}" class="colorPicker">
    <header class="headerContainer">
        <h3 class="headerText">{{header}}</h3>
    </header>
    
    <label class="colorPreview"><input type="color"></label>
    
    <span class="redContainer">
        <label class="redLabel">{{red.label}}:</label>
        <input class="redRange" type="range" min="0" max="255" value="0">
        <input class="redNumber" type="number" min="0" max="255" value="0">
    </span>

    <span class="greenContainer">
        <label class="greenLabel">{{green.label}}:</label>
        <input class="greenRange" type="range" min="0" max="255" value="0">
        <input class="greenNumber" type="number" min="0" max="255" value="0">
    </span>

    <span class="blueContainer">
        <label class="blueLabel">{{blue.label}}:</label>
        <input class="blueRange" type="range" min="0" max="255" value="0">
        <input class="blueNumber" type="number" min="0" max="255" value="0">
    </span>
</div>