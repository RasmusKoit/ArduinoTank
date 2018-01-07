from flask import Flask, send_file
from TankControl import TankControl

app = Flask(__name__)
t = TankControl('COM6')
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

if __name__ == '__main__':
    app.run()
