'use strict'
// client.js 

$(document).ready(function() {


	// prod / sandbox or custom domain logon click
	$("a[class='logon-link']").click(function() {
		console.log('we have been clicked ['+JSON.stringify(this.id)+']');
	});

	$("#custom_domain").change(function(){
			console.log('changing function');
		$("#custom_domain_elements").toggle();
		$("#logon_buttons").toggle();
		$("#custom").toggle();
	});

	$("#imageDescribeBtn").click(function() {
		
		$("#spinner").toggle();
		$("#responses").html("");
		var source   = $("#labelAnnotationsTemplate").html();
		var template = Handlebars.compile(source);
		
		var postData = {};
		postData.urlVal = encodeURIComponent($("#imageUrl").val());
		
		$.post('/imageUrl', postData, function(data) {

			console.log(JSON.stringify(data));
			if(data.success) {
				var html = template(data);
				console.log(html);
				$("#responses").html(html);
			} else {
				$("#responses").html(data.message +"<br />"+data.error);	
			}
			$("#spinner").toggle();
		})
	});

});

Handlebars.registerHelper("debug", function(optionalValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);
 
  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});
