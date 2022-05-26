// levý motor->
// pravý motor->
// levý senzor->
// pravý sensor->
// u křižovatek- naprogramovat přes ovladání možnost > až uvidíž křižovatku > ("odboč vlevo, nebo vpravo")
//  udelat z rychlosti 600 100 atd. promene pres radio (pres druhy microbit pak pujde ovladat otaceni- podle toho jak moc bude draha kulata ci rovna)
//  
let count = 0
// dostává vozítka do správné trajektorie aby potom mohl odbocin vpravo nebo vlevo 
let moznost = ""
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
function ctverecVeSmeru() {
    let forward_ = 800
    // rychlost u ctverce 
    let rightMesni = 100
    let rightVetsi = 800
    let leftMensi = 300
    let leftVetsi = 600
    let right_Mensi = 300
    let right_Vetsi = 600
    if (pins.digitalReadPin(DigitalPin.P4) == 0 && pins.digitalReadPin(DigitalPin.P5) == 0) {
        turnright()
    }
    
    if (pins.digitalReadPin(DigitalPin.P4) == 1 && pins.digitalReadPin(DigitalPin.P5) == 1) {
        forward()
    }
    
    if (pins.digitalReadPin(DigitalPin.P4) == 1 && pins.digitalReadPin(DigitalPin.P5) == 0) {
        turnleft()
    }
    
    if (pins.digitalReadPin(DigitalPin.P4) == 0 && pins.digitalReadPin(DigitalPin.P5) == 1) {
        
    }
    
}

// turnright_uvnitr()dodělat 
basic.forever(function on_forever() {
    
    if (moznost == "krizovatkaVLEVO" && pins.digitalReadPin(DigitalPin.P4) == 1 && pins.digitalReadPin(DigitalPin.P5) == 1) {
        turnleft()
    } else if (moznost == "krizovatkaVPRAVO" && pins.digitalReadPin(DigitalPin.P4) == 1 && pins.digitalReadPin(DigitalPin.P5) == 1) {
        if (count == 0) {
            pins.analogWritePin(AnalogPin.P1, 0)
            // levý motor
            pins.analogWritePin(AnalogPin.P2, 600)
            // pravy motor
            basic.pause(250)
        }
        
    } else if (pins.digitalReadPin(DigitalPin.P4) == 1 && pins.digitalReadPin(DigitalPin.P5) == 1) {
        // doba otaceni do praveho uhlu
        forward()
    } else if (pins.digitalReadPin(DigitalPin.P4) == 0 && pins.digitalReadPin(DigitalPin.P5) == 0) {
        item += 1
    }
    
    if (moznost == "krizovatkaVPRAVO" && pins.digitalReadPin(DigitalPin.P4) == 0 && pins.digitalReadPin(DigitalPin.P5) == 1) {
        turnright()
    } else if (pins.digitalReadPin(DigitalPin.P4) == 0 && pins.digitalReadPin(DigitalPin.P5) == 1) {
        turnright()
    }
    
    if (moznost == "krizovatkaVLEVO" && pins.digitalReadPin(DigitalPin.P4) == 1 && pins.digitalReadPin(DigitalPin.P5) == 0) {
        turnright()
    } else if (moznost == "krizovatkaVPRAVO" && pins.digitalReadPin(DigitalPin.P4) == 1 && pins.digitalReadPin(DigitalPin.P5) == 0) {
        forward()
    } else if (pins.digitalReadPin(DigitalPin.P4) == 1 && pins.digitalReadPin(DigitalPin.P5) == 0) {
        turnleft()
    }
    
    if (item > 30) {
        stop()
    }
    
})
radio.onReceivedString(function on_received_string(receivedString: string) {
    
    moznost = receivedString
    if (receivedString == "CtverecVeSmeruHodinovychRucicek") {
        ctverecVeSmeru()
    }
    
})
