console.log('hello world');

console.log(document)
console.log(window) //shows the different properties avaiable

const input = document.getElementById("name-input")
console.log(input)

const updateName = () => {
    console.log('in update function') //function has to be called in order to be used
    const userName = input.value;
    window.alert(`hello, welcome to class ${userName}`) 
}

updateName();

let changeable = true;
const constant = true;
let counter = 0;

function change(){  
    let changeable = false;
    const constant = false;
    console.log(changeable, constant) //will be false, false b/c called functions from inside and reassigned variables from true, true (outside) to false, false (inside)
    counter = counter + 1
}

change();
console.log('counter', counter)
console.log(changeable, constant) // we are calling the global versions of changeable / constant

const array = ["apprle", "orange", "banana", "mango", "taost"]

const newArray = array.map((d) => {
    console.log('d', d)
    return `my favorite food is ${d}`
})

console.log(newArray)

const filteredArray = array.filter((d, 1) => {
    const onlyToast = d ==="toast" //filter out the value that equals "toast"
    cont onlyFruit = d !== "toast" //filter out values that do not equal "toast"
    const applesOrOranges = d === "apple" || d === "orange"
    const laterFoods = i > 0 //i = index - apple (first one has index of 0)
    return onlyToast
    return laterFoods
})

// console.log(filteredArray)
// console.log(filteredArray.length)

// array.forEach((d) => console.log('d', d)) //implicit call


// If you want to comment out a large chuunk of text, do CTRL + /

// === to see if value = another 
// || is the and or comparator - either value is this OR than


const dayAccessor = 'day'

const dataVizClass = {
    day: 'Tuesday',
    time: 'late', 
    students: 15,
}
let dayAccessor = 'day'

const day = dataVizClass[dayAccessor]
dataVizClass['day']
dataVizClass.day


console.log('day', day)

const keys = Object.keys(dataVizClass)
console.log(keys)

const values = Object.values(dataVizClass)
console.log(values)

const entries = Object.entries(dataVizClass)
console.log(entries)

const apple = 'apple'
if (apple === 'apple'){
    console.log("I'm an apple!")
} else{
    console.log ("I'm not an apple")
}

const yesApple = apple === "apple" ? "I'm an apple!" : "I'm not an apple" //this is shorhand version of lines 84-89  : is else

const now = now Date()
console.log(now)
