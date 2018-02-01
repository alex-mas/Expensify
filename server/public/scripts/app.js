'use strict';

var app = {
    title: 'This is a title',
    subtitle: 'this is a subtitle',
    options: []
};

var appRoot = document.getElementById('app');

var isVisible = false;

var toggleVisibility = function toggleVisibility() {
    console.log('toggled visibility');
    isVisible = !isVisible;
    renderApp();
};
var onFormSubmit = function onFormSubmit(event) {
    event.preventDefault();
    var option = event.target.elements.option.value;

    if (option) {
        app.options.push(option);
        event.target.elements.option.value = "";
        renderApp();
    }
};

var onRemoveAll = function onRemoveAll() {
    app.options = [];
    renderApp();
};

var chooseRandomOption = function chooseRandomOption() {
    var randN = Math.round(Math.random()) * app.options.length,
        option = app.options[randN];
    alert(option);
};
var renderApp = function renderApp() {
    var template = React.createElement(
        'div',
        { id: 'innerApp' },
        React.createElement(
            'h1',
            null,
            app.title
        ),
        React.createElement(
            'p',
            null,
            app.subtitle
        ),
        React.createElement(
            'p',
            null,
            app.options.length > 0 ? 'This are your options ' : 'There are no options, please add some'
        ),
        React.createElement(
            'button',
            { disabled: !app.options.length > 0, onClick: chooseRandomOption },
            'Choose random option'
        ),
        app.options && app.options.map(function (option, i) {
            return React.createElement(
                'p',
                { key: i },
                option
            );
        }),
        React.createElement(
            'button',
            { onClick: onRemoveAll },
            'Remove All'
        ),
        React.createElement(
            'form',
            { onSubmit: onFormSubmit },
            React.createElement('input', { type: 'text', name: 'option' }),
            React.createElement(
                'button',
                null,
                'Add Option'
            )
        ),
        React.createElement(
            'div',
            { id: 'challangeApp' },
            React.createElement(
                'h1',
                null,
                'visibility toggle'
            ),
            React.createElement(
                'button',
                { onClick: toggleVisibility },
                isVisible === true ? 'Show details' : 'Hide details'
            ),
            React.createElement(
                'p',
                null,
                isVisible === true ? undefined : 'Hey, these are some details you can now see!'
            )
        )
    );

    ReactDOM.render(template, appRoot);
};

renderApp();