<header id="secondaryHeaderContainer" class="headerContainer">
    <h2 id="secondaryHeaderText" class="headerText">{{strip.name}}</h2>
</header>

<div id="contentContainer">
    <div id="leds">
        {{#leds}}
        {{> led}}
        {{/leds}}
    </div>
</div>

<footer id="footerButtons">
{{#buttons.footer}}
    {{> button}}
{{/buttons.footer}}
</footer>