  /*
 INPUTS:
 - Sensor DHT11 or 22
 - Analog input (battery)

 OUTPUTS:
 - Serial 
*/

// Incluimos librerías
#include <DHT.h>              // DHT sensor
#include <JeeLib.h>           // Low power functions library
#include <SoftwareSerial.h>   // Serial comm wih ESP

// Definimos el pin digital donde se conecta el sensor
#define DHTPIN 5
// Definimos el tipo de sensor DHT: 11 o 22
#define DHTTYPE DHT22
// Y los demás
#define analogInPin A0
#define ledPin 13

// Inicializamos el sensor DHT11
DHT dht(DHTPIN, DHTTYPE);

// Inicializar instancia de comunicación serial por software
SoftwareSerial mySerial(11, 12); // RX, TX

const int WAIT_TIME = 1;            // Número de minutos entre medidas
int sensorValue;              // value read from the ADC
int sensorValuedummy;         // value read from the ADC to be discarded
float battery;
int sendFlag;
String S = "" ;

// Interrupciones para bajo consumo
ISR(WDT_vect) { Sleepy::watchdogEvent(); } // Setup the watchdog


void setup() {
  Serial.begin(115200);
  while (!Serial);                // wait for serial port to connect. Needed for native USB port only
  Serial.println("Iniciando programa.");
  Serial.println("Esperando respuesta del ESP...");
  pinMode(ledPin, OUTPUT);
  delay(100);
  digitalWrite(ledPin, HIGH);
  delay(1000);
  digitalWrite(ledPin, LOW);

  // Comenzamos el sensor DHT
  dht.begin();

  mySerial.begin(9600);   // set the data rate for the SoftwareSerial port
  sendFlag = 0;           // 0: Listening through serial / 1: Sending data / 2: Waiting  
}


void loop() {  
  // En modo escucha serial
  if (sendFlag == 0){
    // Leer datos seriales
    if (mySerial.available()) {
      char c = mySerial.read();
      Serial.print(c);
      if ( c != '\n' ) {            // Hasta que el caracter sea intro
        S = S + c;        
      } else {
        if (S.startsWith("Welcome")) {
          sendFlag = 1;          
        }
        if (S.startsWith("Successful") || S.startsWith("Request")) {
          sendFlag = 2;
        }
        S = "";
      }
    }
  }
  
  // En modo recolección y envío de datos al ESP
  if (sendFlag == 1){
    // Leemos la humedad relativa
    float h = dht.readHumidity();
    // Leemos la temperatura en grados Celsius (por defecto)
    float t = dht.readTemperature();
    // Leemos la temperatura en grados Fahrenheit
    float f = dht.readTemperature(true);
   
    // Comprobamos si ha habido algún error en la lectura
    if (isnan(h) || isnan(t) || isnan(f)) {
      Serial.println("Error obteniendo los datos del sensor DHT11");
      sendFlag = 2;
      //return;
    }
   
    // Calcular el índice de calor en grados Fahrenheit
    float hif = dht.computeHeatIndex(f, h);
    // Calcular el índice de calor en grados Celsius
    float hic = dht.computeHeatIndex(t, h, false);
   
    // Monitoreo por puerto serial
    //*
    Serial.print("Humedad: ");
    Serial.print(h);
    Serial.print(" %\t");
    Serial.print("Temperatura: ");
    Serial.print(t);
    Serial.print(" *C ");
    Serial.print(f);
    Serial.print(" *F\t");
    Serial.print("Indice de calor: ");
    Serial.print(hic);
    Serial.print(" *C ");
    Serial.print(hif);
    Serial.println(" *F");
    //*/
    
    // Leer y filtrar valor de la batería
    for (int i = 0; i < 10; i++){
      sensorValuedummy = analogRead(analogInPin);
      delay(1);
      sensorValuedummy = analogRead(analogInPin);
      if (i == 0) sensorValue = analogRead(analogInPin);
      else sensorValue += analogRead(analogInPin);
    }
    sensorValue = sensorValue/10;         // Valor promedio    
    //battery = float(sensorValue)*4.65/1023;       // Vref está en 4.65
    battery = float(sensorValue)*3.3/1023*2;        // Vref está en 3.3, se duplica por el divisor de voltaje
    Serial.print("Nivel de la bateria: ");
    Serial.print(battery);
    Serial.println(" V");
    // Alarma por bajo nivel
    if (battery < 3.5) digitalWrite(ledPin, HIGH);
    //if (battery < 1.75) digitalWrite(ledPin, HIGH);         // Por el divisor de voltaje, debe ser la mitad del valor crítico (3.5V)
    else digitalWrite(ledPin, LOW);
    
    // Trama GET para comunicación HTTP
    String HData, TData, HICData, BData;
    HData = String(h);
    TData = String(t);
    HICData = String(hic);
    BData = String(battery);
    // Si se usa Thingspeak
    /*
    String Link = "Punkfield1=";
    Link = Link + HData;
    Link += "&field2=";
    Link = Link + TData;
    Link += "&field3=";
    Link = Link + HICData;
    Link += "&field4=";
    Link = Link + BData;
    */
    // Si se usa servidor propio
    String Link = "Punk";
    Link = Link + HData;
    Link += ",";
    Link = Link + TData;
    Link += ",";    
    Link = Link + BData;
    Link += ",";
    // Envío de toda la cadena de datos al ESP
    mySerial.print(Link);
    mySerial.print('\r');     // retorno de carro
    Serial.print("He enviado: ");
    Serial.println(Link);
    sendFlag = 0;
    Serial.flush();
  }

  // Modo espera entre lecturas
  if (sendFlag == 2){
    // Si comunicación HTTP fue exitosa o si falló
    // Esperar WAIT_TIME minutos antes del próximo ciclo
    for (int i = 0; i < WAIT_TIME; i++) Sleepy::loseSomeTime(60000);  
    //delay(30000);
    sendFlag = 0;
  }

}
