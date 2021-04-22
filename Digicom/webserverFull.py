#!/usr/bin/python
from threading import Thread
from SocketServer import ThreadingMixIn
from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer
from os import sep, curdir
import time

import keyboard

PORT_NUMBER1 = 5000		#Receives data from ESP
PORT_NUMBER2 = 80		#Serves the Web page

# This class will write text files
class myHandler1(BaseHTTPRequestHandler):
	
	Error_Page = """\
        <html>
        <body>
        <h1>Error accessing {path}</h1>
        <p>{msg}</p>
        </body>
        </html>
        """

	#Handler for the GET requests
	def do_GET(self):

		try:
			chain = self.path[1:]		# Remove the '/'            
			self.handle_data(chain)

		# Handle errors.
		except Exception as msg:
			self.handle_error(msg)

	def handle_data(self, chain):
		try:
			print("I received this: " + chain)
			hour = time.strftime("%X",time.gmtime(time.time()-18000))
			date = time.strftime("%x",time.gmtime(time.time()-18000))
			# Creamos archivos del 1 al 40 acorde al dispositivo que haya enviado los datos
			if  chain.startswith('bicho1'):
				filenow = 'data1.csv'
			elif chain.startswith('bicho2'):
				filenow = 'data2.csv'
			elif chain.startswith('bicho3'):
				filenow = 'data3.csv'
			elif chain.startswith('bicho4'):
				filenow = 'data4.csv'
			elif chain.startswith('bicho5'):
				filenow = 'data5.csv'
			elif chain.startswith('bicho6'):
				filenow = 'data6.csv'
			elif chain.startswith('bicho7'):
				filenow = 'data7.csv'
			elif chain.startswith('bicho8'):
				filenow = 'data8.csv'
			elif chain.startswith('bicho9'):
				filenow = 'data9.csv'
			elif chain.startswith('bicho_10'):
				filenow = 'data10.csv'
			elif chain.startswith('bicho_11'):
				filenow = 'data11.csv'
			elif chain.startswith('bicho_12'):
				filenow = 'data12.csv'
			elif chain.startswith('bicho_13'):
				filenow = 'data13.csv'
			elif chain.startswith('bicho_14'):
				filenow = 'data14.csv'
			elif chain.startswith('bicho_15'):
				filenow = 'data15.csv'
			elif chain.startswith('bicho_16'):
				filenow = 'data16.csv'
			elif chain.startswith('bicho_17'):
				filenow = 'data17.csv'
			elif chain.startswith('bicho_18'):
				filenow = 'data18.csv'
			elif chain.startswith('bicho_19'):
				filenow = 'data19.csv'
			elif chain.startswith('bicho_20'):
				filenow = 'data20.csv'
			elif chain.startswith('bicho_21'):
				filenow = 'data21.csv'
			elif chain.startswith('bicho_22'):
				filenow = 'data22.csv'
			elif chain.startswith('bicho_23'):
				filenow = 'data23.csv'
			elif chain.startswith('bicho_24'):
				filenow = 'data24.csv'
			elif chain.startswith('bicho_25'):
				filenow = 'data25.csv'
			elif chain.startswith('bicho_26'):
				filenow = 'data26.csv'
			elif chain.startswith('bicho_27'):
				filenow = 'data27.csv'
			elif chain.startswith('bicho_28'):
				filenow = 'data28.csv'
			elif chain.startswith('bicho_29'):
				filenow = 'data29.csv'
			elif chain.startswith('bicho_30'):
				filenow = 'data30.csv'
			elif chain.startswith('bicho_31'):
				filenow = 'data31.csv'
			elif chain.startswith('bicho_32'):
				filenow = 'data32.csv'
			elif chain.startswith('bicho_33'):
				filenow = 'data33.csv'
			elif chain.startswith('bicho_34'):
				filenow = 'data34.csv'
			elif chain.startswith('bicho_35'):
				filenow = 'data35.csv'
			elif chain.startswith('bicho_36'):
				filenow = 'data36.csv'
			elif chain.startswith('bicho_37'):
				filenow = 'data37.csv'
			elif chain.startswith('bicho_38'):
				filenow = 'data38.csv'
			elif chain.startswith('bicho_39'):
				filenow = 'data39.csv'
			elif chain.startswith('bicho_40'):
				filenow = 'data40.csv'
			else:
				filenow = 'trash.txt'
			#filepath = ''			
			filepath = '/home/termiot/termiot/Digicom/'
			with open(filepath + filenow, 'a') as file:
			#with open("data.csv", 'a') as file:
				file.write(date + "," + hour + "," + chain + "\n")
			#content = self.OK_Page.format(chain=chain, date=date, hour=hour)
			content = "Received"
			self.send_content(content)
		except IOError as msg:
			msg = "'{0}' cannot be read: {1}".format(self.path, msg)
			self.handle_error(msg)

	def handle_error(self, msg):
		content = self.Error_Page.format(path=self.path, msg=msg)
		self.send_content(content, 404)

	# Send actual content.
	def send_content(self, content, status=200):
		self.send_response(status)
		self.send_header("Content-type", "text/html")
		self.send_header("Content-Length", str(len(content)))
		self.end_headers()
		self.wfile.write(content)

