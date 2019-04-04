'use strict'

var usb = require('usb');

class IteKeyboard {
  constructor(vendorId, productId, bright, speed, rotation, trig) {
    this.vendorId = vendorId;
    this.productId = productId;
    this.bright = bright;
    this.speed = speed;
    this.rotation = rotation;
    this.trig = trig;
    
    this.setupCommand = [
      0x08, 0x02, 0x33, 0x00, this.bright, 0x00, 0x00, 0x00
    ];

    this.modes = [      //speed  brightness
      [0x08, 0x02, 0x03, 0x05, 0x00, 0x08, 0x01, 0x00], // off
      [0x08, 0x02, 0x33, 0x00, this.bright, 0x00, 0x00, 0x00], //single
      [0x08, 0x02, 0x02, this.speed, this.bright, 0x08, 0x00, 0x00], // fade
      [0x08, 0x02, 0x03, this.speed, this.bright, 0x08, this.rotation, 0x00], // wave
      [0x08, 0x02, 0x04, this.speed, this.bright, 0x08, this.trig, 0x00], // dots
      [0x08, 0x02, 0x05, 0x00, this.bright, 0x08, 0x00, 0x00], // rainbow
      [0x08, 0x02, 0x06, this.speed, this.bright, 0x08, this.trig, 0x00], // explosion
      [0x08, 0x02, 0x09, this.speed, this.bright, 0x08, 0x00, 0x00], // snake
      [0x08, 0x02, 0x0a, this.speed, this.bright, 0x08, 0x00, 0x00],  // raindrops
      [0x08, 0x02, 0x0e, this.speed, this.bright, 0x08, this.trig, 0x00],  //lines
      [0x08, 0x02, 0x11, this.speed, this.bright, 0x08, this.trig, 0x00]  //firework
      //[0x08, 0x02, 0x33, 0x0a, this.bright, 0x01, 0x00, 0x00] //music (not working)
      // these two don't seem to activate always. probably need to understand something 
      // else with the protocol. I don't know what most of the fields mean
     // [0x08, 0x02, 0x07, 0x05, 0x32, 0x08, 0x00, 0x00], // explosion_typed?
      //[0x08, 0x02, 0x08, 0x05, 0x32, 0x08, 0x00, 0x00] // trails?
    ];

    this.device = usb.findByIds(vendorId, productId);
    this.initialized = false;

    if (!this.device) {
      throw `Couldn't find USB device ${this.vendorId}:${this.productId}.`
    }
  }

  initialize(callback) {
    this.device.open();
    this.device.controlTransfer(0x21, 9, 0x300, 1, Buffer.from(this.setupCommand), (data, error) => {
      if (error) {
        throw error;
      }
      console.log("Sent initilization packet.");

      this.interface = this.getInterface(this.device);
      this.endpoint = this.getEndpoint(this.interface);

      callback();
    });
  }

  getInterface(device) {
    var interfaces = device.interfaces;
    var iface = null;

    for (var i = 0; i < interfaces.length; i++) {
      if (interfaces[i].endpoints.length > 0) {
        iface = interfaces[i];
      }
    }

    if (iface) {
      if (iface.isKernelDriverActive()) {
        console.warn("Kernel driver is attached, detaching");
        iface.detachKernelDriver();
      }
      iface.claim();
      console.debug("Claimed interface");
    }

    return iface;
  }

  setMode(mode, callback) {
    var ctrlbuf = this.modes[mode];
    this.device.controlTransfer(0x21, 9, 0x300, 1, Buffer.from(ctrlbuf), (error, data) => {
      if (error) {
        throw error;
      }

      if (callback) {
        callback();
      }
    });
  }

  getEndpoint(iface) {
    var endpoint = null;

    for (var i = 0; i < iface.endpoints.length; i++) {
      if (iface.endpoints[i].direction == "out") {
        endpoint = iface.endpoints[i];
        break;
      }
    }

    return endpoint;
  }

  sendKeystate(state, callback) {
    state.sendToEndpoint(this.endpoint, callback);
  }
};

module.exports.IteKeyboard = IteKeyboard;
