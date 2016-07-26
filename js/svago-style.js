// SVAGO style javascript
// vanilla javascript

////////////////////////////////////////////////////////////////////////////////

//	,
// 	{
// 		'id' : 'nav_txt',
// 		'attributes' :
// 		[
// 			{ 'name'	: ''			, 'value'	:	''	},
// 			{ 'name'	: ''			, 'value'	:	''	},
// 			{ 'name'	: ''			, 'value'	:	''	},
// 			{ 'name'	: ''			, 'value'	:	''	},
// 			{ 'name'	: ''			, 'value'	:	''	}
// 		]
// 	},

var attr_list = [
	{
		'id' : 'bar_bg',
		'attributes' :
		[
			{ 'name' : 'x'			, 'value' : '0%'	},
			{ 'name' : 'y' 			, 'value' : '0%'	},
			{ 'name' : 'width'	, 'value' : '22%'},
			{ 'name' : 'height'	, 'value' : '100%'	},
			{ 'name' : 'fill'		, 'value' : '#fff'},
			{ 'name' : 'opacity', 'value' : '.75'}
		]
	},
	{
		'id' : 'header_txt',
		'attributes' :
		[
			{ 'name'	: 'x'			, 'value'	:	'2%'	},
			{ 'name'	: 'y'			, 'value'	:	'8%'	},
			{ 'name'	: 'style'	, 'value'	:	'text-transform:uppercase;'}
		]
	},
	{
		'id' : 'headerDesc_box',
		'attributes' :
		[
			{ 'name'	: 'x'			, 'value'	:	'2%'	},
			{ 'name'	: 'y'			, 'value'	:	'100%'	},
			{ 'name'	: 'width'	, 'value'	:	'18%'	},
			{ 'name'	: 'height'	, 'value'	:	'12em'	},
			{ 'name'	: 'fill'	, 'value'	:	'#fff'	},
			{ 'name'	: 'fill-opacity', 'value'	:	.7	}
		]
	},
	{
		'id' : 'headerDesc_text',
		'attributes' :
		[
			{ 'name'	: 'x'			, 'value'	:	'2%'	},
			{ 'name'	: 'y'			, 'value'	:	'10%'	},
			{ 'name'	: 'dy'		, 'value'	:	'2em'	},
			{ 'name'	: 'font-size', 'value'	:	'.9em'	},
			{ 'name'	: 'style'	, 'value'	:	'font-style:italic;'}
		]
	},
	{
		'id' : 'nav_bg',
		'attributes' :
		[
			{ 'name'	: 'x'			, 'value'	:	'100%'	},
			{ 'name'	: 'y'			, 'value'	:	'100%'	},
			{ 'name'	: 'fill'	, 'value'	:	'#eee'	}
		]
	},
	{
		'id' : 'nav_txt',
		'attributes' :
		[
			{ 'name'	: 'x'			, 'value'	:	'0%'	},
			{ 'name'	: 'y'			, 'value'	:	'80%'	},
			{ 'name'	: 'fill'	, 'value'	:	'#333'},
			{ 'name'	: 'dy'		, 'value'	:	'2em'	}
		]
	},
	{
		'id' : 'footer_txt',
		'attributes' :
		[
			{ 'name'	: 'x'			, 'value'	:	'11%'	},
			{ 'name'	: 'y'			, 'value'	:	'95%'	},
			{ 'name'	: 'font-size', 'value'	:	'1em'	},
			{ 'name'	: 'text-anchor', 'value'	:	'middle'	}
		]
	},
	{
		'id' : 'page_title',
		'attributes' :
		[
			{ 'name'	: 'x'			, 'value'	:	'96%'	},
			{ 'name'	: 'y'			, 'value'	:	'8%'	},
			{ 'name'	: 'text-anchor', 'value'	:	'end'	},
			{ 'name'	: 'opacity', 'value'	:	'.5'	},
			{ 'name'	: 'fill'	, 'value'	:	'#fff'},
			{ 'name'	: 'style'	, 'value'	:	'text-transform:uppercase;'}
		]
	},
	{
		'id' : 'page_box',
		'attributes' :
		[
			{ 'name'	: 'x'			, 'value'	:	'26%'	},
			{ 'name'	: 'y'			, 'value'	:	'8%'	},
			{ 'name'	: 'width' , 'value'	:	'70%'	},
			{ 'name'	: 'height' , 'value'	:	'86%'	},
			{ 'name'	: 'fill' , 'value'	:	'#fff'},
			{ 'name'	: 'opacity' , 'value'	:	'.5'	},
			{ 'name'	: 'rx' , 'value'	:	'1em'	},
			{ 'name'	: 'ry' , 'value'	:	'1em'	}
		]
	},
	{
		'id' : 'page_content',
		'attributes' :
		[
			{ 'name'	: 'x'			, 'value'	:	'50%'	},
			{ 'name'	: 'y'			, 'value'	:	'8%'	}
		]
	}
];

////////////////////////////////////////////////////////////////////////////////

// Applies attributes to the 

function svgGetAttr( ID , ATTRIBUTE ) {
	for (var n=0; n < attr_list.length; n++) {
	
		var element = attr_list[n];
	
		if (element.id == ID) {
		
		 	for (var m = 0; m < element.attributes.length; m++){
		 	
		 		var attribute = element.attributes[m];
		 		
		 		if (attribute.name == ATTRIBUTE) {
		 			var result = (attribute.value).match(/(\d+\.{0,1}\d)+(.*)/);

		 			switch (result[2]) {
		 			
		 				case '%':

							var svg = document.getElementsByTagName('svg')[0];
		 					retval = roundSvgFloat( (svg.clientWidth /100 )*result[1] );
		 				break;
		 			
		 			}
		 			
		 			return retval;
		 		}
		 	}
		}
	}
}

////////////////////////////////////////////////////////////////////////////////

// Applies attributes to the 

function svgAttr( LIST ) {
	for (var n=0; n < LIST.length; n++) {
		var
			obj = LIST[n],
			element = document.getElementById( obj.id ),
			attributes = obj.attributes
		;
		
		if (element) {
			for ( var m = 0; m < attributes.length; m++) {
				var attr = attributes[m];
				element.setAttribute( attr.name , attr.value );
			}
		}
	}
}

////////////////////////////////////////////////////////////////////////////////

// Sets hover effect to  aelement

function setStyle() {

	svgAttr( attr_list );

	var a = document.getElementsByTagName('a');
	
	for (var n = 0; n<a.length; n++){
	
		a[n].onmouseover = function() {
			this.setAttribute('fill','red');
		};
		
		a[n].onmouseout = function() {
			this.removeAttribute('fill');
		};
	}
}

////////////////////////////////////////////////////////////////////////////////