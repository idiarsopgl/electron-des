const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
  // From Renderer to Main and back (two-way)
  invoke: (channel, ...args) => {
    return ipcRenderer.invoke(channel, ...args);
  },
  // From Main to Renderer (one-way)
  on: (channel, callback) => {
    const newCallback = (_, ...args) => callback(...args);
    ipcRenderer.on(channel, newCallback);
    // Return a function to remove the listener
    return () => ipcRenderer.removeListener(channel, newCallback);
  },
});
