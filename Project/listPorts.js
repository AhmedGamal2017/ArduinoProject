let SerialPort = require('serialport');
let serialPorts;

let arduino = require('./arduino.json');

// list serial ports:
SerialPort.list().then (
  ports => {
    serialPorts = ports;
    // ports.forEach(port =>console.log(port.path))
    arduino.port = serialPorts[0].path;
  },
  err => console.log(err)
)