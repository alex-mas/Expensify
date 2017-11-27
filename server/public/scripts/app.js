"use strict";

var template = React.createElement(
    "h1",
    { id: "innerApp" },
    " Title!",
    React.createElement("div", { id: "innerApp2" }),
    React.createElement(
        "p",
        null,
        "this is a closing paragraph. Bye!"
    )
);
var appRoot = document.getElementById('app');

var TemplateElement = function TemplateElement(props) {
    return React.createElement(
        "div",
        { className: "templateContainer" },
        React.createElement(
            "h1",
            null,
            "Created by: ",
            props.name,
            " "
        ),
        React.createElement(
            "p",
            null,
            "Age: ",
            props.age,
            " "
        ),
        React.createElement(
            "p",
            null,
            "From: ",
            props.loc
        ),
        React.createElement(
            "p",
            null,
            "Profession: ",
            props.profession
        )
    );
};

ReactDOM.render(template, appRoot);
var name = 'alex',
    age = 22,
    loc = 'figaro',
    profession = 'web dev freelancer and student',
    reactTemplate = TemplateElement({ name: name, age: age, loc: loc, profession: profession }),
    innerAppRoot = document.getElementById('innerApp2');

console.log("this is a template: ", reactTemplate);
console.log(template);

ReactDOM.render(reactTemplate, innerAppRoot);