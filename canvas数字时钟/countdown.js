var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

var endTime = new Date();
endTime.setTime( endTime.getTime()+1000*3600);
var SECONDS_LEFT = 0;

var balls = [];
var colors = ["#33be5e","#09c","#a6c","#93c","#9c0","#690","#fb3","#f80","#f44","c00"];


window.onload = function(){
	WINDOW_WIDTH = document.documentElement.clientWidth;
	WINDOW_HEIGHT = document.documentElement.clientHeight;
	//console.log(WINDOW_WIDTH,WINDOW_HEIGHT);

	MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
	RADIUS = Math.round(WINDOW_WIDTH*4/5/108)-1;

	MARGIN_TOP = WINDOW_HEIGHT/5;

	var canvas = document.getElementById('canvas');
	var context = canvas.getContext("2d");

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

	setInterval(function() {
		render(context);
		update();
	}, 50);

}

function update(){

	var next_SECONDS_LEFT = getCurrentLeftTime();
	var next_hours = parseInt(next_SECONDS_LEFT/3600);
	var next_minutes = parseInt((next_SECONDS_LEFT-3600*next_hours)/60);
	var next_seconds = next_SECONDS_LEFT%60;

	var cur_hours = parseInt(SECONDS_LEFT/3600);
	var cur_minutes = parseInt( (SECONDS_LEFT-3600*cur_hours)/60);
	var cur_seconds = SECONDS_LEFT%60;

	if(next_SECONDS_LEFT != SECONDS_LEFT){
		if(parseInt(cur_hours/10) != parseInt(next_hours/10)){
			addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(cur_hours/10));
		}
		if(parseInt(cur_hours%10) != parseInt(next_hours%10)){
			addBalls(MARGIN_LEFT+(RADIUS+1)*15, MARGIN_TOP, parseInt(cur_hours%10));
		}
		if(parseInt(cur_minutes/10) != parseInt(next_minutes/10)){
			addBalls(MARGIN_LEFT+(RADIUS+1)*39, MARGIN_TOP, parseInt(cur_minutes/10));
		}
		if(parseInt(cur_minutes%10) != parseInt(next_minutes%10)){
			addBalls(MARGIN_LEFT+(RADIUS+1)*34, MARGIN_TOP, parseInt(cur_minutes%10));
		}
		if(parseInt(cur_seconds/10) != parseInt(next_seconds/10)){
			addBalls(MARGIN_LEFT+(RADIUS+1)*78, MARGIN_TOP, parseInt(cur_seconds/10));
		}
		if(parseInt(cur_seconds%10) != parseInt(next_seconds%10)){
			addBalls(MARGIN_LEFT+(RADIUS+1)*94, MARGIN_TOP, parseInt(cur_seconds%10));
		}
		

		SECONDS_LEFT = next_SECONDS_LEFT;
	}

	updateBalls();
}

function updateBalls() {
	for(var i=0; i<balls.length; i++){
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g*0.5;
		if(balls[i].y >= WINDOW_HEIGHT-RADIUS){
			balls[i].y = WINDOW_HEIGHT-RADIUS;
			balls[i].vy = -balls[i].vy*0.5;
		}
	}

	// 用到了一点技巧，需要仔细体会
	var cnt = 0;
	for(var i=0; i<balls.length; i++){
		if(balls[i].x >= -RADIUS && balls[i].x <= (WINDOW_WIDTH+RADIUS)){
			balls[cnt++] = balls[i];
			//这样一来前cnt个小球就是需要的
		}
	}
	while(balls.length > Math.min(300,cnt)){
		balls.pop();
	}

}

function addBalls(x,y,num) {
	for(var i=0; i<digit[num].length; i++){
		for(var j=0; j<digit[num][i].length; j++){
			if(digit[num][i][j] == 1){
				var aBall = {
					x:x+(j*2+1)*(RADIUS+1),
					y:y+(i*2+1)*(RADIUS+1),
					g:1.5+Math.random(),
					vx: Math.pow(-1, Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color: colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
			}
		}
	}
}

function getCurrentLeftTime() {
	var currentTime = new Date();
	var ret = currentTime.getHours()*3600+ currentTime.getMinutes()*60 + currentTime.getSeconds();
	return ret;
}

function render(cxt) {

	cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
	var hours = parseInt(SECONDS_LEFT/3600);
	var minutes = parseInt( (SECONDS_LEFT-3600*hours)/60);
	var seconds = SECONDS_LEFT%60;

	renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10), cxt)
	renderDigit(MARGIN_LEFT+15*(RADIUS+1), MARGIN_TOP, parseInt(hours%10), cxt);
	renderDigit(MARGIN_LEFT+30*(RADIUS+1), MARGIN_TOP, 10, cxt);
	renderDigit(MARGIN_LEFT+39*(RADIUS+1), MARGIN_TOP, parseInt(minutes/10),cxt);
	renderDigit(MARGIN_LEFT+54*(RADIUS+1), MARGIN_TOP, parseInt(minutes%10),cxt);
	renderDigit(MARGIN_LEFT+69*(RADIUS+1), MARGIN_TOP, 10,cxt);
	renderDigit(MARGIN_LEFT+78*(RADIUS+1), MARGIN_TOP, parseInt(seconds/10),cxt);
	renderDigit(MARGIN_LEFT+94*(RADIUS+1), MARGIN_TOP, parseInt(seconds%10),cxt);

	for(var i=0; i<balls.length; i++){
		cxt.fillStyle = balls[i].color;
		cxt.beginPath();
		cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI, true);
		cxt.closePath();
		cxt.fill();
	}
	//console.log(balls.length);

}	

function renderDigit(x, y, num, cxt) {
	cxt.fillStyle = "rgb(0,102,153)";
	for(var i=0; i<digit[num].length; i++){
		for(var j=0; j<digit[num][i].length;j++){
			if(digit[num][i][j] == 1){
				cxt.beginPath();
				cxt.arc(x+(2*j+1)*(RADIUS+1), y+(2*i+1)*(RADIUS+1), RADIUS, 0, 2*Math.PI);
				cxt.closePath();
				cxt.fill();
			}
		}
	}
}