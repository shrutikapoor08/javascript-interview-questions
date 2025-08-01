// Implement an Event Emitter class similar to the one in NodeJS. 
// It should have an on, off and emit method.
//  When the event is emitted, any function that has subscribed to an event should fire. 

class EventEmitter {
  constructor() {
    this.events = {};
  }

  // Subscribe to an event
  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  // Emit an event with optional arguments
  emit(eventName, ...args) {
    const listeners = this.events[eventName];
    if (listeners) {
      this.events[eventName].forEach((listener) => listener(...args));
    }
  }

  // Unsubscribe a specific listener
  off(eventName, listenerToRemove) {
    const listeners = this.events[eventName];
    if (listeners) {
      this.events[eventName] = listeners.filter(
        (listener) => listener !== listenerToRemove
      );
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

