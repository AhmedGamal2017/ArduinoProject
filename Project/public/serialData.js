let serialDataInputField = document.getElementById("serialInput");
let redFlagInput = document.getElementsByName("RedFlag"),
  blueFlagInput = document.getElementsByName("BlueFlag");
let redFlag = '2',
  blueFlag = '2';

// check Auto by default
UpdateLocalData();
setInterval(function() {
  UpdateLocalData();
}, 1000);

function ChangeRedFlag() {
  console.log("Changing Red Flag");
  let SelectedRedFlagInput = document.querySelector('input[name="RedFlag"]:checked');
  console.log(SelectedRedFlagInput.value.toString());
  redFlag = SelectedRedFlagInput.value.toString();
  SendData();
}

function ChangeBlueFlag() {
  console.log("Changing Blue Flag");
  let SelectedBlueFlagInput = document.querySelector('input[name="BlueFlag"]:checked');
  console.log(SelectedBlueFlagInput.value.toString());
  blueFlag = SelectedBlueFlagInput.value.toString();
  SendData();
}

function SendData() {
  let serialInputData = redFlag + blueFlag;
  console.log(serialInputData);

  let url = "/SerialData";

  $.ajax({
    type: "POST",
    url: url,
    data: {
      serialData: serialInputData
    },
    success: (result) => {
      console.log("done");
      console.log(result);
    },
    error: (err) => {
      console.log(err);
    }
  });
}

function UpdateLocalData() {
  $.get("/serialData", function (data, status) {
  let serialData = data.serialData;
  redFlag = serialData[0];
  blueFlag = serialData[1];

  let redIndex, blueIndex;

  switch (redFlag) {
    case '0':
      redIndex = 2;
      break;
    case '1':
      redIndex = 1;
      break;
    default:
    case '2':
      redIndex = 0;
      break;
  }

  switch (blueFlag) {
    case '0':
      blueIndex = 2;
      break;
    case '1':
      blueIndex = 1;
      break;
    default:
    case '2':
      blueIndex = 0;
      break;
  }

  let rInput = redFlagInput[redIndex];
  rInput.checked = true;
  redFlagInput.forEach(input => {
    input.parentElement.classList.remove("active");
  });
  rInput.parentElement.classList.add("active");

  let bInput = blueFlagInput[blueIndex];
  bInput.checked = true;
  blueFlagInput.forEach(input => {
    input.parentElement.classList.remove("active")
  });
  bInput.parentElement.classList.add("active");
});
}

function getIP(json) {  
  console.log("My public IP address is: ", json.ip);  
}