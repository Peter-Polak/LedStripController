<header id="secondaryHeaderContainer" class="headerContainer">
    <h2 id="secondaryHeaderText" class="headerText">{{name}}</h2>
</header>

<div id="tasks">
    <span class="newTask">➕ {{newTask}}</span>
    {{#tasks}}
    <div id="{{id}} "class="task">
        <span>{{name}}</span>
        <span></span>
    </div>
    {{/tasks}}
</div>