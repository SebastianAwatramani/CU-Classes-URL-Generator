	//document.getElementById("genURL").addEventListener('click', generateURL, true);
	var memberClipboard = new Clipboard('#copyButton');
	var selects = document.getElementsByTagName("select");
	for(var i = 0; i < selects.length; i++) {
	    selects[i].addEventListener("change", generateURL, true);
	}
	document.getElementById("reset").addEventListener('click', function () {
	    document.getElementById("urlAnchor").href = "";
	    document.getElementById("urlText").innerText = "";
	})


	function generateURL() {
        //This functions does the mean and potatoes of our combination
	    var URLPairs = buildUrlPairsObject();
	    var baseURL = "http://classes.colorado.edu/?";
	    var count = 0;

	    var URLPairsSize = Object.keys(URLPairs).length;

	    for (var key in URLPairs) {
	        if (URLPairs.hasOwnProperty(key)) {
	            count++;
	            baseURL += key + "=" + URLPairs[key];
	            if (count < URLPairsSize) {
	                baseURL += "&";
	            }
	        }
	    }
	    addUrlToPage(baseURL);
	}

	function buildUrlPairsObject() {
	    //This creates an object containing a set of key-value pairs representing the data requested in the form.  For example, if user selects a campus, then there is an entry where the key is "camp" and the value might be "BLDR."  We use these pairs to construct the URL
	    var URLPairs = [];
	    var selects = document.getElementsByTagName("select");
	    for (var i = 0; i < selects.length; i++) {
	        if (selects[i].value != "") {
	            URLPairs[selects[i].id] = selects[i].value;
	        }
	    }
	    return URLPairs;
	}

	function addUrlToPage(url) {
	    //Function to print the URL to the page if the user would like to click it
	    var div = document.getElementById('URLResult');
	    var anchor = document.getElementById("urlAnchor");
	    var p = document.getElementById("urlText");
	    p.innerText = url;
	    anchor.href = url;
	    anchor.setAttribute("data-clipboard-text", url);

	}

	function showToolTip() {
	    //This shows a small tool tip indicating the URL has been copied to the clipboard.  
	    var tooltip = document.createElement('div');
	    tooltip.id = "tooltip";

	    var tooltipP = document.createElement('p');
	    tooltipP.innerHTML = 'Copied to Clipboard';
	    tooltip.appendChild(tooltipP);
	    document.body.appendChild(tooltip);

	    //Fades the copy confirmed div out
	    function fadeOut() {
	        var opacity = window.getComputedStyle(tooltip).getPropertyValue("opacity");

	        if (opacity > 0) {
	            tooltip.style.opacity = opacity - .01;
	        } else {
	            window.clearInterval(timer);
	        }
	    }
	    var timer = setInterval(fadeOut, 50);
	}

	memberClipboard.on('success', showToolTip);
