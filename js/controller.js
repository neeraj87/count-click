var $j = jQuery.noConflict(true);
var clickCount = 0;
var gameStart = false;
var difficulty = 'easy';
var totalNumbers = 10;
var time = 10;
var divBackgroundColorsArray = ["#ff8f85", "#2dcc70", "#b1a1c6", "#ff0059", "#a500ff", "#ec26e6", "#f28e61", "#f0f261", "#61e5f2", "#4ff8bc", "#f8eb4f", "#f54ff8", "#c9f84f", "#f8cd4f", "#f8a14f"];

$j(document).ready(function(){

	$j('.startBtn').click(function(){
		reset();
		start();
	});

	$j('#easy').click(function(){
		difficulty = 'easy';
	});


	$j('#medium').click(function(){
		difficulty = 'medium';
	});


	$j('#hard').click(function(){
		difficulty = 'hard';
	});

	$j('.row td').click(function(event){
		var innerVal = $j(this).children('.block').children('.label').text();
		var elementId = $j(this).children('.block').children('label').attr('id');
		if(gameStart) {
			registerClick(innerVal, elementId);
		}
	});

});

function start() {
	gameStart = false;
	clickCount = 0;
	if(difficulty == 'easy') {
		totalNumbers = 5;
		time = 10000;
	} else if(difficulty == 'medium') {
		totalNumbers = 10;
		time = 8000;
	} else {
		totalNumbers = 10;
		time = 6000;
	}

	$j('#optionsDiv').css('display', 'none');
	generateNumbers();
	timeOut();
}

function generateNumbers() {
	var placed;
	for (var i = 1; i <= totalNumbers; i++) {
		placed = false
		while (!placed) {
			var randLoc = randomiser(40, 0);
			if ($j('#'+randLoc).html() === '') {
				$j('#'+randLoc).html(i);
				if(difficulty == 'easy' || difficulty == 'medium') {
					$j('#'+randLoc).parent().css('background-color', divBackgroundColorsArray[randomiser(14, 0)]);
				}
				placed = true;
			}
		}
	}
}

function reset() {
	for(var i = 1; i <= 40; i++) {
		$j('#'+i).html('');
	}
	$j('.block').css('background-color', '#c0c0c0');
}

function modFunction(value1, value2) {
    return value1 % value2;
}

function randomiser(upperBound, lowerBound) {
    return Math.round(Math.random() * (upperBound - lowerBound));
}

function registerClick(tdVal, elemId) {
	clickCount++;

	if(clickCount != tdVal) {
		$j('.row td .block .label').css('display', 'inline-block');
		alert('Game over you loose..starting again..');
		$j('.row td .block .label').css('display', 'block');
		$j('#optionsDiv').css('display', 'block');
	} else {
		if(difficulty == 'easy' || difficulty == 'medium') {
			$j('#'+elemId).css('display', 'inline-block');
		}

		if(clickCount == totalNumbers) {
			$j('.row td .block .label').css('display', 'block');
			$j('#optionsDiv').css('display', 'block');
			alert('you won woohooo');
		}
	}
}

function timeOut() {
	var countDown = parseInt(time)/1000;
	//setTimeout(function(){ clearGameBoard() }, time);
	var myVar = setInterval(function(){
		if(countDown >= 0) {
			$j('#timer').html(countDown--);
		}

		if(countDown < 0) {
			clearGameBoard();
			$j('#timer').html('');
			clearInterval(myVar);
		}
	},1000);

}

function clearGameBoard() {
	$j('.row td .block .label').css('display', 'none');
	gameStart = true;
}