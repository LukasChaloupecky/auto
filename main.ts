// levý motor->
// pravý motor->
// levý senzor->
// pravý sensor->
// u křižovatek- naprogramovat přes ovladání možnost > až uvidíž křižovatku > ("odboč vlevo, nebo vpravo")
let krizovatkaVLEVO = ""
let krizovatkaVPRAVO = ""
let krizovatkaROVNE = ""
let moznost = 0
radio.setGroup(25)
function turnright() {
    
    pins.analogWritePin(AnalogPin.P1, 600)
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.analogWritePin(AnalogPin.P2, 100)
    pins.digitalWritePin(DigitalPin.P12, 1)
    item = 0
}

function stop() {
    pins.analogWritePin(AnalogPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P8, 0)
    pins.analogWritePin(AnalogPin.P2, 0)
    pins.digitalWritePin(DigitalPin.P12, 0)
}

function forward() {
    pins.analogWritePin(AnalogPin.P1, 600)
    pins.analogWritePin(AnalogPin.P2, 600)
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.digitalWritePin(DigitalPin.P12, 1)
}

function turnleft() {
    
    pins.analogWritePin(AnalogPin.P1, 100)
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.analogWritePin(AnalogPin.P2, 600)
    pins.digitalWritePin(DigitalPin.P12, 1)
    item = 0
}

let item = 0
led.enable(false)
pins.setPull(DigitalPin.P4, PinPullMode.PullUp)
pins.setPull(DigitalPin.P5, PinPullMode.PullUp)
item = 0
basic.forever(function on_forever() {
    
    if (pins.digitalReadPin(DigitalPin.P4) == 0 && pins.digitalReadPin(DigitalPin.P5) == 0) {
        forward()
    } else if (pins.digitalReadPin(DigitalPin.P4) == 1 && pins.digitalReadPin(DigitalPin.P5) == 1) {
        item += 1
    } else if (pins.digitalReadPin(DigitalPin.P4) == 1 && pins.digitalReadPin(DigitalPin.P5) == 0) {
        turnright()
    } else if (pins.digitalReadPin(DigitalPin.P4) == 0 && pins.digitalReadPin(DigitalPin.P5) == 1) {
        turnleft()
    }
    
    if (item > 30) {
        stop()
    }
    
})
radio.onReceivedString(function on_received_string(receivedString: string) {
    
    if (receivedString == "krizovatkaVLEVO") {
        moznost = 1
    }
    
})
