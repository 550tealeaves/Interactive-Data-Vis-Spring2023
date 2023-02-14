console.log('hello world');


let btncounter = document.querySelector("#btncount") //document.querySelector returns 1st element matching the selecter (id btncount) and stores it in variable - btncounter
let counter = -1 //store the value of -1 in variable - counter

btncounter.addEventListener('click', function(){ //completing the event (clicking button) calls the function
    counter++ //++ = shorthand for increment - i+1 - so -1 + 1 = 0 (1st # shown) and it keeps going up
    document.querySelector("#stats").innerHTML = counter //innerHTML displays the results on website
    console.log(counter) //will display the count in the console
}) //this works to have the counter increase with each click