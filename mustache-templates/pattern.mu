<header id="secondaryHeaderContainer" class="headerContainer">
    <h2 id="secondaryHeaderText" class="headerText">{{stripName}}</h2>
</header>

<div id="contentContainer">
    <span id="numOfLedsContainer">
        <label>{{numOfLeds}}:</label>
        <input type="number" value="2">
    </span>
    
    <div id="ledsContainer">
    {{#leds}}
        {{> led}}
    {{/leds}}
    </div>
</div>

<footer class="footerButtons">
{{#buttons.footer}}
    {{> button}}
{{/buttons.footer}}
</footer>