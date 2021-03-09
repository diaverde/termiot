#!/usr/bin/python
from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer
from os import sep, curdir
import time

PORT_NUMBER1 = 5000		#Receives data from ESP

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
			else:
				filenow = 'trash.txt'
			with open(filenow, 'a') as file:
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


#################################
# MAIN CODE
#################################

keep_running = True

try:
	#Create a web server and define the handler to manage the
	#incoming request
	server1 = HTTPServer(('', PORT_NUMBER1), myHandler1)
	print 'Started httpserver on port ' , PORT_NUMBER1

	print "Press \'x\' to stop and leave"

	server1.serve_forever()

except KeyboardInterrupt:
	try:	
		print '^C received, shutting down the web server'
		server1.socket.close()
		server1.shutdown()
	except Exception:
		logging.exception("Can't shutdown %r" % (server1,)) # log exception here
		print "useless"
