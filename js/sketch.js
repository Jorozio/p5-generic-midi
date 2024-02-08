//////////////////////////
/* EDIT VALUES BELOW TO MATCH DEVICE SLIDERS*/
const CCSLIDER1 = 48;
const CCSLIDER2 = 49;
const CCSLIDER3 = 50;
const CCSLIDER4 = 51;
const CCSLIDER5 = 52;
const CCSLIDER6 = 53;
const CCSLIDER7 = 54;
const CCSLIDER8 = 55;
const CCSLIDER9 = 56;
//blank data
const SLIDERDATA = [0,0,0,0,0,0,0,0];
let colours;
let r = 70;
//////////////////////////
// built in P5 function gets called at the beginning
function setup() {
    createCanvas(innerWidth, innerHeight);
    background(30);

    colours = [random(255),random(255),random(255),random(255),random(255),random(255),random(255),random(255),random(255)];
    WebMidi
        .enable()
        .then(onEnabled)
        .catch(err => alert(err));
}
// gets called by MIDI library once MIDI enabled
function onEnabled() {
    // Display available MIDI input devices
    if (WebMidi.inputs.length < 1) {
        console.log("No device detected.");
    } else {
        WebMidi.inputs.forEach((device, index) => {
            console.log(`${index}: ${device.name}`);
        });
    }
    myController = WebMidi.inputs[0];
    myController.channels[1].addListener("noteon", noteOn);
    myController.channels[1].addListener("controlchange", allCC);

}
// gets called when a MIDI note its intercepted 
function noteOn(e) {
    // for APC Mini
    // console.log(e.note.name, e.note.accidental || null, e.note.octave);
    // calculate the postion of the note in the grid of notes
    let pos = returnXY(e.note.name, e.note.accidental || '', e.note.octave);
    // calculate the x y pixel equivalent 
    // add offset values to position in the middle of an notional 8 x8 grid cell
    // width / 16 = half of cell size
    let hSpace = width / 16;
    let vSpace = height / 16;
    let x = pos.x * width + hSpace;
    let y = pos.y * height + vSpace
    // TODO - use these values to draw something at the note position?
    // for example: circle(x, y, 20)
}
// gets called when a MIDI control change message is intercepted
function allCC(e) {
    console.log(e.controller.number, e.data);
    let ratio = e.data[2] / 127
    switch (e.controller.number) {
        case CCSLIDER1: 
        SLIDERDATA[0] = ratio;
            break;
        case CCSLIDER2: 
        SLIDERDATA[1] = ratio;
            break;
        case CCSLIDER3: 
        SLIDERDATA[2] = ratio;
            break;
        case CCSLIDER4: 
        SLIDERDATA[3] = ratio;
            break;
        case CCSLIDER5: 
        SLIDERDATA[4] = ratio;
            break;
        case CCSLIDER6: 
        SLIDERDATA[5] = ratio;
            break;
        case CCSLIDER7: 
        SLIDERDATA[6] = ratio;
            break;
        case CCSLIDER8: 
        SLIDERDATA[7] = ratio;
            break;
        case CCSLIDER9:
            SLIDERDATA[8] = ratio;
            break;
    }}

    function draw() {
        stroke(255,30);
        translate(width /  2, height /  2);
        // fill(30);
        noFill()
    
        strokeWeight(1);
        // map(SLIDERDATA[3],  0,  1,  1,  10)
    
        rotate( map(SLIDERDATA[0] * 100,  0,  1,  0,  0.1));
       let inc = map(SLIDERDATA[3],  0,  1,  TAU / 8,  TAU / 2)
    
        beginShape();
        let baseInc = 100
        for (let a =  0; a < TAU; a += inc) {
            let xOff = random(-baseInc*SLIDERDATA[4],baseInc*SLIDERDATA[4]);
            let yOff = random(-baseInc*SLIDERDATA[5],baseInc*SLIDERDATA[5]);
            let x = r * cos(a) + xOff;
            let y = r * sin(a) + yOff;
    
            // Apply transformations based on other sliders
            // For example, the fourth slider might control the scale of the shape
            vertex(x * map(SLIDERDATA[1]* 10,  0,  1,  0.5,  1.5), y * map(SLIDERDATA[1],  0,  1,  0.5,  1.5));
        }
        endShape(CLOSE);
    }
