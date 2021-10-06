<header id="secondaryHeaderContainer" class="headerContainer">
    <h2 id="secondaryHeaderText" class="headerText">{{strip.name}}</h2>
</header>

<div id="contentContainer">
    <div id="detailsContainer">
        <span id="lengthLabel">{{details.length.label}}:</span><span id="lengthContent">{{strip.length}}</span>
        <span id="ledsPerMeterLabel">{{details.ledsPerMeter.label}}:</span><span id="ledsPerMeterContent">{{strip.ledsPerMeter}}</span>
        <span id="ipLabel">{{details.ip.label}}:</span><span id="ipContent">{{strip.ip}}</span>
    </div>
    
    <div id="powerContainer">
        <header id="firstSectionHeaderContainer" class="headerContainer">
            <h3 id="firstSectionHeaderText" class="headerText">{{power.header}}</h3>
        </header>
        
        <div id=powerButtonsContainer>
        {{#buttons.power}}
            {{> button}}
        {{/buttons.power}}
        </div>
    </div>
</div>

<footer class="footerButtons">
{{#buttons.footer}}
    {{> button}}
{{/buttons.footer}}
</footer>