#This class will handle any incoming request from  the browser
class myHandler2(BaseHTTPRequestHandler):
	
	#Handler for the GET requests
	def do_GET(self):
		if self.path == "/":
			#self.path = "/index.html"
			self.path = "/home/termiot/termiot/Digicom/index.html"
		else :
			self.path = "/home/termiot/termiot/Digicom" + self.path

		try:
			#Check the file extension required and
			#set the right mime type
			sendReply = False
			if self.path.endswith(".html"):
				mimetype='text/html'
				sendReply = True
			if self.path.endswith(".js"):
				mimetype='application/javascript'
				sendReply = True
			if self.path.endswith(".css"):
				mimetype='text/css'
				sendReply = True
			#For images
			if self.path.endswith(".jpg"):
				mimetype='image/jpg'
				sendReply = True
			if self.path.endswith(".gif"):
				mimetype='image/gif'
				sendReply = True
			if self.path.endswith(".png"):
				mimetype='image/png'
				sendReply = True
			if self.path.endswith(".ico"):
				mimetype='image/x-icon'
				sendReply = True
			#Others
			if self.path.endswith(".csv"):
				mimetype='text/csv'
				sendReply = True

			if sendReply == True:
				#Open the static file requested and send it
				f = open(curdir + sep + self.path, 'rb')
				print curdir + sep + self.path
				self.send_response(200)				
				#self.send_header("Content-Length",len(f.read()))
				self.send_header('Content-type',mimetype)
				self.end_headers()
				self.wfile.write(f.read())
				f.close()
			return

		except IOError:
			self.send_error(404,'File Not Found: %s' % self.path)




def stop_it():
	global keep_running
	while keep_running:
		if keyboard.read_key() == "x":
			print("You pressed x")
			break
	keep_running = False
	print "Leaving..."
	server1.shutdown()
	server2.shutdown()
	server1.socket.close()
	server2.socket.close()
	print "Chao"


#################################
# MAIN CODE
#################################

keep_running = True

try:
	#Create a web server and define the handler to manage the
	#incoming request
	server1 = HTTPServer(('', PORT_NUMBER1), myHandler1)
	print 'Started httpserver on port ' , PORT_NUMBER1

	server2 = HTTPServer(('', PORT_NUMBER2), myHandler2)
	print 'Started httpserver on port ' , PORT_NUMBER2

	print "Press \'x\' to stop and leave"

	server1_thread = Thread(target=server1.serve_forever)
	server2_thread = Thread(target=server2.serve_forever)
	dummy = Thread(target=stop_it)
	server1_thread.start()
	server2_thread.start()
	dummy.start()

except KeyboardInterrupt:
	try:	
		print '^C received, shutting down the web server'
		server1.socket.close()
		server2.socket.close()
		server1.shutdown()
		server2.shutdown()
	except Exception:
		logging.exception("Can't shutdown %r" % (server1,)) # log exception here
		print "useless"
