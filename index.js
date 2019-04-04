var ik = require('./lib/ite_keyboard.js')
var iks = require('./lib/ite_keyboard_state.js')
var cfg = require('./config/state.js')
var clr = require('./config/color.js')
var misc = require('./config/misc.js')
var rot = require('./config/rotation.js')
var colorredhex = clr.colorred.toString(16);
var colorgreenhex = clr.colorgreen.toString(16);
var colorbluehex = clr.colorblue.toString(16);
var brighthex = String(misc.bright);
var speedhex = "0" + String(misc.speed);
if(clr.colorred<16){colorredhex = "0" + colorredhex;}
if(clr.colorgreen<16){colorgreenhex = "0" + colorgreenhex;}
if(clr.colorblue<16){colorbluehex = "0" + colorbluehex;}
var colorrgb = colorredhex + colorgreenhex + colorbluehex;
if(misc.bright<=8){brighthex = "0" + brighthex;}
var rota = "0" + String(rot.rotation);
var trig = "0" + String(rot.trigger);
//------------------------------SETTINGS----------------------------//
var mode = cfg.mode;  //between 0-8 0:off 1:single 2-8:effects
var colorx = colorrgb;  //Do not exceed 7f
var brightness = brighthex;  //between 00-32 Bigger is brighter
var speed = speedhex;  //between 01-07 Smaller is faster
var rotation = rota
var trigger = trig
//-----------------------------------------------------------------------//
//-------------------------------------PRODUCT INFO--------------------------------------------//
//"sudo lsusb | grep 'Integrated Technology Express, Inc.'" to get following values
var vendor = '048d';  //From output take the 4 characters before the colon
var product= 'ce00';  //From output take the 4 characters after the colon
//-----------------------------------------------------------------------------------------------------//


