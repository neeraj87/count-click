var $j = jQuery.noConflict(true);
var clickCount = 0;
var gameOver = false;

$j(document).ready(function(){	
	start();

	$j('.row td').click(function(event){
		var innerVal = $j(this).children('.block').children('.label').text();
		if(!gameOver) {
			registerClick(innerVal);
		}
	});

});

function start() {
	gameOver = false;
	clickCount = 0;
	generateNumbers();
	timeOut();
}

function generateNumbers() {
	var placed;
	for (var i = 1; i < 11; i++) {
		placed = false
		while (!placed) {
			var randLoc = randomiser(40, 0);
			if ($j('#'+randLoc).html() === '') {
				$j('#'+randLoc).html(i);
				placed = true;
			}
		}
	}
}

function reset() {
	for(var i = 1; i <= 40; i++) {
		$j('#'+i).html('');
	}
}

function modFunction(value1, value2) {
    return value1 % value2;
}

function randomiser(upperBound, lowerBound) {
    return Math.round(Math.random() * (upperBound - lowerBound));
}

function registerClick(tdVal) {
	clickCount++;

	if(clickCount != tdVal) {
		gameOver = true;
		$j('.row td .block .label').css('display', 'inline-block');
		alert('Game over you loose..starting again..');
		$j('.row td .block .label').css('display', 'block');
		reset();
		start();
	} else {
		// $('.label').each(function(x){
		// 	console.log(x);
		// 	console.log(this);
		// 	if (x.html() === clickCount) {
		// 		x.css('display', block);
		// 	}
		// })
	}
	
}

function timeOut() {
	setTimeout(function(){ clearGameBoard() }, 10000);
}

function clearGameBoard() {
	$j('.row td .block .label').css('display', 'none');
}