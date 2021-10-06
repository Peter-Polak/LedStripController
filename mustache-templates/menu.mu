<nav id="menu" class="closed">
    <div id="menuButton">
        <div class="menuIcon">
            <div id="line1" class="menuButtonLine"></div>
            <div id="line2" class="menuButtonLine"></div>
            <div id="line3" class="menuButtonLine"></div>
        </div>
    </div>
    
    <div id="menuItems">
        {{#menu}}
        <a id="{{id}}" class="menuItem">
            <span class="menuItemText">{{label}}</span>
        </a>
        {{/menu}}
    </div>
</nav>