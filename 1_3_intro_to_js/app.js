console.log('hello world');


let btncounter = document.querySelector("#btncount") //document.querySelector returns 1st element matching the selecter (id btncount) and stores it in variable - btncounter
let counter = 0 //store the value of 0 in variable - counter

btncounter.addEventListener('click', function(){ //completing the event (clicking button) calls the function
    counter++ //++ = shorthand for increment - i+1 - so 0 + 1 and it keeps going up
    document.querySelector("#stats").innerHTML = counter //innerHTML displays the results on website
    console.log(counter) //will display the count in the console
}) //this works to have the counter increase with each click