var stop = false;
var frameCount = 0;
var $results = $("#results");
var fps, fpsInterval, startTime, now, then, elapsed;
var counter;

// initialize the timer variables and start the animation

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {

    // request another frame

    requestAnimationFrame(animate);

    // calc elapsed time since last loop

    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (!stop && elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);

        // Put your drawing code here
		draw();
    }
}

var elSize = 20;
var blood;
var souls;

const mouse = {
    x : 0, y : 0,  // coordinates
    lastX : 0, lastY : 0, // last frames mouse position 
    b1 : false, b2 : false, b3 : false, // buttons
    buttonNames : ["b1","b2","b3"],  // named buttons
}

const curPos = {
	x : 0, y: 0, sx : 0, sy : 0
}
var sinnerRadius = 5;

function Sinner() {
	var x = 0;
	var y = 0;
	var sx = 0;
	var sy = 0;
	var goingUp = false;
	var goingUpFail = false;
	var goingDown = false;
	var goingDownFail = false;
	var goingForward = false;
	var goingForwardFail = false;
	var goingBackward = false;
	var goingBackwardFail = false;
	var fillStyle;
	var strokeStyle;
	var hp;
	var blood;
	var souls;
}

function Demon() {
}

var sinners = [];
var sinnerSpawnCount;
var sinnerHPMultiplier = 0;
var sinnerSpawnRate = 2;

function Wall() {
	var x;
	var y;
	var blood;
	var souls;
}

function SpawnSinner() {	
	var sinner = new Sinner();
	sinner.x = 7;
	sinner.sx = 7;
	sinner.y = 193;
	sinner.sy = 193;
	sinner.goingForward = true;
	sinner.fillStyle = 'rgba(205, 205, 205, 1)';
	sinner.strokeStyle = 'rgba(255, 255, 255, 1)';
	sinner.hp = 100;	
	if (sinnerSpawnCount % 5 == 0) {
		sinnerHPMultiplier++;
	}	
	sinner.hp += sinner.hp * (sinnerHPMultiplier / 100);
	sinner.blood = 10;
	sinner.souls = 0;
	sinners.push(sinner);
	sinnerSpawnCount++;
}

var walls = [];

function Demon() {
	var x;
	var y;
	var atk;
	var range;
	var blood;
	var souls;
}

var demons = [];

function PlaceWall(ctx, x, y) {
	ctx.beginPath();
	ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
	ctx.fillStyle = 'rgba(105, 105, 105, 1)';
	ctx.rect(x, y, elSize, elSize);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	
	var wall = new Wall();
	wall.x = x;
	wall.y = y;		
	wall.blood = 20;
	wall.souls = 0;
	walls.push(wall);
	blood -= wall.blood;
	souls -= wall.souls;
	UpdateHUD();
}

function PlaceDemon(ctx, x, y) {
	ctx.beginPath();
	ctx.strokeStyle = 'rgba(255, 150, 150, 1)';
	ctx.fillStyle = 'rgba(105, 50, 50, 1)';
	ctx.rect(x, y, elSize, elSize);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	
	var demon = new Demon();
	demon.x = x;
	demon.y = y;
	demon.atk = 1;	
	demon.range = 7;
	demon.blood = 50;
	demon.souls = 0;
	demons.push(demon);
	blood -= demon.blood;
	souls -= demon.souls;
	UpdateHUD();
}

function UpdateHUD() {
	$('#blood').text('blood: ' + blood);
	$('#souls').text('souls: ' + souls);
}

