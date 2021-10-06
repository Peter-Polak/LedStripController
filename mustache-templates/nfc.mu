<header id="secondaryHeaderContainer" class="headerContainer">
    <h2 id="secondaryHeaderText" class="headerText">NFC</h2>
</header>

<div id="contentContainer">
    <div id="stripContainer">
        <label id="stripLabel">{{stripSelect.label}}:</label>
        <select id="stripSelect" name="strip">
            {{#strips}}
                <option value="{{id}}">{{name}}</option>
            {{/strips}}
        </select>
    </div>

    <div id="actionContainer">
        <label id="actionLabel">{{actionSelect.label}}:</label>
        <select id="actionSelect" name="action">
            <option value="TurnOn">{{actionSelect.options.turnOn}}</option>
            <option value="TurnOff">{{actionSelect.options.turnOff}}</option>
            <option value="SetRGB">{{actionSelect.options.setRGB}}</option>
        </select>
    </div>
</div>

<footer class="footerButtons">
{{#buttons}}
    {{> button}}
{{/buttons}}
</footer>