/**
 * This javascript file will constitute the entry point of your solution.
 *
 * Edit it as you need.  It currently contains things that you might find helpful to get started.
 */

// This is not really required, but means that changes to index.html will cause a reload.
require('./site/index.html')
// Apply the styles in style.css to the page.
require('./site/style.css')

// if you want to use es6, you can do something like
//     require('./es6/myEs6code')
// here to load the myEs6code.js file, and it will be automatically transpiled.

// Change this to get detailed logging from the stomp library
global.DEBUG = false

const url = "ws://localhost:8011/stomp"
const client = Stomp.client(url)
client.debug = function(msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}

function connectCallback() {
  client.subscribe("/fx/prices", onConnectService);  //after succefull connection, subscribing for the service "/fx/prices". 
}

client.connect({}, connectCallback, function(error) {
  alert(error.headers.message)
});

let currencyDataObj={};    //object will used for unique key for each currency type 
let updatedCurrencyData=[]; // Array will store currency updated objects to iterate 

const onConnectService =(message) => { // called every time the client receives a message
  var data=JSON.parse(message.body); //parsing body data to json.
  var getCurrencyType=data.name;   // unique key for currency data Object
  if(!currencyDataObj[getCurrencyType]){
    currencyDataObj[getCurrencyType];
  }

  currencyDataObj[getCurrencyType]=data; // updating Object key
  updatedCurrencyData=Object.values(currencyDataObj).sort((a,b)=>a.lastChangeBid-b.lastChangeBid);  //converting into array and sorting on  last change bid
  var tableBody = document.getElementById("tableBody");
  tableBody.innerHTML="";  // clear previous data of table 
  updatedCurrencyData.map((obj,i)=>{ 
    let row = tableBody.insertRow(i);  //inserting rows into the table.
    let cell1 = row.insertCell(0); //creating  cell for table rows .
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
   
    cell1.innerHTML=obj.name;  //setting cell data.
    cell2.innerHTML=obj.bestBid;
    cell3.innerHTML=obj.bestAsk;
    cell4.innerHTML=obj.lastChangeBid;
    cell5.innerHTML=obj.lastChangeAsk;
    let bestBid=data.bestBid;
    let bestAsk=data.bestAsk;
    let midprice = (bestBid+bestAsk)/2;   // evaluating  sparkline data . 
    if(!obj["sparkLineData"]){
          obj["sparkLineData"]=[];
    }
    obj["sparkLineData"].push(midprice); //pushing new  sparkline data.
    let sparkLineUpdate= setInterval((function (obj){           // updating sparkline data after every 30 seconds.
          const sparkElement = document.createElement('span'); // creating element for sparkline graph.
          const sparkline = new Sparkline(sparkElement)    // new  object of sparkline graph.
          sparkline.draw(obj["sparkLineData"],{charttype:'line',axis:true,axiscolor:'red'});  // drawing sparkline graph.
          cell6.appendChild(sparkElement);  // append into the last column of table.
      })(obj),
        30000);
    clearInterval(sparkLineUpdate); // clear the interval .
  });
}


