// SVAGO main javascript
// vanilla javascript

////////////////////////////////////////////////////////////////////////////////

//

function updateWhiteSpaces( EL ) {
	var str = getString(EL);
	
	EL.textContent = str;
	
	//console.log(str);
	whiteSpaces( EL );
}


////////////////////////////////////////////////////////////////////////////////

//

function getString( EL ) {

	var str = ''
	
	var rows = EL.childNodes;
	
	for (var n = 0; n< rows.length; n++) {
	
		space = (n > 0) ? ' ' : ''; 
	
		str += space + rows[n].textContent;
	
	}
	return str;	
}

////////////////////////////////////////////////////////////////////////////////

// Restituise la y del bottom dell'ultimo elemento contenuto in EL

function getBottomLast( EL ) {
	var figli = EL.childNodes;
	
	var ultimo = figli[ (figli.length - 1) ];
	
	//var SVGRect = ultimo.getBBox();
	var svgRectFiglio = ultimo.getBoundingClientRect();
	var svgRectPadre = EL.getBoundingClientRect();
	
	return roundSvgFloat( svgRectFiglio.bottom - svgRectPadre.top );
}

////////////////////////////////////////////////////////////////////////////////

//
//offsetTop = page_group.getBoundingClientRect().top,
//containerWidth = container.getBBox().width,

function whiteSpaces( EL ) {
	var
		svgNS = "http://www.w3.org/2000/svg",
		baseName = getElBaseId( EL ),
		container = document.getElementById( baseName + '_box' ),
		textArray = getTextArray( EL ),
		textArrayLength = textArray.length,
		currentLine = 0,
		whiteSpace = getWhiteSpaceWidth(EL),
		offsetLeft = roundSvgFloat( container.getBoundingClientRect().left ),
		containerWidth = container.getBoundingClientRect().width,
	
		tempLineWidth = 0
	;

	//console.log('conatiner:' + container.id + ' - ' + container.getBoundingClientRect().left);

	EL.textContent = '';

	for (var n=0; n < textArrayLength; n++) {
	

		var currentString = textArray[n];
		var currentStringWidth = getStringWidth(EL , currentString);

		if ( currentLine == 0 ) {
			// Solo primo giro

			currentLine++;
			
			var line = document.createElementNS(svgNS, "tspan");
			line.id = baseName + '_line_' + currentLine;
			line.setAttribute('x', offsetLeft);
			line.setAttribute('dy', '1em');
			line.textContent = currentString;
			EL.appendChild( line );
			tempLineWidth += currentStringWidth;

		} else {
		
			var linePrediction = parseInt(currentStringWidth) + parseInt(whiteSpace) + parseInt(tempLineWidth);

			if ( containerWidth >= linePrediction ) {
				// Se sta nella riga corrente

				var line = document.getElementById(baseName + '_line_' + currentLine);
				line.textContent += ' ' + currentString;
				tempLineWidth += whiteSpace + currentStringWidth;
			}	else {
				currentLine++;
				var line = document.createElementNS(svgNS, "tspan");
				line.id = baseName + '_line_' + currentLine;
				line.setAttribute('x', offsetLeft);
				line.setAttribute('dy', '2em');
				line.textContent = currentString;

				EL.appendChild( line );
				tempLineWidth = currentStringWidth;
			}
		}
	}
	container.setAttribute('height', getBottomLast(EL) );
}

////////////////////////////////////////////////////////////////////////////////

//

function getStringHeight( EL ) {

	var height = 'undefined';
	
	var tempText = EL.cloneNode(false);	///////////////////////////////////////// capire come reagisce agli attributi di stile
	tempText.id = '';

	tempText.setAttribute('x', '100%');
	tempText.setAttribute('y', '100%');
	
	tempText.textContent = 'X';
	var attachedText = EL.parentNode.appendChild( tempText );
	
	//height = roundSvgFloat( attachedText.getBBox().height );
	height = roundSvgFloat( attachedText.getBoundingClientRect().height );

 	attachedText.parentNode.removeChild(attachedText);

	return height;
}

