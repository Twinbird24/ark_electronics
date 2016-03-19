// ensures the DOM is loaded before js is executed
$(document).ready(function() {
	console.log("DOM is ready");

	// hijack the nav click event (could also use .on instead of .delegate)
	$("nav").delegate("a", "click", function() {
		// store the href attribute of <a> element into a variable
		_href = $(this).attr("href");
		// change the url without a page refresh and add a history entry
		history.pushState(null, null, _href);
		// run the loadContent function with _href as the argument to be passed through
		loadContent(_href);
		// the 'return false' in this case stops the browser from jumping to the current 
		// location, as indicated by the href="whatever.html" when clicking on <a> in the html page - instead, only loadContent() is executed
		return false;
	});

	function loadContent(href){
		// targets the #container div and then fades
		// it out, in milliseconds. Once complete, the function is executed
		$("#container").fadeOut(200, function() {
				console.log("fade out complete");
				// once the old content is faded out, we hide the container, and then
				// we load the <div id="container"> from the html page that the href targets
				$("#container").hide().load(href + " #container", function() {
					// the newly loaded-in container is faded in
					$("#container").fadeIn(200);
					console.log("fade in complete")

					// .load() is called with a selector expression (#container, in this case) appended to the URL, and so 
					// the scripts are stripped out prior to the DOM being updated, and thus are not executed, to work around
					// this, we test if the page being loaded is "contact.html" and if it is, we load the required scripts in
					// separately with another function
					if(_href == "contact.html") {

						// this will run everytime we navigate/click to go to "contact.html"
						console.log("contact.html loaded");

						// load the contact.js script, and once loaded,
						// check if the Maps API is loaded - if it is then run initMap to load the map, 
						// and if it's not - then load the API and then run the initMap function
						$.getScript("contact.js", function() {

							// test if the Google Maps API is present.
							// The typeof returns "undefined" in two cases: either a variable has not been declared
							// or the given value is undefined. This is why typeof can be used to check whether a 
							// variable exists and has a value
							if (typeof google === 'object' && typeof google.maps === 'object') {

								console.log("Google Maps already loaded");
							    initMap();

							} else {

								console.log("No maps API, let's load it");
								// creates a new <script> element, and stores it in a varialbe
							    var script = document.createElement("script");
							    // sets the type attribute of the <script> tag
							    script.type = "text/javascript";
							    // sets the source
							    script.src = "http://maps.google.com/maps/api/js?callback=initMap";
							    // attaches the <script> to the body of the document (i.e. loads the script)
							    document.body.appendChild(script);
							}

							// make a call for the mail button code, becuase #mail_btn is not originally recognized when
							// the contact page is loaded dynamically (so #mail_btn is loaded in, and THEN we can call the code
							// that uses #mail_btn)
							mail_btn_code();
						});
					} else {
						// this will run everytime we don't navigate to the "contact.html" page
						console.log("contact.html not loaded");
					}
				});
		});
	}

	// when a popstate event occurs (when browser history changes), run function.
	// Could also use .on instead of .bind
	$(window).bind("popstate", function() {
		console.log("popstate (back/ forward click");
		// update this variable (_href) to the correct one (so it can be loaded when you go forward/ backward).
		// We only want the filename, not the entire pathname (i.e. '/index.html' would become 'index.html')
		_href = location.pathname.replace(/^.*[\\\/]/, "");
		// now run the function to load the content
		loadContent(_href);
	})

	// what to do when the mail button is clicked on the contact page.
	// The code is in a separate function so it can also run when the contact page
	// is loaded dynamically (otherwise #mail_btn is not recognized and code doesn't run).
	// And this way, we can still run the code when the page is not loaded dynamically
	mail_btn_code();
	function mail_btn_code() {
		$("#mail_btn").click(function() {
			console.log("E-mail button clicked");

			var targeted_popup_class = jQuery(this).attr('data-popup-open');
			$('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
		});

		// close the pop-up
		$('[data-popup-close]').on('click', function(e)  {
		       var targeted_popup_class = jQuery(this).attr('data-popup-close');
		       $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
		
		       e.preventDefault();
		});
	}


});