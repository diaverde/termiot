/*********
Transmisor: Envía datos recolectados de sensor DHT11 a servidor por HTTP
OJO:  HACER TRUCO DEL CABLEADO ESPECIAL EN EL ESP8266 ANTES DE CARGARLE ESTE PROGRAMA
*********/

#include <ESP8266WiFi.h>
#include <WiFiClient.h>

//#include <SoftwareSerial.h>
//SoftwareSerial mySerial(8, 9); // RX, TX

// Conexión a red WIFI
const char *ssid = "HOME-B9D7";             //ENTER YOUR WIFI SETTINGS <<<<<<<<<
const char *password = "AAB9B2138EADFDC7";

// Servidor al que se envían los datos
//const char *host = "10.0.0.13";
const char *host = "api.thingspeak.com";
String apiKey = "BPSY288E9ZIZ2KR8";         //ENTER YOUR API KEY <<<<<<<<<<<

const int NSEC = 290;            // Número de segundos a "dormir"
char dato;
String chain, chainf;
bool conn;                      // Bandera que indica si la conexión a la red WiFi fue exitosa
WiFiClient client;

void setup()
{ 
  delay(1000);
  Serial.begin(9600);
  
  // set the data rate for the SoftwareSerial port
  //mySerial.begin(38400);
  
  WiFi.mode(WIFI_STA);
  
  //WiFi_connect();    
  delay(500);
  
  Serial.println("");
  Serial.println("Welcome to ESP");                     // Importante: al leer este mensaje, inicia el micro el envío de datos por serial
  delay(100);
  Serial.println("Linked to Arduino");
  delay(500);
}

void loop()
{  
  //*
  // Leer datos recibidos por puerto serial
  //if (mySerial.available()) {  
  if (Serial.available()) {
    static char input[60];
    static uint8_t i;
    int d;
    //dato = mySerial.read();
    dato = Serial.read();
    if ( dato != '\r' && i < 59 ) // assuming "Carriage Return" is chosen in the Serial monitor as the line ending character
      input[i++] = dato;
    else
    {     
      input[i] = '\0';      
      //Serial.print("Esto he recibido: ");
      //Serial.println(input);
      chain = input;            
      int ind = chain.indexOf("Punk");            // "Punk" es palabra clave para iniciar trama
      if (ind != -1) {
        int index = ind + 4;
        chainf ="";
        for (d = index; d < i; d++) chainf += input[d];
        Serial.print("Esto he recibido: ");
        Serial.println(chainf);
        WiFi_connect();
        delay(500);
        if (conn == true) {                       // Si hay conexión WiFi procedemos a enviar por HTTP
          httpRequest();
          delay(500);
          WiFi.disconnect();
        }
        chain = "";
      }
      i = 0;
      //delay(NSEC*1000);
      ESP.deepSleep(NSEC*1000000);              // definida en microsegundos
    }
  }
  //*/
}

//void loop() {}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funciones adicionales
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//*
// Conexión WiFi
void WiFi_connect(){
  WiFi.begin(ssid, password);
  Serial.println("");
  Serial.println("inicializando red...");

  // Esperar conexión
  //*
  long time_conn = 0;  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    time_conn += 500;
    // Si se excede el límite de tiempo de conexión, irse a dormir
    if (time_conn > 60000) {
      conn = false;
      break; 
    } else {
      conn = true;
    }
  }
  //*/
  
  if (conn == true) {
    Serial.println("");
    Serial.print("Connected to ");                                      // Este mensaje le indica al micro que la conexión WiFi es exitosa
    Serial.println(ssid);
    //mySerial.print("Connected to ");
    //mySerial.println(ssid);
    Serial.print("My IP address is: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("");
    Serial.println("I could not connect, will try again next time");
    Serial.println("Request timeout..");                                // Este mensaje le indica al micro que no hubo conexión WiFi
  }
}

// Solicitud HTTP al servidor:
void httpRequest() {
  // Cerrar cualquier conexión existente para liberar el socket
  client.stop();

  // Si la conexión es exitosa
  if (client.connect(host, 80)) {
    String Link = "GET /update?api_key=" + apiKey + "&";               // Si se usa Thingspeak, dejar esta línea porque se requiere el API
    //String Link = "GET ";                                            // Si se usa servidor propio usar esta línea
    Link = Link + chainf;
    Link = Link + " HTTP/1.1\r\n" + "Host: " + host + "\r\n" + "Connection: close\r\n\r\n";
    client.print(Link);
    Serial.print("Se ha enviado: ");
    Serial.println(Link);
    delay(100);
    //*
  } else {
    // Si falló la conexión
    Serial.println("Sorry, connection failed");
  }
  //---------------------------------------------------------------------
  // Timeout de 5 segundos para respuesta del servidor
  int timeout=0;
  while((!client.available()) && (timeout < 1000))     //Wait 5 seconds for data
  {
    delay(10);  //Use this with time out
    timeout++;
  }
  //---------------------------------------------------------------------
  // Si hay respuesta antes del timeout debe leerse
  if(timeout < 500) {
    while(client.available()) {
      client.readString();
      //Serial.println(client.readString()); //Response from ThingSpeak
    }
    delay(200);
    Serial.println("");
    delay(10);
    Serial.println("Successful!");
    delay(50);
  } else {
    Serial.println("Request timeout..");
  }
  //delay(NSEC*1000);
  //*/
}