////////////////////////////////////////////////////////////////////////////////

//

function getStringWidth( EL , STRING ) {

	var width = 'undefined';
	
	var tempText = EL.cloneNode(false);	///////////////////////////////////////// capire come reagisce agli attributi di stile
	tempText.id = '';

	tempText.setAttribute('x', '100%');
	tempText.setAttribute('y', '100%');
	
	tempText.textContent = STRING;
	var attachedText = EL.parentNode.appendChild( tempText );
	
	width = roundSvgFloat( attachedText.getBoundingClientRect().width );
	
 	attachedText.parentNode.removeChild(attachedText);

	return width;
}

////////////////////////////////////////////////////////////////////////////////

//

function getWhiteSpaceWidth( EL ) {
	var
		string1 = getStringWidth(EL, 'X X'),
		string2 = getStringWidth(EL, 'X XX'),
		x = string2 - string1
	;
	
	return string2 - (x*3);
}

////////////////////////////////////////////////////////////////////////////////

//

function roundSvgFloat( FLOAT ) {
	var number = parseInt(FLOAT * 10);
	return Math.ceil( number / 10 );	
}

////////////////////////////////////////////////////////////////////////////////

//

function getTextArray( EL ) {
	return EL.textContent.split(/\s+/) ;
}

////////////////////////////////////////////////////////////////////////////////

// Returns the part of the EL.id before first the underscore

function getElBaseId( EL ) {
	return EL.id.split('_')[0];
}

////////////////////////////////////////////////////////////////////////////////

// Main function

function main() {

	var container = document.getElementById('page_content');
	var desc = document.getElementById('headerDesc_text');
	var slider = document.getElementById('slide_away');

	setStyle();

 	if (container) whiteSpaces( container );
 	if (desc) whiteSpaces( desc );

 	// Events handling
	window.onresize = function updateInterface() {
		if (container) updateWhiteSpaces( container );
		if (desc) updateWhiteSpaces( desc );
		
		
		var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    
		console.log(x + ' × ' + y);
	};

	slider.onmouseover = function catchMouse() {
		// SIAMO SOPRA LA LINEA
		this.setAttribute('stroke','#39c');
		this.onmousedown = function drag(CLICK_EVENT) {
		
			// CLICCHIAMO SULLA LINEA
			var START_X = CLICK_EVENT.clientX;
			window.onmousemove = function( MOVE_EVENT ){

				printaValori(MOVE_EVENT.clientX , START_X);
				
				updateWhiteSpaces( desc );
				updateWhiteSpaces( container );
				
				return false;
			};
			return false;
		};
		
		window.onmouseup = function() { window.onmousemove = null; }
	}
	slider.onmouseout = function () { this.setAttribute('stroke','#999'); }
	//slider.onmouseup = function () {  }
}

////////////////////////////////////////////////////////////////////////////////

function printaValori(MOVE_EVENT , START_X) {

	var
		slider = document.getElementById('slide_away'),
		bar = document.getElementById('bar_bg'),
		desc = document.getElementById('headerDesc_box'),
		container = document.getElementById('page_box'),
		text =  document.getElementById('page_content'),
		movement = (MOVE_EVENT - START_X)
	;
	
	slider.setAttribute('x1' , START_X + movement + 'px');
	slider.setAttribute('x2' , START_X + movement + 'px');
	
	var svg = document.getElementsByTagName('svg')[0];
	var d = roundSvgFloat( (svg.clientWidth / 100 ) );

	barWidth = START_X + movement;
	descWidth = roundSvgFloat( (START_X + movement) - d * 4 );
	containerWidth = roundSvgFloat( svg.clientWidth - (d * 4) - barWidth );

	bar.setAttribute('width' , barWidth);
	desc.setAttribute('width' , descWidth );
	container.setAttribute('width' , containerWidth );
	container.setAttribute('x' , barWidth + (d * 2) );
	
	text.setAttribute('x' , barWidth + (d * 2) );

}
////////////////////////////////////////////////////////////////////////////////

// AUTOLOAD

window.onload = main;