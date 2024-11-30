//El sistema de eventos con CustomEvent para el navegador
export const eventEmitter = {
    emit: (eventName, detail = {}) => {
      const event = new CustomEvent(eventName, { detail });
      window.dispatchEvent(event);
    },
  
    on: (eventName, callback) => {
      window.addEventListener(eventName, callback);
    },
  
    off: (eventName, callback) => {
      window.removeEventListener(eventName, callback);
    }
  };