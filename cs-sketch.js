// Authors: Albert Paez, Ryan Patrick, Ryan Carney
// Description: P5 key animation fcns.
// Add. Info: p5js.org/reference

// Make global g_canvas JS 'object': a key-value 'dictionary'.
var g_canvas = { cell_size:10, wid:60, hgt:40 }; // JS Global var, w canvas size info.
var g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
var g_frame_mod = 24; // Update ever 'mod' frames.
var g_stop = 0; // Go by default.

var cellStates = Array(g_canvas.hgt);
for(var i = 0; i < g_canvas.hgt; i++){
    cellStates[i] = new Array(g_canvas.wid);
}

for(var i = 0; i < g_canvas.hgt; i++){
    for(var j = 0; j < g_canvas.wid; j++){
        cellStates[i][j] = 3;
    }
}

var g_bot = { dir:0, x:24, y:32 }; // Dir is 0 through 3 clockwise, 0 being up.
var g_box = { t:1, hgt:40, l:1, wid:60 }; // Box in which bot can move.
var colorsArray = ['blue', 'yellow', 'red', 'black']; //Array for colors
var mode = 0; // { 0 = LR Mode, 1 = Set-Count Mode, 2 = Countdown Mode }
var straightCounter = 0;
var moveCounter = 1;
var dir = 0;

function setup() // P5 Setup Fcn
{
    let sz = g_canvas.cell_size;
    let width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
    let height = sz * g_canvas.hgt;
    createCanvas( width, height );  // Make a P5 canvas.
    draw_grid( 10, 50, 'gray', 'white ' );
    console.log("#" + moveCounter + " {p=(" + g_bot.x + "," + g_bot.y + "), d=" + g_bot.dir + ", m= " + mode + ", i=" + straightCounter
    + "}; {c=" + colorsArray[cellStates[g_bot.x][g_bot.y]] + "}");
    moveCounter++;
}

function turnRight(){
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


function turnLeft(){
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

function setCount(){
    mode = 1;
    //let direction = g_bot.dir;
    //g_bot.dir = direction;
    return g_bot.dir;
}




function move_bot()
{
    //let dir = 0;
    let dx = 0;
    let dy = 0;

    // We are in LR Mode, choose direction based on cell color
    if (mode === 0){
        if (cellStates[g_bot.x][g_bot.y] === 3){
            dir = turnLeft();
        }
        else if (cellStates[g_bot.x][g_bot.y] === 2){
            dir = turnRight();
        }
        else if (cellStates[g_bot.x][g_bot.y] === 1){
            dir = setCount();
        }
        else if (cellStates[g_bot.x][g_bot.y] === 0){
            dir = turnLeft();
        }
    }
    else if(mode === 1) { // We are in Set-Count Mode, continue straight
        if (cellStates[g_bot.x][g_bot.y] === 3){
            straightCounter = 3;
        }
        else if (cellStates[g_bot.x][g_bot.y] === 2){
            straightCounter = 2;
        }
        else if (cellStates[g_bot.x][g_bot.y] === 1){
            straightCounter = 1;
        }
        else if (cellStates[g_bot.x][g_bot.y] === 0){
            straightCounter = 0;
        }
        mode = 2;
    }
    else { // We are in Countdown Mode, continue straight
        straightCounter--;
       if(straightCounter < 0) {
            mode = 0;
       }
    }

    switch (dir) { // Convert dir to x,y deltas: dir = clock w 0=Up,1=Rt,2=Dn,3=Left.
        case 0 : {         dy = -1; break; }    //UP
        case 1 : { dx = 1; break; }             //RIGHT
        case 2 : {         dy = 1; break; }     //DOWN
        case 3 : { dx = -1; break; }            //LEFT
    }

    cellStates[g_bot.x][g_bot.y] = (cellStates[g_bot.x][g_bot.y] + 1) % colorsArray.length;

    let x = (dx + g_bot.x + g_box.wid) % g_box.wid; // Move-x.  Ensure positive b4 mod.
    let y = (dy + g_bot.y + g_box.hgt) % g_box.hgt; // Ditto y.

    g_bot.x = x; // Update bot x.
    g_bot.y = y;
    g_bot.dir = dir;
    console.log("#" + moveCounter + " {p=(" + g_bot.x + "," +g_bot.y + "), d=" + g_bot.dir + ", m= " + mode + ", i=" + straightCounter
    + "}; {c=" + colorsArray[cellStates[g_bot.x][g_bot.y]] + "}");
    moveCounter++;
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
    fill( colorsArray[cellStates[g_bot.x][g_bot.y]] ); // Concat string, auto-convert the number to string.
    // console.log( "x,y,big = " + x + "," + y + "," + big );
    let acolors = get( x + sz2, y + sz2 ); // Get cell interior pixel color [RGBA] array.
    let pix = acolors[ 0 ] + acolors[ 1 ] + acolors[ 2 ];
    // console.log( "acolors,pix = " + acolors + ", " + pix );

    // (*) Here is how to detect what's at the pixel location.  See P5 docs for fancier...
    //if (0 != pix) { fill( 0 ); stroke( 0 ); } // Turn off color of prior bot-visited cell.
    //else { stroke( 'white' ); } // Else Bot visiting this cell, so color it.

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
