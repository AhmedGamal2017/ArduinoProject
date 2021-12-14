var SerialPort = require('serialport'); // include the serialport library

let arduino = require('./arduino.json');
var portName = arduino.port;

var express = require('express'); // include the express library
var app = express(); // create a server using express

var bodyParser = require('body-parser');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.json());

var myPort = new SerialPort(portName, 9600); // open the port
var Readline = SerialPort.parsers.Readline; // make instance of Readline parser
var parser = new Readline(); // make a new parser to read ASCII lines
myPort.pipe(parser); // pipe the serial stream to the parser

// these are the definitions for the serial events:
myPort.on('open', showPortOpen); // called when the serial port opens
myPort.on('close', showPortClose); // called when the serial port closes
myPort.on('error', showError); // called when there's an error with the serial port
parser.on('data', readSerialData); // called when there's new data incoming

// configure the server's behavior:
app.use('/', express.static('public')); // serve static files from /public
app.listen(8080); // start the server

console.log("^".repeat(50));
console.log("Server Opened at port 'localhost:8080'");
console.log("^".repeat(50) + "\n");

let processCounter = 0;

app._router.post("/sendSerialData", async function (req, res) {

  console.log("\nprocess No. : " + ++processCounter);
  console.log("=".repeat(50));
  console.log("post /sendSerialData req.body");
  console.log(req.body);

  let data = req.body.serialData;
  sendToSerial(data);

  console.log("=".repeat(50));
  return res.json(req.body);
});

// these are the functions called when the serial events occur:
function showPortOpen() {
  console.log('port open. Data rate: ' + myPort.baudRate);
}


function readSerialData(data) {
  console.log(data);
}

function showPortClose() {
  console.log('port closed.');
}

function showError(error) {
  console.log('Serial port error: ' + error);
}

// ------------------------ Server function
function sendData(request) {
  // print out the fact that a client HTTP request came in to the server:
  console.log("Got a client request, sending them the data.");
  // respond to the client request with the latest serial string:
  request.respond(serialData);
}

function sendToSerial(data) {
  console.log("sending to serial: " + data);
  myPort.write(data);
}