function init() {
	blood = 200;
	souls = 0;
	fps = 24;
	counter = 0;
	sinnerSpawnCount = 0;
	UpdateHUD();
	drawGrid();
	var elem = document.getElementById('canvas2'),
    elemLeft = elem.offsetLeft,
    elemTop = elem.offsetTop,
    ctx = document.getElementById('canvas1').getContext('2d'),
    elements = [];
	// Add event listener for `click` events.
	elem.addEventListener('click', function(event) {
		var bounds = elem.getBoundingClientRect();
		// get the mouse coordinates, subtract the canvas top left and any scrolling
		mouse.x = event.pageX - bounds.left - scrollX;
		mouse.y = event.pageY - bounds.top - scrollY;		
		// first normalize the mouse coordinates from 0 to 1 (0,0) top left
		// off canvas and (1,1) bottom right by dividing by the bounds width and height
		mouse.x /=  bounds.width; 
		mouse.y /=  bounds.height; 
		// then scale to canvas coordinates by multiplying the normalized coords with the canvas resolution
		mouse.x *= elem.width;
		mouse.y *= elem.height;
      
		var x = mouse.x - (mouse.x % elSize);
		var y = mouse.y - (mouse.y % elSize);
		
		var unit = $('input[name=units]:checked').val();		
		if (unit === "wall" && blood >= 20)
			PlaceWall(ctx, x, y);
		if (unit === "demon1" && blood >= 50)
			PlaceDemon(ctx, x, y);
		if (unit === "demon2" && blood >= 50)
			PlaceDemon(ctx, x, y);
		//console.log(mouse.x + "," + mouse.y);
	}, false);
	
	$('#start').click(function() {	
		stop = false;
		startAnimating(fps);
	});
	$('#stop').click(function() {		
		stop = !stop;
	});
	$('#add').click(function() {
		SpawnSinner();
	});
}

function drawGrid() {
	var ctx = document.getElementById('canvas1').getContext('2d');
	//ctx.globalCompositeOperation = 'destination-over';
	ctx.strokeStyle = 'rgba(105, 105, 105, 1)';
	for (var i = 0; i < 800 ; i += elSize)
	{
		ctx.moveTo(i, 0);
		ctx.lineTo(i, 400);
		ctx.stroke();
	}
	for (var i = 0; i < 400 ; i += elSize)
	{
		ctx.moveTo(0, i);
		ctx.lineTo(800, i);
		ctx.stroke();
	}
	ctx.save();
	
	ctx.beginPath();
	ctx.strokeStyle = 'rgba(170, 250, 255, 1)';
	ctx.rect(0, 180, elSize, elSize);
	ctx.stroke();
	ctx.closePath();
}

function collidesWithWall(x, y) {
	var collides = false;
	walls.forEach(function(wall) {
		// if (y > 0 && y < 400 && x > 0 && x < 800) {
			// console.log(y + " - " + wall.y);
			// console.log(x + " - " + wall.x);
		// }
		if ((y+sinnerRadius >= wall.y && y+sinnerRadius <= wall.y + elSize 
			&& x+sinnerRadius >= wall.x && x <= wall.x+sinnerRadius + elSize) ||
			(y-sinnerRadius >= wall.y && y-sinnerRadius <= wall.y + elSize 
			&& x-sinnerRadius >= wall.x && x-sinnerRadius <= wall.x + elSize)) {
			collides = true;
		}	
	});
	return collides;
}

function demonInRange(sinner) {	
	demons.forEach(function(demon) {
		if ((sinner.y+sinnerRadius >= demon.y-demon.range && sinner.y+sinnerRadius <= demon.y + elSize 
			&& sinner.x+sinnerRadius >= demon.x-demon.range && sinner.x <= demon.x+sinnerRadius + elSize) ||
			(sinner.y-sinnerRadius >= demon.y+demon.range && sinner.y-sinnerRadius <= demon.y + elSize 
			&& sinner.x-sinnerRadius >= demon.x+demon.range && sinner.x-sinnerRadius <= demon.x + elSize)) {
			sinner.hp -= demon.atk;
		}	
	});
}

function remove(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
}

var goingUp = false;
var goingUpFail = false;
var goingDown = false;
var goingDownFail = false;
var goingForward = false;
var goingForwardFail = false;
var goingBackward = false;
var goingBackwardFail = false;

