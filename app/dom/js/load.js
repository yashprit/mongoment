/**
 * Module dependencies.
 */

var dom = require('dom');
var gui = node('nw.gui');
var win = gui.Window.get();

/**
 * Close the window.
 */

$('#close-window').on('click', function() {
  win.close();
});

/**
 * Minimize the window.
 */

$('#minimize-window').on('click', function() {
  win.minimize();
});

/**
 * Maximize the window.
 */

$('#maximize-window').on('click', function() {
  win.maximize();
});

/**
 * Fullscreen.
 */

$('#fullscreen-window').on('click', function() {
  win.toggleFullscreen();
});
