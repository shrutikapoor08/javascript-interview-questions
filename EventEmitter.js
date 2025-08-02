// Implement an Event Emitter class similar to the one in NodeJS. 
// It should have an on, off and emit method.
//  When the event is emitted, any function that has subscribed to an event should fire. 

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if(this.events[event]) {
      this.events[event].push(listener)
    }
  else this.events[event] = [listener];
  }

  off(event, listener) {
    const listeners = this.events[event];
      if(listeners) {
        this.events[event] = listeners.filter(
        (l) => l !== listener
      );
    }
  }

  emit(event, ...args) {
    const listeners = this.events[event];

    if(listeners) {
      listeners.forEach( listener => listener(...args));
    }

  }
}

/* ======== Usage ======== */
const emitter = new EventEmitter();

const onScroll = () => console.log("scrolling");
const onType = () => console.log("typing");
emitter.on('scroll', onScroll);
emitter.on('type', onType);

emitter.emit('scroll') // scrolling
emitter.off('scroll', onScroll);
emitter.emit('scroll'); //nothing happens
emitter.emit('type', onType); //typing

