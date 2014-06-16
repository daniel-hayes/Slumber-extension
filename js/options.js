$(document).ready(function() {


	// create the date object
	var currentTime = new Date();

 	// Get tomorrow's day!
	var theDay = currentTime.getDay();
	var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var today = weekday[theDay];
	// display tomorrow's date
	$("#today").html("<h3>Today is : "  + today + "</h3>" );

});