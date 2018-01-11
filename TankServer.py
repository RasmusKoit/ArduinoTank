from flask import Flask, send_file
from flask_sockets import Sockets
from TankControl import TankControl

app = Flask(__name__)
sockets = Sockets(app)
t = TankControl('/dev/ttyACM0')
print("Tank connected!")

@app.route('/')
def mainPage():
    return send_file('index.html')


@app.route('/listener.js')
def startListener():
    return send_file('listener.js')


@app.route('/forward')
def forward():
    t.Forward()
    return '', 201


@app.route('/backward')
def backward():
    t.Backward()
    return '', 201


@app.route('/left')
def left():
    t.Left()
    return '', 201


@app.route('/right')
def right():
    t.Right()
    return '', 201


@app.route('/twerk')
def booty():
    t.Twerk()
    return '', 201


@app.route('/stop')
def stop():
    t.Stop()
    return '', 201

@sockets.route('/cmd')
def echo_socket(ws):
    while not ws.closed:
        message = ws.receive()
        print(message)
        ws.send(message)
        if message == "/forward":
        	t.Forward()
        elif message == "/backward":
        	t.Backward()
        elif message == "/right":
        	t.Right()
        elif message == "/left":
        	t.Left()
        else:
        	t.Stop()

if __name__ == "__main__":
    from gevent import pywsgi
    from geventwebsocket.handler import WebSocketHandler
    server = pywsgi.WSGIServer(('', 5000), app, handler_class=WebSocketHandler)
    print("Servu yea")
    server.serve_forever()
