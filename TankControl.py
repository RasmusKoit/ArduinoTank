import serial
import time


class TankControl:
    def __init__(self, port):
        self.ser = serial.Serial(port)
        time.sleep(3)
    def Forward(self):
        self.ser.write(b'w')
    def Left(self):
        self.ser.write(b'a')
    def Backward(self):
        self.ser.write(b's')
    def Right(self):
        self.ser.write(b'd')
    def Stop(self):
        self.ser.write(b'f')
    def Twerk(self):
        self.Forward()
        time.sleep(0.1)
        self.Left()
        time.sleep(0.1)
        self.Backward()
        time.sleep(0.1)
        self.Right()
        time.sleep(0.1)

if __name__ == '__main__':
    t = TankControl('COM6')
    t.Twerk()
