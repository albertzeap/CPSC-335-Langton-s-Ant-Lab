// cs-sketch.js; P5 key animation fcns.  // CF p5js.org/reference
// Time-stamp: <2020-02-02 15:58:23 Chuck Siska>

// Make global g_canvas JS 'object': a key-value 'dictionary'.
var g_canvas = { cell_size:10, wid:64, hgt:48 }; // JS Global var, w canvas size info.
var g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
var g_frame_mod = 24; // Update ever 'mod' frames.
var g_stop = 0; // Go by default.


function setup() // P5 Setup Fcn
{
    let sz = g_canvas.cell_size;
    let width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
    let height = sz * g_canvas.hgt;
    createCanvas( width, height );  // Make a P5 canvas.
    draw_grid( 10, 50, 'gray', 'white' );
}

var g_bot = { dir:0, x:30, y:20, color: 'blue' }; // Dir is 0..7 clock, w 0 up.
var g_box = { t:1, hgt:47, l:1, wid:63 }; // Box in which bot can move.
var colorsArray = ['blue', 'yellow', 'red']; //Array for colors
var colorCounter = 0;

var straightMode = false;
var straightCounter = 0;

var LRMode = true;


function turnLeft(){
    if (g_bot.dir == 0){
        return direction = 1;
    }
    if (g_bot.dir == 1){
        return direction = 2;
    }
    if (g_bot.dir == 2){
        return direction = 3;
    }
    if (g_bot.dir == 3){
        return direction = 0;
    }

    return direction;
}


function turnRight(){
    if (g_bot.dir == 0){
        return direction = 3;
    }
    if (g_bot.dir == 1){
        return direction = 0;
    }
    if (g_bot.dir == 2){
        return direction = 1;
    }
    if (g_bot.dir == 3){
        return direction = 2;
    }

    return direction;
}

function goStraight(){
    straightMode = true;
    LRMode = false;

    let direction = g_bot.dir;
    return direction;
}




function move_bot()
{
    let dir = 0; 
    let dx = 0;
    let dy = 0;

    if (g_bot.color == 'blue'){
        LRMode = true;
        dir = turnLeft();
    }

    if (g_bot.color == 'red'){
        LRMode = true;
        dir = turnRight();
    }

    if (g_bot.color == 'yellow'){
        dir = goStraight();
    }

    

    switch (dir) { // Convert dir to x,y deltas: dir = clock w 0=Up,1=Rt,2=Dn,3=Left.
    case 0 : {         dy = -1; break; }    //UP
    case 1 : { dx = 1; break; }             //RIGHT
    case 2 : {         dy = 1; break; }     //DOWN
    case 3 : { dx = -1; break; }            //LEFT
    }

  
    let x = (dx + g_bot.x + g_box.wid) % g_box.wid; // Move-x.  Ensure positive b4 mod.
    let y = (dy + g_bot.y + g_box.hgt) % g_box.hgt; // Ditto y.

    if (colorCounter > 2){
        colorCounter = 0;
    }

    if (straightMode == true && straightCounter < 2){
        g_bot.color = colorsArray[1];
        straightCounter++;
    }
    else {
        g_bot.color = colorsArray[colorCounter];
        straightCounter = 0;
        colorCounter++;
    }

    g_bot.x = x; // Update bot x.
    g_bot.y = y;
    g_bot.dir = dir;
    console.log( "bot x,y,dir,clr = " + x + "," + y + "," + dir + "," +  color );
}

function draw_bot( ) // Convert bot pox to grid pos & draw bot.
{
    let sz = g_canvas.cell_size;
    let sz2 = sz / 2;
    let x = 1+ g_bot.x*sz; // Set x one pixel inside the sz-by-sz cell.
    let y = 1+ g_bot.y*sz;
    let big = sz -2; // Stay inside cell walls.
    // Fill 'color': its a keystring, or a hexstring like "#5F", etc.  See P5 docs.
    // fill( "#" + g_bot.color ); // Concat string, auto-convert the number to string.
    fill( g_bot.color ); // Concat string, auto-convert the number to string.
    // console.log( "x,y,big = " + x + "," + y + "," + big );
    let acolors = get( x + sz2, y + sz2 ); // Get cell interior pixel color [RGBA] array.
    let pix = acolors[ 0 ] + acolors[ 1 ] + acolors[ 2 ];
    // console.log( "acolors,pix = " + acolors + ", " + pix );

    // (*) Here is how to detect what's at the pixel location.  See P5 docs for fancier...
    if (0 != pix) { fill( 0 ); stroke( 0 ); } // Turn off color of prior bot-visited cell.
    else { stroke( 'white' ); } // Else Bot visiting this cell, so color it.

    // Paint the cell.
    rect( x, y, big, big );
}

function draw_update()  // Update our display.
{
    // console.log( "g_frame_cnt = " + g_frame_cnt );
    move_bot( );
    draw_bot( );
}

function draw()  // P5 Frame Re-draw Fcn, Called for Every Frame.
{
    ++g_frame_cnt;
    if (0 == g_frame_cnt % g_frame_mod)
    {
        if (!g_stop) draw_update();
    }
}

function keyPressed( )
{
    g_stop = ! g_stop;
}

function mousePressed( )
{
    let x = mouseX;
    let y = mouseY;
    //console.log( "mouse x,y = " + x + "," + y );
    let sz = g_canvas.cell_size;
    let gridx = round( (x-0.5) / sz );
    let gridy = round( (y-0.5) / sz );
    //console.log( "grid x,y = " + gridx + "," + gridy );
    //console.log( "box wid,hgt = " + g_box.wid + "," + g_box.hgt );
    g_bot.x = gridx + g_box.wid; // Ensure its positive.
    //console.log( "bot x = " + g_bot.x );
    g_bot.x %= g_box.wid; // Wrap to fit box.
    g_bot.y = gridy + g_box.hgt;
    //console.log( "bot y = " + g_bot.y );
    g_bot.y %= g_box.hgt;
    //console.log( "bot x,y = " + g_bot.x + "," + g_bot.y );
    draw_bot( );
}