k = new ik.IteKeyboard('0x'+vendor, '0x'+product, '0x'+brightness, '0x'+speed, '0x'+rotation, '0x'+trigger);
if (mode==1){
k.initialize(() => {
  state = new iks.IteKeyboardState();
  state.setKeyColor(5, 0, colorx);
  state.setKeyColor(5, 1, colorx);
  state.setKeyColor(5, 2, colorx);
  state.setKeyColor(5, 3, colorx);
  state.setKeyColor(5, 4, colorx);
  state.setKeyColor(5, 5, colorx);
  state.setKeyColor(5, 6, colorx);
  state.setKeyColor(5, 7, colorx);
  state.setKeyColor(5, 8, colorx);
  state.setKeyColor(5, 9, colorx);
  state.setKeyColor(5, 10, colorx);
  state.setKeyColor(5, 11, colorx);
  state.setKeyColor(5, 12, colorx);
  state.setKeyColor(5, 13, colorx);
  state.setKeyColor(5, 14, colorx);
  state.setKeyColor(5, 15, colorx);
  state.setKeyColor(5, 16, colorx);
  state.setKeyColor(5, 17, colorx);
  state.setKeyColor(5, 18, colorx);
  state.setKeyColor(5, 19, colorx);
  state.setKeyColor(5, 20, colorx);
  //state.setKeyColor(5, 21, colorx);
  state.setKeyColor(4, 0, colorx);
  state.setKeyColor(4, 1, colorx);
  state.setKeyColor(4, 2, colorx);
  state.setKeyColor(4, 3, colorx);
  state.setKeyColor(4, 4, colorx);
  state.setKeyColor(4, 5, colorx);
  state.setKeyColor(4, 6, colorx);
  state.setKeyColor(4, 7, colorx);
  state.setKeyColor(4, 8, colorx);
  state.setKeyColor(4, 9, colorx);
  state.setKeyColor(4, 10, colorx);
  state.setKeyColor(4, 11, colorx);
  state.setKeyColor(4, 12, colorx);
  state.setKeyColor(4, 13, colorx);
  state.setKeyColor(4, 14, colorx);
  state.setKeyColor(4, 15, colorx);
  state.setKeyColor(4, 16, colorx);
  state.setKeyColor(4, 17, colorx);
  state.setKeyColor(4, 18, colorx);
  state.setKeyColor(4, 19, colorx);
  state.setKeyColor(4, 20, colorx);
  //state.setKeyColor(4, 21, colorx);
  state.setKeyColor(3, 0, colorx);
  state.setKeyColor(3, 1, colorx);
  state.setKeyColor(3, 2, colorx);
  state.setKeyColor(3, 3, colorx);
  state.setKeyColor(3, 4, colorx);
  state.setKeyColor(3, 5, colorx);
  state.setKeyColor(3, 6, colorx);
  state.setKeyColor(3, 7, colorx);
  state.setKeyColor(3, 8, colorx);
  state.setKeyColor(3, 9, colorx);
  state.setKeyColor(3, 10, colorx);
  state.setKeyColor(3, 11, colorx);
  state.setKeyColor(3, 12, colorx);
  state.setKeyColor(3, 13, colorx);
  state.setKeyColor(3, 14, colorx);
  state.setKeyColor(3, 15, colorx);
  state.setKeyColor(3, 16, colorx);
  state.setKeyColor(3, 17, colorx);
  state.setKeyColor(3, 18, colorx); 
  state.setKeyColor(3, 19, colorx);
  state.setKeyColor(3, 20, colorx);
  //state.setKeyColor(3, 21, colorx);
  state.setKeyColor(2, 0, colorx);
  state.setKeyColor(2, 1, colorx);
  state.setKeyColor(2, 2, colorx);
  state.setKeyColor(2, 3, colorx);
  state.setKeyColor(2, 4, colorx);
  state.setKeyColor(2, 5, colorx);
  state.setKeyColor(2, 6, colorx);
  state.setKeyColor(2, 7, colorx);
  state.setKeyColor(2, 8, colorx);
  state.setKeyColor(2, 9, colorx);
  state.setKeyColor(2, 10, colorx);
  state.setKeyColor(2, 11, colorx);
  state.setKeyColor(2, 12, colorx);
  state.setKeyColor(2, 13, colorx);
  state.setKeyColor(2, 14, colorx);
  state.setKeyColor(2, 15, colorx);
  state.setKeyColor(2, 16, colorx);
  state.setKeyColor(2, 17, colorx);
  state.setKeyColor(2, 18, colorx);
  state.setKeyColor(2, 19, colorx);
  state.setKeyColor(2, 20, colorx);
  //state.setKeyColor(2, 21, colorx);
  state.setKeyColor(1, 0, colorx);
  state.setKeyColor(1, 1, colorx);
  state.setKeyColor(1, 2, colorx);
  state.setKeyColor(1, 3, colorx);
  state.setKeyColor(1, 4, colorx);
  state.setKeyColor(1, 5, colorx);
  state.setKeyColor(1, 6, colorx);
  state.setKeyColor(1, 7, colorx);
  state.setKeyColor(1, 8, colorx);
  state.setKeyColor(1, 9, colorx);
  state.setKeyColor(1, 10, colorx);
  state.setKeyColor(1, 11, colorx);
  state.setKeyColor(1, 12, colorx);
  state.setKeyColor(1, 13, colorx);
  state.setKeyColor(1, 14, colorx);
  state.setKeyColor(1, 15, colorx);
  state.setKeyColor(1, 16, colorx);
  state.setKeyColor(1, 17, colorx);
  state.setKeyColor(1, 18, colorx);
  state.setKeyColor(1, 19, colorx);
  state.setKeyColor(1, 20, colorx);
  //state.setKeyColor(1, 21, colorx);
  state.setKeyColor(0, 0, colorx);
  state.setKeyColor(0, 1, colorx);
  state.setKeyColor(0, 2, colorx);
  state.setKeyColor(0, 3, colorx);
  state.setKeyColor(0, 4, colorx);
  state.setKeyColor(0, 5, colorx);
  state.setKeyColor(0, 6, colorx);
  state.setKeyColor(0, 7, colorx);
  state.setKeyColor(0, 8, colorx);
  state.setKeyColor(0, 9, colorx);
  state.setKeyColor(0, 10, colorx);
  state.setKeyColor(0, 11, colorx);
  state.setKeyColor(0, 12, colorx);
  state.setKeyColor(0, 13, colorx);
  state.setKeyColor(0, 14, colorx);
  state.setKeyColor(0, 15, colorx);
  state.setKeyColor(0, 16, colorx);
  state.setKeyColor(0, 17, colorx);
  state.setKeyColor(0, 18, colorx);
  state.setKeyColor(0, 19, colorx);
  state.setKeyColor(0, 20, colorx);
  //state.setKeyColor(0, 21, colorx);
  k.sendKeystate(state);
  //console.log(colorrgb)
  //var argv = process.argv.slice(2);
  //cmd.setByte(parseInt(argv[0]), parseInt(argv[1]), 0xff);
  //k.send(cmd);
  //k.setMode(parseInt(argv[0]));
  //ex:7f245f  7f3030 
});
}else{
k.initialize(() => {
k.setMode(mode);
});
}
