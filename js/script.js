$(document).ready(function() {

	$("#everything").fadeIn(900);

	$('#everything').css({
		left: ($(window).width() - $('#everything').width())/2,
		top: ($(window).height() - $('#everything').height())/2
	});
	
		// create the date object
		var currentTime = new Date();

	function updateClock() {
		var currentTime = new Date();
	    var currentHours = currentTime.getHours();
	    var currentMinutes = currentTime.getMinutes();
	    var currentSeconds = currentTime.getSeconds();
	 
	    // Pad the minutes and seconds with leading zeros, if required
	    currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
	    currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
	 
	    // Choose either "AM" or "PM" as appropriate
	    var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";
	 
	    // Convert the hours component to 12-hour format if needed
	    currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
	 
	    // Convert an hours component of "0" to "12"
	    currentHours = ( currentHours == 0 ) ? 12 : currentHours;
	 
	    // Compose the string for display
	    var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;
	     
	     
	    $("#theTime").html("<h1>" + currentTimeString + "</h1>");

		/*var mainHours = currentTime.getHours();
		
		console.log(mainHours);
		if(mainHours >= 18 || mainHours <= 6) {
			$("body").addClass("night");
			$("body").removeClass("day");
		} else {
			$("body").addClass("day");
			$("body").removeClass("night");
		} */
	}


 	updateClock(); // display clock
 	setInterval(updateClock, 1000); // change time


 	// Get tomorrow's day!
	var theDay = currentTime.getDay();
	var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var today = weekday[theDay];
	// display tomorrow's date
	$(".wake").html("<h3>wake time for tomorrow :</h3>" );

	
	function load() {
	    // input for hours
	    var input = "",
	    	hours = "";


	    input = input + "<div class='drop'><h3 id='hour' data-time='Hours'>Hours</h3><ul>";

		   	for(var hour = 1; hour <= 12; hour++) {
		    	input = input + "<li data-time='" + hour + "'>" + "<p>" + hour + "</p>" + "</li>";
		    }

	    input = input + "</ul></div>";


	    // input for minutes
	    var inputTwo = "",
	    	minutes = "";

	    inputTwo = inputTwo + "<div class='drop'><h3 id='minute' data-time='Minutes'>Minutes</h3><ul>";
	   	
		   	for(var minute = 0; minute <= 55; minute += 5) {
		    	if (minute < 10) {
		    		inputTwo = inputTwo + "<li data-time='" + minute + "'>" + "<p>" + "0" + minute + "</p>" + "</li>"
		    	} else {
					inputTwo = inputTwo + "<li data-time='" + minute + "'>" + "<p>" + minute + "</p>" + "</li>";
		    	}
		    }	    					  

		inputTwo = inputTwo + "</ul></div>";

		// AM or PM 
	    var inputThree = "<div class='drop'><h3 id='time' data-time='AM or PM'>AM or PM</h3><ul id='timeofday'>" +
	    				 "<li data-time='AM'><p>AM</p></li>" + "<li data-time='PM'><p>PM</p></li>" +
	    				 "</ul></div>";


	    var inputFour = "<button><h3>Calculate</h3></button>";

		
		var allInputs = input + "<h4 style='display:inline-block; font-size: 2em;'>:</h4>" + inputTwo + inputThree + inputFour;

		$("#sleep").html(allInputs);
	}

load(); // load content

	// show dropdown list
	$(".drop").click(function() {
		$(this).find("ul").toggleClass("show");
		if($(this).find("ul").hasClass("show")) {
			$(this).addClass("box");
			$(".show").animate({
				opacity: 1,
				top: "100%"
			}, 150);
		} else {
			$(this).removeClass("box");
			$(this).find("ul").css({
				opacity: 0,
				top: "80%"
			});
		}

	});

	// set value for data-time
	$("li").click(function () {
		var dataTime = $(this).attr("data-time");
			$(this).parent("ul").siblings("h3").attr("data-time", dataTime);
			$(this).parent("ul").siblings("h3").html(dataTime);
		
	// add zero to minutes input
	if($("#minute").attr("data-time") < 10) {
		if($('#minute').attr("data-time") == 0) {
			$("#minute").html("00");
		}
		else if($("#minute").attr("data-time") == 5) {
			$("#minute").html("05");
		}
	}

			/* fix

			if(dataTime == $("h3").attr("data-time"))  {
				$(this).css("background", "blue");
				console.log(dataTime);
			} else {
				$(this).css("background", "red");
			}
			*/
	});
	

	function sleep(hr, min, day) {
                var rmin = 0;
                var rhr = 0;
                var a = day;
                if(min < 30) {
                        rmin = (min * 1) + (30 * 1);
                        rhr = hr - 2;
                }
                else if(min >= 30) {
                        rmin = min - 30;
                        rhr = hr - 1;
                }
                if(rhr < 1) {
                        rhr = 12 + rhr;
                        
			if(a == "AM") {
				a = "PM";
			}
			else {
				a = "AM";
			}
			
                }
                
		var r = [rhr, rmin, a];
		return r;
	}

	$("#sleep button").click(function () {
		if ($(".drop ul").hasClass("show")) {
			$(".show").removeClass();
		}

		if($("#hour").attr("data-time") == 'Hours' || $("#minute").attr("data-time") == 'Minutes' || $("#time").attr("data-time") == 'AM or PM' ) {
			return false;
		}
		
		var ampm = $("#time").attr("data-time");	
		var hr = $("#hour").attr("data-time");
		var min = $("#minute").attr("data-time");
		var orig = [hr, min, ampm];
		
		if(hr == 12) {
			if(ampm == "AM") {
				ampm = "PM";
			}
			else {
				ampm = "AM";
			}
		}
		
		var times = new Array();

		for(var c = 1; c <= 10; c++) {

			var back = sleep(hr, min, ampm);
			var nhr = back[0];
			var nmin = back[1];
			ampm = back[2];
			var ampmt = "";
			ampmt = back[2];
			
			if(nhr == 12) {
				if(ampm == "AM") {
					ampmt = "PM";
				}
				else {
					ampmt = "AM";
				}
			}

			if(c == 6 || c == 4 || c == 5 || c == 3) {
				var temp = '';
				if(nmin > 9) {
					if(c == 6) {


						temp = '<h1>' + nhr + ':' + nmin + '<small>' + ampmt + '</small></h1>';
						times.push(temp);
					}
					else {
						temp = '<h1>' + nhr + ':' + nmin + '<small>' + ampmt + '</small></h1>';
						times.push(temp);
					}
				}
				else { // insert 0
					if(c == 6) {
						temp = '<h1>' + nhr + ':0' + nmin + '<small>' + ampmt + '</small></h1>';
						times.push(temp);
					}
					else {
						temp = '<h1>' + nhr + ':0' + nmin + '<small>' + ampmt + '</small></h1>';
						times.push(temp);
					}
				
				}
			}
			hr = nhr;
			min = nmin;
		}
		
		$('#sleeptimes').html("<h3>sleep times for tonight:</h3>" );

		var sleepyTime = "";

		for(i = 3; i >= 0; i--) {
			sleepyTime = sleepyTime + times[i];
		}

		$('#instant').html(sleepyTime).animate({
			opacity: '1'
		}, 1100);

		$("#instant h1:nth-child(1)").append("<span class='pop'>9 hours of sleep</span>");
		$("#instant h1:nth-child(2)").append("<span class='pop'>7.5 hours of sleep</span>");
		$("#instant h1:nth-child(3)").append("<span class='pop'>6 hours of sleep</span>");
		$("#instant h1:nth-child(4)").append("<span class='pop'>4.5 hours of sleep</span>");

		$('footer').show().animate({
			opacity: "1"
		}, 600);

		// adjust screen
		var allThings = $("#everything");
		var allThingsHeight = allThings.css('height');

		// if everything height is not 560 then animate 
		if(allThingsHeight !== "600px") {
			if($(window).width() < 500) {
				allThings.animate({
					height: "500px",
					left: ($(window).width() - allThings.width())/2,
					top: ($(window).height() - 300)/2
				}, 600);
			} else {
				allThings.animate({
					height: "600px",
					left: ($(window).width() - allThings.width())/2,
					top: ($(window).height() - 600)/2
				}, 600);
			}
		}

	}); // end click function 

	var icons = $('#reset, #save');

	icons.mouseover(function() {
		$(this).find("img").stop(true, false).animate({
			opacity: 1
		}, 200);
	});
	icons.mouseout(function() {
		$(this).find("img").stop(true, false).animate({
			opacity: 0.2
		}, 200);
	});
	
	$('#reset').click(function() {
        $(this).find("img").css({
        	"-webkit-transform": "rotate(-180deg)"
        });

    	setTimeout(function() {
			$("body").fadeOut(900);
    	}, 250);

    	setTimeout(function() {
			location.reload();
			chrome.storage.sync.clear();
    	}, 1300);
/*         YOU WANT TO USE STROAGEAREA.CLEAR(FUNCTION CALLBACK) TO CLEAR SYNC DATA AND RETRUN TO DEFAULT...*/
	});
		
		
	// resize the div based on window size
	$(window).resize(function(){
		$('#everything').css({
			left: ($(window).width() - $('#everything').width())/2,
			top: ($(window).height() - $('#everything').height())/2
		});
	});


	/* example 

	// add zero to minutes input
	if($("#minute").attr("data-time") < 10) {
		if($('#minute').attr("data-time") == 0) {
			$("#minute").html("00");
		}
		else if($("#minute").attr("data-time") == 5) {
			$("#minute").html("05");
		}
	}
	*/

	function restore_options() {
  		console.log(hour);		
	  	chrome.storage.sync.get({
	  		setHour: "Hours",	
	  		setMin: "Minutes",
	  		setTime: "AM or PM"	
	  	}, function(items) {
    		$('#hour').attr("data-time", items.setHour).html(items.setHour);
    		$('#minute').attr("data-time", items.setMin).html(items.setMin);
    		$('#time').attr("data-time", items.setTime).html(items.setTime);
	  	  	console.log(items);

	  	});
	  	
	}

	// Saves options
	function save_options() {

		var hour = $('#hour').attr("data-time");
	  	var min = $('#minute').attr("data-time");
		var timeOfDay = $('#time').attr("data-time"); 

	  	chrome.storage.sync.set({
	  		// set the new values
	  		setHour: hour,
	    	setMin: min,
	    	setTime: timeOfDay
	  	}, function() {
	   			var status = $("#update");
	    		status.fadeIn(1000).html("<h3>time saved</h3>");
	    		setTimeout(function() {
	      			status.html("");
	    		}, 112000);
	 		}); // end status update
	} // save options

	restore_options(); // call restore

	$('#save').on('click', save_options); // call save options







	


}); // end document ready

