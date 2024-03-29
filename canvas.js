$(document).ready( function() {
	
	objectList = new Array();
	
	offsetx = 10;
	offsety = 152;
	
	basex = 0;
	basey = 0;
	currentx = 0;
	currenty = 0;
	color = "#000000";
	mode = "line";
	rotateMode = false;
	rotateAngle = 1.0;
	drawing = false;
	
	var width = $("body")[0].clientWidth;
	var height = $("body")[0].clientHeight;
	
	$("canvas").attr("width",width);
	$("canvas").attr("height",height);
	
	centerX = $("canvas").attr("width") / 2.0;
	centerY = $("canvas").attr("height") / 2.0;
	
	$('#colorSelector').ColorPicker({
		color: '#0000ff',
		onShow: function (colpkr) {
			$(colpkr).fadeIn(500);
			return false;
			},
		onHide: function (colpkr) {
			$(colpkr).fadeOut(500);
			return false;
			},
		onChange: function (hsb, hex, rgb) {
			$('#colorSelector div').css('backgroundColor', '#' + hex);
			color = '#' + hex;
			}
		});
		
	$("canvas").click( function( e ) {
		if(!drawing) {
			
			basex = e.clientX - offsetx;
			basey = e.clientY - offsety;
			
			drawing = true;
			}
		else {
			
			currentx = e.clientX - offsetx;
			currenty = e.clientY - offsety;
			
			if( mode == "line" ) {
				$("canvas").drawLine({
					strokeStyle: color,
					strokeWidth: 10,
					rounded: true,
					x1: basex, y1: basey,
					x2: currentx, y2: currenty
					});
				
				var t = new Object();
				
				t.type = "line";
				t.x1 = basex;
				t.x2 = currentx;
				t.y1 = basey;
				t.y2 = currenty;
				t.color = color;
				
				objectList.push( t );
				
				}
					
			if( mode == "circle" ) {
				
				var r = Math.sqrt( Math.pow( currentx - basex , 2 ) + Math.pow( currenty - basey , 2 ) );
				
				$("canvas").drawArc({
					strokeStyle: color,
					strokeWidth: 10,
					fillStyle: "transparent",
					x: basex, y: basey,
					radius: r
					});
				
				var t = new Object();
				
				t.type = "circle";
				t.x = basex;
				t.y = basey;
				t.r = r;
				t.color = color;
				
				objectList.push( t );
				
				}
			
			if( mode == "rect" ) {
				
				var w = currentx - basex;
				var h = currenty - basey;
				
				$("canvas").drawRect({
					strokeStyle: color,
					strokeWidth: 10,
					fillStyle: "transparent",
					x: basex, y: basey,
					width: w,
					height: h,
					fromCenter: false
					});
				
				var t = new Object();
				
				t.type = "rect";
				t.x = basex;
				t.y = basey;
				t.w = w;
				t.h = h;
				t.color = color;
				
				objectList.push( t );
				
				}
				
			drawing = false;
			}
		});
	
	$("button").click( function( e ) {
		
		var i = $(e.currentTarget).attr("id");
		
		if( i == "lineSelector" )
			mode = "line";
		if( i == "circleSelector" )
			mode = "circle";
		if( i == "rectangleSelector" )
			mode = "rect";
		
		if( i == "clearCanvas" ) {
			$("canvas").clearCanvas();
			}
		if( i == "rotateCanvas" ) {
			if( !rotateMode ) {
				rotateMode = true;
			
				window.setInterval(timerFunc, 30);
				}
			else
				{
				
				rotateMode = false;
				
				$("canvas").rotateCanvas({
					angle: 0,
					x: centerX, y: centerY
					});
				
				$("canvas").restoreCanvas();
				
				}
			
			}
		
		$("#modeSpan").html(mode);
		
		});
	
	
	});

function timerFunc() {
	
	if( rotateMode ) {
		
		$("canvas").rotateCanvas({
			angle: rotateAngle,
			x: centerX, y: centerY
			})
		
		$("canvas").clearCanvas();
		
		for( var i = 0 ; i < objectList.length ; i++ ) {
			
			var t = objectList[i];
			
			if( t.type == "line" ) {
				
				$("canvas").drawLine({
					strokeStyle: t.color,
					strokeWidth: 10,
					rounded: true,
					x1: t.x1, y1: t.y1,
					x2: t.x2, y2: t.y2
					});
				
				}
			
			if( t.type == "circle" ) {
				
				$("canvas").drawArc({
					strokeStyle: t.color,
					strokeWidth: 10,
					fillStyle: "transparent",
					x: t.x, y: t.y,
					radius: t.r
					});
				
				}
			
			if( t.type == "rect" ) {
				
				$("canvas").drawRect({
					strokeStyle: t.color,
					strokeWidth: 10,
					fillStyle: "transparent",
					x: t.x, y: t.y,
					width: t.w,
					height: t.h,
					fromCenter: false
					});
				
				}
			
			}
		
		$("canvas").restoreCanvas();
		
		}
	
	}
