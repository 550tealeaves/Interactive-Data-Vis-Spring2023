console.log(d3) //can load csv files 
/* CONSTANTS AND GLOBALS */
// const width = ;
// const height = ;

/* LOAD DATA */
d3.csv('roster.csv', d3.autoType) //autoType will make sure the data type is correct
  .then(roster => {
    console.log("roster", roster) //'roster' is the name of the data - can be named anything


    
    /* SCALES */
    /** This is where you should define your scales from data to pixel space */
    

    /* HTML ELEMENTS */
    /** Select your container and append the visual elements to it */
    const table = d3.select("#container")

    console.log('container', container)

    //append table
    .append("table") //whatever the last element, is what it will be = table

     //append table head
    table.append("thead") //so not <thead></thead> will appear w/in the <table></table> (nests)

      //appened table body
    const tbody = table.append("tbody") //don't want the tbody to be inside the thead - so add table.append(so they don't next)
      .append("tr") // appended a table row to the table 
      .attr('class', 'row') //this creates a class called row 

   
      //use d3 to populate table
      const row = tbody.selectAll("tr") //selected something that didn't exist 
      .data(roster)
      .join("tr") //this joins the data - now have a table row for each student 
      
      //assign 'student' class
      .attr("class", "student")
      
      //assign id
      .attr("id", data => data.Last) //for each data element, assign the last name - iterating over each data point - //ids are specific to the points in the data

       //assign text

      //break the chain

      //add cell for first name to row
      row.append("td") //have to break the chain to add the first name next to the last
        .text(data => data.First)
      
       //add cell for last name to row
      row
        .append("td") //now it changes to table data
        .text(data => data.Last) //inserts the last names into the table data


      //select table rows, fill w/ roster data

     
      

      
     

      //inspect all arguments - data, index, nodes


      


      


  




  })