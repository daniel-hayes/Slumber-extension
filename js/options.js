<<<<<<< HEAD
// Saves options to chrome.storage
function save_options() {
  var color = document.getElementById('color').value;
  var likesColor = document.getElementById('like').checked;
  chrome.storage.sync.set({
    favoriteColor: color,
    likesColor: likesColor
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    favoriteColor: 'red',
    likesColor: true
  }, function(items) {
    document.getElementById('color').value = items.favoriteColor;
    document.getElementById('like').checked = items.likesColor;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
=======
$(document).ready(function() {


	// create the date object
	var currentTime = new Date();

 	// Get tomorrow's day!
	var theDay = currentTime.getDay();
	var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var today = weekday[theDay];
	// display tomorrow's date
	$("#today").html("<h3>Today is : "  + today + "</h3>" );

/*
	var day;

switch (theDay) {
    case 0:
        day = "Sunday";
        break;
    case 1:
        day = "Monday";
        break;
    case 2:
        day = "Tuesday";
        break;
    case 3:
        day = "Wednesday";
        break;
    case 4:
        day = "Thursday";
        break;
    case 5:
        day = "Friday";
        break;
    case 6:
        day = "Saturday";
        break;
}
console.log(day);
*/



	function everyDay() {
	    // input for hours
	    var input = "",
	    	hours = "";


	    input = input + "<select id='optionsHour'><option value='hour'>Hour</option>";

		   	for(var hour = 1; hour <= 12; hour++) {
		    	input = input + "<option value='" + hour + "'>" + hour + "</option>";
		    }

	    input = input + "</select>";


	    // input for minutes
	    var inputTwo = "",
	    	minutes = "";

	    inputTwo = inputTwo + "<select id='optionsMin'><option value='minute'>Minute</option>";
	   	
		   	for(var minute = 0; minute <= 55; minute += 5) {
		    	if (minute < 10) {
		    		inputTwo = inputTwo + "<option value='" + minute + "'>" + "0" + minute + "</option>"
		    	} else {
					inputTwo = inputTwo + "<option value='" + minute + "'>" + minute + "</option>";
		    	}
		    }	    					  

		inputTwo = inputTwo + "</select>";

		// AM or PM 
	    var inputThree = "<select id='optionsTime'><option value='am'>AM</option><option value='pm'>PM</option></select>";

		
		var allInputs = input + "<h4 style='display:inline-block;'>:</h4>" + inputTwo + inputThree;

		$(".options").html(allInputs);
	}

everyDay();

/*
	$("li").click(function () {
		var dataTime = $(this).attr("data-time");
			$(this).parent("ul").siblings("h3").attr("data-time", dataTime);
			$(this).parent("ul").siblings("h3").html(dataTime);
			*/

// Saves options
function save_options() {
	if($(".options").siblings("p").html() == "Monday") {
		$("#optionsHour").html("<option value='hi'>hi</option>");
	}
	var hour = $('#optionsHour').val();
  	var min = $('#optionsMin').val();
	var timeOfDay = $('#optionsTime').val(); 
	console.log(hour);
	console.log(min);
	console.log(timeOfDay); 
  	chrome.storage.sync.set({
  		// set the new values
  		setHour: hour,
    	setMin: min,
    	setTime: timeOfDay
  	}, function() {
   			var status = $("#status");
    		status.html("Options Saved ;)");
    		setTimeout(function() {
      			status.html("");
    		}, 1500);
 		}); // end status update
} // save options

function restore_optionss() {
  	chrome.storage.sync.get({
  		// list of default object values
    	setHour: "hour",
    	setMin: "minute",
    	setTime: "am"
  }, function(items) {
    	document.getElementById('optionsHour').value = items.setHour;
    	document.getElementById('optionsMin').value = items.setMin;
    	document.getElementById('optionsTime').value = items.setTime;
    	console.log(items);
  });
}

restore_optionss(); // call restore

$('#save').on('click', save_options); // call save options



/*

// Saves options
function save_options() {
	var color = $('#color').val();
  	var likesColor = $('#like').is(":checked");
  	chrome.storage.sync.set({
  		// set the new values
  		newColor: color,
    	goodColor: likesColor
  	}, function() {
   			var status = $("#status");
    		status.html("Options Saved ;)");
    		setTimeout(function() {
      			status.html("");
    		}, 1500);
 		}); // end status update
} // save options

function restore_options() {

  	chrome.storage.sync.get({
  		// list of default object values
    	newColor: 'red',
    	goodColor: true
  }, function(items) {
    	document.getElementById('color').value = items.newColor;
    	document.getElementById('like').checked = items.goodColor;
  });
}


restore_options();

$('#save').on('click', save_options) // call save options
*/
});


>>>>>>> 66ba82f8e7489ba1109222fd887d6914e82bb11b
