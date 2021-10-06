<header id="secondaryHeaderContainer" class="headerContainer">
    <h2 id="secondaryHeaderText" class="headerText">{{secondaryHeader}}</h2>
</header>

<div id="contentContainer">
    <span id="languageContainer">
        <label id="languageLabel">{{language.label}}:</label>
        <select id="languageSelect" name="language">
            {{#language.options}}
            <option value="{{value}}">{{label}}</option>
            {{/language.options}}
        </select>
    </span>
    <span id="liveReloadContainer">
        <label id="liveReloadLabel">{{liveReload.label}}:</label>
        <select id="liveReloadSelect" name="liveReload">
            {{#liveReload.options}}
            <option value="{{value}}">{{label}}</option>
            {{/liveReload.options}}
        </select>
    </span>
</div>

<footer class="footerButtons">
{{#buttons}}
    {{> button}}
{{/buttons}}
</footer>