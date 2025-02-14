//jshint esversion:6

/*
Name: Brisa Carter
Assignment: Week 4 - F2C Converter 
Description: This calculator converts temperatures from Farenheit to Celsius
It extends from Calculator from Debasis
Date: 02/07/25
*/

/*AI PROMPTS:
- fix the code - showing a syntax error
Prompt; fix the code 
Answer; Added a missing closing quote and parentheses 
 - Clean up from old calculator
Prompt: the code works, but the result opens in a new tab. 
I want it to open in the same page. 
Also, can I eliminate this?: (calcualtor's num1 * num2)
*/

//to test the server.js file type npm test on shell/terminal
//jest test suit created by AI - Brisa added comments

// create an express object from the express package
const express = require("express");
const bodyParser = require("body-parser");

// create an app object from the express object
const app = express();
// this allows the parsing of the html file using body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// this code is only invoked on the path /f2c
app.get("/f2c", function (req, res) {
  res.sendFile(__dirname + "/f2cCalc.html");
});

// invoked on the submit button
app.post("/f2c", function (req, res) {
  // converts the string input to a float number
  var fTemp = parseFloat(req.body.fTemp);

  // does the computation of the input variables, as numbers
  var convertedTemp = ((fTemp - 32) * 5) / 9;

  // display the result without decimal places
  res.send("The temperature in Celsius is " + Math.round(convertedTemp));
});

// required to check if server is  running
app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
