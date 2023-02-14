console.log('hello world');

let count = -1; //store the variable of -1 in count (count starts at -1 so 0 is the first shown)
let button = document.getElementById("clickthis")
//let h2 = document.getElementById("#stats") //tried to create variable that selected the selector of the h2
button.onclick = function () {
    count++; //++ = shorthand for increment - i+1 - so -1 + 1 = 0 (1st # shown) and it increases
    button.innerHTML = "Click count: " + count; //when button clicked, it will change label to say Click count + #s of clicks
    //h2.innerHTML = count; //failed attempt to display the count on h2
    console.log(count) //console logs the clicks so they match the HTML display
};


// let counterFunction(){
//     let counter = -1;
//     counter++
//     document.getElementById("count").innerHTML = counter
// }

// counterFunction(); //this does not work 



// let btncounter = document.querySelector("#btncount") //document.querySelector returns 1st element matching the selecter (id btncount) and stores it in variable - btncounter

// btncounter.addEventListener('click', function(){ //completing the event (clicking button) calls the function
//     counter++ //++ = shorthand for increment - i+1 - so -1 + 1 = 0 (1st # shown) and it keeps going up
//     document.querySelector("#stats").innerHTML = counter //innerHTML displays the results on website
//     console.log(counter) //will display the count in the console
// }) //this works to have the counter increase with each click

