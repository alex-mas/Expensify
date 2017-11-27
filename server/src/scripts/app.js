
let template = <h1 id="innerApp"> Title!<div id="innerApp2"></div><p>this is a closing paragraph. Bye!</p></h1>;
let appRoot = document.getElementById('app');


let TemplateElement = function (props){
    return <div className="templateContainer"> 
                <h1>Created by: {props.name} </h1>
                <p>Age: {props.age} </p>
                <p>From: {props.loc }</p>
                <p>Profession: {props.profession}</p>
            </div>;
}

ReactDOM.render(template,appRoot);
let name = 'alex',
    age = 22,
    loc= 'figaro',
    profession = 'web dev freelancer and student',
    reactTemplate = TemplateElement({name,age,loc,profession}),
    innerAppRoot = document.getElementById('innerApp2');
    
console.log("this is a template: ",reactTemplate);
console.log(template);
    
ReactDOM.render(reactTemplate,innerAppRoot);