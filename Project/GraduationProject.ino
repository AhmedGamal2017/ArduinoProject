//Libraries
#include <LiquidCrystal.h>
#include <EEPROM.h>

LiquidCrystal lcd(7, 8, 9, 10, 11, 12); //Arduino pins to lcd

const int up = 2;
const int down = 3;
const int ledRed = 6;
const int ledBlue = 13;

int counter = 0;
int stateUp = 0, stateDown = 0;

char redFlagChar = '2', blueFlagChar = '2';

bool redFlag, blueFlag,
     redAutoFlag = true, blueAutoFlag = true;

void setup() {
  Serial.begin(9600);

  // Define Switch Buttons Pins
  pinMode(up, INPUT);
  pinMode(down, INPUT);

  // Define Leds Pins
  pinMode(ledRed, OUTPUT);
  pinMode(ledBlue, OUTPUT);

  // lcd initialization
  lcd.begin(16, 2);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.write("   Welcome To   ");
  lcd.setCursor(0, 1);
  lcd.print("Digital  Counter");
  delay(2000);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Counter: ");

  printCounter(counter);

  // initialize Flags
  PrintSerial();
  SetFlags();
}

void loop() {

  lcd.setCursor(10, 0);

  if (Serial.available() > 0) {
    redFlagChar = Serial.read();
    blueFlagChar = Serial.read();

    PrintSerial();
    SetFlags();

    LedsUpdate();
  }

  if (digitalRead(up) == HIGH) {
    if (stateUp == 0) {
      counter += 1;
      printCounter(counter);

      LedsOn();

      stateUp = 1;
    }
  }
  else {
    stateUp = 0;
  }

  if (digitalRead(down) == HIGH) {
    if (stateDown == 0 && counter > 0) {
      counter -= 1;
      printCounter(counter);

      stateDown = 1;
    }
  }
  else {
    stateDown = 0;
  }

  if (counter == 0) {
    LedsUpdate();
  }

  delay(50);
}

void printCounter(int param) {
  lcd.print("      ");
  lcd.setCursor(10, 0);
  lcd.print(param);
}

void LedsOn() {
  if (blueAutoFlag) {
    digitalWrite(ledBlue, HIGH);
  }

  if (redAutoFlag) {
    digitalWrite(ledRed, HIGH);
  }
}

void LedsOff() {
  if (blueAutoFlag) {
    digitalWrite(ledBlue, LOW);
  }

  if (redAutoFlag) {
    digitalWrite(ledRed, LOW);
  }
}

void LedsUpdate() {
  if (counter > 0) {
    LedsOn();
  } else {
    LedsOff();
  }
  
  if (!redAutoFlag) {
    if (redFlag) {
      digitalWrite(ledRed, HIGH);
    } else {
      digitalWrite(ledRed, LOW);
    }
  }
  
  if (!blueAutoFlag) {
    if (blueFlag) {
      digitalWrite(ledBlue, HIGH);
    } else {
      digitalWrite(ledBlue, LOW);
    }
  }

}

void SetFlags () {
  switch (redFlagChar) {
    default:
    case '0':
      redFlag = false;
      redAutoFlag = false;
      break;
    case '1':
      redFlag = true;
      redAutoFlag = false;
      break;
    case '2':
      redAutoFlag = true;
      break;
  }

  switch (blueFlagChar) {
    default:
    case '0':
      blueFlag = false;
      blueAutoFlag = false;
      break;
    case '1':
      blueFlag = true;
      blueAutoFlag = false;
      break;
    case '2':
      blueAutoFlag = true;
      break;
  }
}

void PrintSerial() {
  lcd.setCursor(0, 1);
  switch (redFlagChar) {
    default:
    case '0':
      lcd.print("R: OFF ");
      break;
    case '1':
      lcd.print("R: ON  ");
      break;
    case '2':
      lcd.print("R: AUTO");
      break;
  }

  lcd.setCursor(8, 1);
  switch (blueFlagChar) {
    default:
    case '0':
      lcd.print("B: OFF ");
      break;
    case '1':
      lcd.print("B: ON  ");
      break;
    case '2':
      lcd.print("B: AUTO");
      break;
  }
}
