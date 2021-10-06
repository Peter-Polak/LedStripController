<header id="secondaryHeaderContainer" class="headerContainer">
    <h2 id="secondaryHeaderText" class="headerText">{{secondaryHeaderText}}</h2>
</header>

<div id="contentContainer">
    <span id="nameContainer">
        <label id="nameLabel">{{nameContainer.label}}:</label>
        <input id="nameValue" type="text" min="0" max="20" required>
    </span>
    
    <span id="lengthContainer">
        <label id="lengthLabel">{{lengthContainer.label}}:</label>
        <input id="lengthValue" type="number" min="0" max="255" value="5" required>
        <span class="unit">m</span>
    </span>
    
    <span id="ledsPerMeterContainer">
        <label id="ledsPerMeterLabel">{{ledsPerMeterContainer.label}}:</label>
        <input id="ledsPerMeterValue" type="number" min="0" max="1000" value="60" required>
    </span>
    
    <span id="ipContainer">
        <label id="ipLabel">{{ipContainer.label}}:</label>
        <input id="ipValue" type="text" value="192.168.0.103" required><!-- pattern="[([1-2][0-9]) | ([1-9])][0-9]\.[([1-2][0-9]) | ([1-9])][0-9]\.[([1-2][0-9]) | ([1-9])][0-9]\.[([1-2][0-9]) | ([1-9])][0-9]" -->
    </span>
</div>

<footer class="footerButtons">
{{#buttons}}
    {{> button}}   
{{/buttons}}
</footer>