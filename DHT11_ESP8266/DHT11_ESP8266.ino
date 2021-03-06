/*********
Programa que envía datos recolectados de sensor DHT11 a servidor por HTTP
NO usa el Micro, no da indicación de batería
OJO:  HACER TRUCO DEL CABLEADO ESPECIAL EN EL ESP8266 ANTES DE CARGARLE ESTE PROGRAMA
*********/

// Incluimos librería
#include <DHT.h>
// Librerías para WiFi
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
 
// Definimos el pin digital donde se conecta el sensor
#define DHTPIN 2
// Definir tipo de sensor
#define DHTTYPE DHT11
// Y los demás
//#define sensorPin A0
//#define ledPin 16
 
// Inicializamos el sensor DHT11
DHT dht(DHTPIN, DHTTYPE);

// Conexión a red WIFI
const char *ssid = "HOME-B9D7";             //ENTER YOUR WIFI SETTINGS <<<<<<<<<
const char *password = "AAB9B2138EADFDC7";

// Servidor al que se envían los datos
//const char *host = "10.0.0.13";
const char *host = "api.thingspeak.com";
String apiKey = "BPSY288E9ZIZ2KR8";         //ENTER YOUR API KEY <<<<<<<<<<<

// Tiempo de inactividad (en segundos):
const int sleepTimeS = 20;

/*
// Variables para monitoreo del estado de la batería
int sensorValue;      // variable to store the value coming from the sensor
float voltage;          // variable to store the battery voltage

// Filtro para nivel de batería
int cont_fil;
int32_t fil_volt[10];
int32_t values_volt;
double volt_filavg;
*/

//=======================================================================
//                    SETUP
//=======================================================================

void setup() {
  delay(1000);
  Serial.begin(115200);

  // Comenzamos el sensor DHT
  dht.begin();

  WiFi.mode(WIFI_STA);        //This line hides the viewing of ESP as wifi hotspot
  //WiFi.mode(WIFI_AP_STA);   //Both hotspot and client are enabled
  //WiFi.mode(WIFI_AP);       //Only Access point

  /*
  // declare the ledPin as an OUTPUT:
  //pinMode(ledPin, OUTPUT);
  
  // Inicializar filtro  
  cont_fil = 0;
  sensorValue = analogRead(sensorPin);
  delay(1);
  sensorValue = analogRead(sensorPin);
  sensorValue = analogRead(sensorPin);
  for (int i=1; i<10; i++) fil_volt[i] = sensorValue;
  */
}
  
void loop() {
//=======================================================================
//                    Main Program Loop 
//=======================================================================
  
  // Esperamos 5 segundos entre medidas
  //delay(5000);
 
  // Leemos la humedad relativa
  float h = dht.readHumidity();
  // Leemos la temperatura en grados centígrados (por defecto)
  float t = dht.readTemperature();
  // Leemos la temperatura en grados Fahreheit
  float f = dht.readTemperature(true);
 
  // Comprobamos si ha habido algún error en la lectura
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println("Error obteniendo los datos del sensor DHT11");
    return;
  }
 
  // Calcular el índice de calor en Fahreheit
  float hif = dht.computeHeatIndex(f, h);
  // Calcular el índice de calor en grados centígrados
  float hic = dht.computeHeatIndex(t, h, false);
 
  // Monitoreo por puerto serial
  Serial.print("Humedad: ");
  Serial.print(h);
  Serial.print(" %\t");
  Serial.print("Temperatura: ");
  Serial.print(t);
  Serial.print(" *C ");
  Serial.print(f);
  Serial.print(" *F\t");
  Serial.print("Índice de calor: ");
  Serial.print(hic);
  Serial.print(" *C ");
  Serial.print(hif);
  Serial.println(" *F");

  //--------------------------------------------------------------------- 
  // Leer estado de la batería
  /*
  sensorValue = analogRead(sensorPin);
  delay(1);
  sensorValue = analogRead(sensorPin);
  sensorValue = analogRead(sensorPin);  

  // Filtro de promedio
  fil_volt[cont_fil] = sensorValue;
  values_volt = fil_volt[0];
  for (int i=1; i<10; i++) values_volt += fil_volt[i];
  volt_filavg = values_volt*0.1;        // 0.1 = 1/10
  // Increase counter for averaging filter
  cont_fil++;
  if (cont_fil >= 10) cont_fil = 0;
  
  // 57 y 94 obtenidos por regresión
  voltage = (volt_filavg-57)/94;
  Serial.print("El nivel actual de la batería es: ");
  Serial.print(voltage);
  Serial.println(" V");

  // 450 is equal to 0.63 V which is critical voltage
  if (voltage <= 6.8) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }
*/
  //---------------------------------------------------------------------    
  WiFi.begin(ssid, password);     //Connect to your WiFi router
  Serial.println("");

  Serial.print("Connecting");
  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  //If connection successful show IP address in serial monitor
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());  //IP address assigned to your ESP
  delay(200);
  
  WiFiClient client;
  const int httpPort = 80; //Port 80 is commonly used for www
 //---------------------------------------------------------------------
 //Connect to host, host(web site) is define at top 
 if(!client.connect(host, httpPort)){
   Serial.println("Connection Failed");
   delay(500);
   return; //Keep retrying until we get connected
 }
 
  //--------------------------------------------------------------------- 
  //Make GET request as pet HTTP GET Protocol format
  String HData, TData, HICData, BData;  
  HData = String(h);
  TData = String(t);
  HICData = String(hic);
  //BData = String(voltage);
  String Link = "GET /update?api_key=" + apiKey + "&field1=";  //Requeste webpage  
  Link = Link + HData;
  Link += "&field2=";
  Link = Link + TData;
  Link += "&field3=";
  Link = Link + HICData;
  //Link += "&field4=";
  //Link = Link + BData;
  Link = Link + " HTTP/1.1\r\n" + "Host: " + host + "\r\n" + "Connection: close\r\n\r\n";                
  client.print(Link);
  delay(100);
  
//---------------------------------------------------------------------
 //Wait for server to respond with timeout of 5 Seconds
 int timeout=0;
 while((!client.available()) && (timeout < 1000))     //Wait 5 seconds for data
 {
   delay(10);  //Use this with time out
   timeout++;
 }

//---------------------------------------------------------------------
 //If data is available before time out read it.
 if(timeout < 500) {
     while(client.available()){
        Serial.println(client.readString()); //Response from ThingSpeak       
     }
 } else {
     Serial.println("Request timeout..");
 }

 WiFi.disconnect();
 delay(50);
 // Sleep
  Serial.println("ESP8266 in sleep mode");
  ESP.deepSleep(sleepTimeS * 1000000);
}

//=======================================================================
