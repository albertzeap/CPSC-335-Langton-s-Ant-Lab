Readme for js-p5-example
Team: Albert Paez, Ryan Carney, Ryan Patrick
Class: CPSC 335-03
Project 1: Lark's Ant 
------------------------------------------------------------

Intro
  
  The following example implements a more complex version of Langton's Ant
  known as Lark's Ant. This version follows the following modes and rules: 
  
   Modes 
      1) LR Mode = Ant turns left and right
      2) Set-Count Mode = Sets count for going straight
      3) Countdown Mode = Goes straight until countdown is over
    
   Rules
      1) Landing on a black or blue cells results in a left turn
      2) Landing on a red cell results in a right turn 
      3) Landing on a yellow cell results in set-count mode
  
  This is an example project using HTML, Javascript (JS), and P5.js
  which is a JS-adapted version of the Processing Language.  CF HTML and
  JS on the web (eg, Wikipedia).  More on P5 is at
  p5js.org/reference.and at github.com/processing/p5.js/wiki.
  
Features

   You can stop/restart the bot with any keypress.  
   You can move the bot to any cell with a mouse-click.

Zip Contents

  File README.txt.  This file.

  File LarksAnt.html. Drag and drop this into a browser to
    run the example.
    Click to set new loc for ant (via mousePressed).
    Hit (almost) any key to toggle bot on or off (via keyPressed).

  File p5.js. This is the P5 package.  It is loaded inside the html.

  File cs-sketch.js; This contains several P5 user-defined linkage functions
   (setup, draw, keyPressed, and mousePressed), as well as example
    support functions.  P5's setup() is run once before page display.
    P5's draw() is run once per display frame, so you can do animation.

  File assets/styles.css.  This is an extra-small example of controlling
    webpage styling.  // Loaded inside the html.

  File assets/draw-stuff.js. This is an example to show loading a JS
    script file from a folder other than the index HTML file's
    folder location.  It also includes the utility draw_grid function
    written in P5+JS. // Loaded inside the html.

Installation & Running

  1. Extract the .zip file into a folder.

  2. Drag the index HTML file, LarksAnt.html, into a browser
    window.  The example P5 program should start immediately.  You
    should see a 640x480 grid (white lines on black background) with
    row/column headers and some of the grid cells colored.  

Known Bugs

  - Bot cell drawing over-writes a pixels-worth of the cell's grid lines.
  - Clicking outside the canvas results in ant starting at unpredictable areas

Credits

  Some code was borrowed and modified from Stuart's book.  
    Introducing JavaScript Game Development: Build a 2D Game from the
    Ground Up, by Graeme Stuart, 2018, 209 pages.

  And, of course, thanks to the HTML and P5.js developers.
