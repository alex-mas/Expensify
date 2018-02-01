const obj = {
    prop1: 'test',
    prop2:{
        prop3: 'test2',
        prop4: 'test3'
    }
}

//object destructuring
const {"prop1": propertyAlias = 'DefaultValue' } = obj;



console.log(propertyAlias);


const obj2 = {
    prop2:{
        prop3: 'test2',
        prop4: 'test3'
    }
}

//object destructuring
const {"prop1": propertyAlias2 = 'DefaultValue' } = obj2;


console.log(propertyAlias2);



//Array destructuring

const arrayOfElements = ['first','second','third','fourth','fifth','etc','nth'];

const [var1, var2, var3, , , ,lastItem, nonExistentItem = 'defaultValue'] = arrayOfElements;

console.log(var1);//'first'

console.log(var2);//'second'

console.log(var3);//'third'

console.log(lastItem);//'nth'

console.log(nonExistentItem);//'defaultValue' --->if array doesn't contain that much items and a default is provided that is the value the variable takes
// else it will be undefined probably