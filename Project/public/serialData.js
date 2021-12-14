let serialDataInputField = document.getElementById("serialInput");
let redFlagInput = document.getElementsByName("RedFlag"),
  blueFlagInput = document.getElementsByName("BlueFlag");
let redFlag = '2',
  blueFlag = '2';

// check Auto by default
redFlagInput[0].checked = true;
blueFlagInput[0].checked = true;

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

  let url = "/sendSerialData";

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