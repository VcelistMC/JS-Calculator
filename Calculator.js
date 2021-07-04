var screen, //main screen
opScreen, //operation screen
firstNumber = 0,
secondNumber = 0, 
operation, //the operation, +, -, etc..
numberButtons, //a list of all the number buttons
operationButton,  // a list of all the operation buttons
equalButton, //the equal button
clearButton; // the clear button

function init() { //initilizes all the variables
	screen = document.getElementById("screen");
	opScreen = document.getElementById("opScreen");

	numberButtons = [ //array of all the number buttons
		document.getElementById('1'),
		document.getElementById('2'),
		document.getElementById('3'),
		document.getElementById('4'),
		document.getElementById('5'),
		document.getElementById('6'),
		document.getElementById('7'),
		document.getElementById('8'),
		document.getElementById('9'),
		document.getElementById('0'),
		document.getElementById('.'),
	]

	operationButtons = [ //array of all the operation buttons
		document.getElementById('+'),
		document.getElementById('-'),
		document.getElementById('/'),
		document.getElementById('*'),
	]

	equalButton = document.getElementById('=')
	clearButton = document.getElementById('cl')


  	for(var i = 0; i < numberButtons.length; i++) { //iterate over each number button and assigns an event listener to it
		var element = numberButtons[i];
		element.addEventListener('click', writeOnScreen)
	}

	for(var i = 0; i < operationButtons.length; i++) {//iterate over each operation button and assigns an event listener to it
		var element = operationButtons[i];
		element.addEventListener('click', recordOp)
	}

	equalButton.addEventListener('click', performOp);
	clearButton.addEventListener('click', clear)
}

function writeOnScreen(event) {
	var text = event.currentTarget.id; //get the text of the pressed button
	if(text === ".") //disables the decimal point button to prevent it from being pressed multiple times
		event.currentTarget.disabled = true
	
	//overwrites the text on the main screen if it was zero or the result of the last operation, 
	//else appends the text to the main screen
	if(screen.textContent === "0" || screen.textContent == firstNumber)
		screen.textContent = text
	else
		screen.textContent += text;
}

//once an operation button is pressed, it takes the entered number and the operation, stores and displayes them
function recordOp(event) {
	if(opScreen.textContent === "")
		firstNumber = parseFloat(screen.textContent);
	operation = event.currentTarget.id;
	if(screen.textContent === "0" && operation === "-") {
		writeOnScreen(event);
		return;
	}
	opScreen.textContent = firstNumber + " " + operation;
	screen.textContent = "0"

	//enables the decimal button again 
	document.getElementById(".").disabled = false;
}


//once the equal button is pressed
function performOp() {
	secondNumber = parseFloat(screen.textContent); // gets the entered number

	//stores the result in the first number variable so that the user can use the results in the next operation
	switch (operation) {
		case "+":
			firstNumber = add(firstNumber, secondNumber);
			break;
		case "-":
			firstNumber = subtract(firstNumber, secondNumber);
			break;
		case "*":
			firstNumber = multiply(firstNumber, secondNumber);
			break;
		case "/":
			firstNumber = divide(firstNumber, secondNumber);
			break;
		default:
			return;
	}
	screen.textContent = firstNumber;
	//clears the screen
	opScreen.textContent = "";
	operation = "";
}

function add(n1, n2) {
	return n1 + n2;
}

function subtract(n1, n2) {
	return n1 - n2;
}

function multiply(n1, n2) {
	return n1 * n2;
}

function divide(n1, n2) {
	return n1 / n2;
}

function clear() {
	opScreen.textContent = "";
	operation = "";
	firstNumber = 0;
	secondNumber = 0;
	screen.textContent = "0";
}

window.onload = () => init();