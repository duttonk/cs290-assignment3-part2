/* Sources consulted:
   Saturday night tutorial session code
   GitHub API documentation
   */
function search_gists() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
	}

	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
			var response = xmlhttp.responseText;
			localStorage.setItem('localResponse', response);
			loadResponse();
		}
	}

	var url = "https://api.github.com/gists";
	xmlhttp.open('GET', url, true);
	xmlhttp.send();
}

function addParams() {
	var statement;

	search_gists();
}

function loadResponse() {
	var responseObj = JSON.parse(localStorage.getItem('localResponse'));

	var gistList = document.createElement('ul');
//	var listItem = document.createElement('li');
	var description;
	var descUrl;
/*	var language;*/

	for(var i = 0; i < responseObj.length; i++) {
		descUrl = responseObj[i].html_url;
		console.log(descUrl);
		description = responseObj[i].description;
		console.log(description);

		var a = document.createElement('a');
		a.setAttribute('href', descUrl);

		if(description === "" || description === null) {
			description = 'No description';
		}

		a.innerHTML = description;

		var listItem = document.createElement('li');
		listItem.appendChild(a);
		gistList.appendChild(listItem);

/*
		for(var j = 0; j < responseObj[i].files.length; j++) {
			language = responseObj[i].files[j].language;
			console.log(language);
		} */
	}

	var displayGistList = document.getElementById('gists');
	displayGistList.appendChild(gistList);
}