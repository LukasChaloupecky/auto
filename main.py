#levý motor->
#pravý motor->
#levý senzor->
#pravý sensor->
#u křižovatek- naprogramovat přes ovladání možnost > až uvidíž křižovatku > ("odboč vlevo, nebo vpravo")

krizovatkaVLEVO = ""
krizovatkaVPRAVO = ""
krizovatkaROVNE = ""
moznost = 0
radio.set_group(25)
def turnright():
    global item
    pins.analog_write_pin(AnalogPin.P1, 600)
    pins.digital_write_pin(DigitalPin.P8, 1)
    pins.analog_write_pin(AnalogPin.P2, 100)
    pins.digital_write_pin(DigitalPin.P12, 1)
    item = 0
def stop():
    pins.analog_write_pin(AnalogPin.P1, 0)
    pins.digital_write_pin(DigitalPin.P8, 0)
    pins.analog_write_pin(AnalogPin.P2, 0)
    pins.digital_write_pin(DigitalPin.P12, 0)
def forward():
    pins.analog_write_pin(AnalogPin.P1, 600)
    pins.analog_write_pin(AnalogPin.P2, 600)
    pins.digital_write_pin(DigitalPin.P8, 1)
    pins.digital_write_pin(DigitalPin.P12, 1)
def turnleft():
    global item
    pins.analog_write_pin(AnalogPin.P1, 100)
    pins.digital_write_pin(DigitalPin.P8, 1)
    pins.analog_write_pin(AnalogPin.P2, 600)
    pins.digital_write_pin(DigitalPin.P12, 1)
    item = 0
item = 0
led.enable(False)
pins.set_pull(DigitalPin.P4, PinPullMode.PULL_UP)
pins.set_pull(DigitalPin.P5, PinPullMode.PULL_UP)
item = 0

def on_forever():
    global item
    if pins.digital_read_pin(DigitalPin.P4) == 0 and pins.digital_read_pin(DigitalPin.P5) == 0:
        forward()
    elif pins.digital_read_pin(DigitalPin.P4) == 1 and pins.digital_read_pin(DigitalPin.P5) == 1:
        item += 1
    elif pins.digital_read_pin(DigitalPin.P4) == 1 and pins.digital_read_pin(DigitalPin.P5) == 0:
        turnright()
    elif pins.digital_read_pin(DigitalPin.P4) == 0 and pins.digital_read_pin(DigitalPin.P5) == 1:
        turnleft()
    if item > 30:
        stop()
basic.forever(on_forever)



def on_received_string(receivedString):
    global moznost
    if receivedString == "krizovatkaVLEVO":
        moznost = 1
radio.on_received_string(on_received_string)
