
const int Motor1L = 14; //Motor1Left
const int Motor1R = 15;
const int Motor2L = 16;
const int Motor2R = 17;
int serialData = 0;
int data = 0;
unsigned int time = 0;


void setup() 
{
 Serial.begin(9600);  
 pinMode(Motor1L, OUTPUT);   
 pinMode(Motor1R, OUTPUT);   
 pinMode(Motor2L, OUTPUT);   
 pinMode(Motor2R, OUTPUT);
}


void loop() 
{ 
  if (time > 50000) {
    Break();
    Serial.println("Time out, mah nigga.");
    time = 0;
  }
  if (Serial.available() > 0) {//Check if its possible to send info over serial
    serialData = Serial.read();
    switch(serialData) {
      case 119 :
        Forward();
        time = 0;
        break;
      case 115 :
        Backward();
        time = 0;
        break;
      case 97 :
        Left();
        time = 0;
        break;
      case 100 :
        Right();
        time = 0;
        break;
      case 102 :
        Break();
        time = 0;
        break;
    }
  }
  time++;
}

void Forward()
{
 digitalWrite(Motor1R, HIGH);
 digitalWrite(Motor1L, LOW);
 digitalWrite(Motor2R, HIGH);
 digitalWrite(Motor2L, LOW);
}

void Backward()
{
 digitalWrite(Motor1L, HIGH);
 digitalWrite(Motor1R, LOW);
 digitalWrite(Motor2L, HIGH);
 digitalWrite(Motor2R, LOW);
}

void Right()
{
  digitalWrite(Motor1L, HIGH);
  digitalWrite(Motor1R, LOW);
  digitalWrite(Motor2L, LOW);
  digitalWrite(Motor2R, HIGH);
}

void Left()
{
  digitalWrite(Motor1L, LOW);
  digitalWrite(Motor1R, HIGH);
  digitalWrite(Motor2L, HIGH);
  digitalWrite(Motor2R, LOW);
}

void Break()
{
  digitalWrite(Motor1L, LOW);
  digitalWrite(Motor1R, LOW);
  digitalWrite(Motor2L, LOW);
  digitalWrite(Motor2R, LOW);
}