function chooseDirection(sinner) {
	var xchange = 0; 
	var ychange = 0; 
	
	if (sinner.goingForward)
		xchange = 1;
	if (sinner.goingBackward)
		xchange = -1;
	if (sinner.goingUp) 
		ychange = -1;
	if (sinner.goingDown)
		ychange = 1;
		
	var xnew = sinner.x + xchange;
	var ynew = sinner.y + ychange;
	
	while (collidesWithWall(xnew, ynew)) {
		//console.log('col');
		
		if (sinner.goingForward) {
			sinner.goingForward = false;
			sinner.goingForwardFail = true;
												
			if (!sinner.goingUpFail && !sinner.goingDownFail) {
				sinner.goingUp = Math.random() >= 0.5;
				sinner.goingDown = !sinner.goingUp;
			} else if (!sinner.goingUpFail)
				sinner.goingUp = true;
			else
				sinner.goingDown = true;			
			
		} else if (sinner.goingBackward) {
			sinner.goingBackward = false;
			sinner.goingBackwardFail = true;
								
			if (!sinner.goingUpFail && !sinner.goingDownFail) {
				sinner.goingUp = Math.random() >= 0.5;
				sinner.goingDown = !sinner.goingUp;
			} else if (!sinner.goingUpFail)
				sinner.goingUp = true;
			else
				sinner.goingDown = true;
			
		} else if (sinner.goingUp) {
			sinner.goingUp = false;
			sinner.goingUpFail = true;
						
			if (!sinner.goingForwardFail && !sinner.goingBackwardFail) {
				sinner.goingForward = Math.random() >= 0.5;
				sinner.goingBackward = !sinner.goingForward;
			} else if (!sinner.goingForwardFail)
				sinner.goingForward = true;
			else
				sinner.goingBackward = true;
			
		} else if (sinner.goingDown) {
			sinner.goingDown = false;
			sinner.goingDownFail = true;
			
			if (!sinner.goingForwardFail && !sinner.goingBackwardFail) {
				sinner.goingForward = Math.random() >= 0.5;
				sinner.goingBackward = !sinner.goingForward;
			} else if (!sinner.goingForwardFail)
				sinner.goingForward = true;
			else
				sinner.goingBackward = true;
			
		}
		
		if (sinner.goingForward) {
			//console.log('change forward');
			xnew = sinner.x + 1; 
			ynew = sinner.y;
		}
		if (sinner.goingBackward) {
			//console.log('change backward');
			xnew = sinner.x - 1;
			ynew = sinner.y;
		}
		if (sinner.goingDown) {
			//console.log('change down');
			ynew = sinner.y + 1;
			xnew = sinner.x;
		}
		if (sinner.goingUp) {
			//console.log('change up');
			ynew = sinner.y - 1;
			xnew = sinner.x;
		}
		
	} 
	
	sinner.goingUpFail = false;
	sinner.goingDownFail = false;
	sinner.goingForwardFail = false;
	sinner.goingBackwardFail = false;

	
	sinner.x = xnew;
	sinner.y = ynew;
}

function draw() {
	var canvas = document.getElementById('canvas2');
	var ctx = canvas.getContext('2d');
	
	ctx.globalCompositeOperation = 'destination-over';
	ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
	
	sinners.forEach(function(sinner) {		
			chooseDirection(sinner);
			demonInRange(sinner);
			
			ctx.fillStyle = sinner.fillStyle;
			ctx.strokeStyle = sinner.strokeStyle;
			ctx.beginPath();
			ctx.arc(sinner.x, sinner.y, sinnerRadius, 0, 2 * Math.PI);		
			ctx.stroke();
			ctx.fill();
			ctx.fillText(sinner.hp,sinner.x - 7, sinner.y - 10);
			ctx.closePath();	
		if (sinner.hp <= 0) {
			remove(sinners, sinner);
			blood += sinner.blood;
			souls += sinner.souls;
			UpdateHUD();
		}
	});
	
	counter++;
	if (counter / fps > sinnerSpawnRate) {
		counter = 0;
		SpawnSinner();
	}
	//window.requestAnimationFrame(draw);
}

$(document).ready(function() {
	init();
});