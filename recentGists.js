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
	var gistDesc;
	var descUrl;
	var gistID;
	var originalGists = [];
	var favoriteGists = [];
/*	var language;*/

	for(var i = 0; i < responseObj.length; i++) {
		descUrl = responseObj[i].html_url;
		console.log(descUrl);
		gistDesc = responseObj[i].description;
		console.log(gistDesc);
		gistID = generateId(i);
		console.log(gistID);

		originalGists.push(GistObject(gistDesc, gistID, descUrl));
/*
		var a = document.createElement('a');
		a.setAttribute('href', descUrl);

		if(gistDesc === "" || gistDesc === null || gistDesc === undefined) {
			gistDesc = 'No description';
		}

		a.innerHTML = gistDesc;
		var fbutton = document.createElement('button');
		fbutton.innerHTML = 'Add to Favorites';

		a.appendChild(fbutton);

		var listItem = document.createElement('li');
		listItem.appendChild(a);
		gistList.appendChild(listItem);


		for(var j = 0; j < responseObj[i].files.length; j++) {
			language = responseObj[i].files[j].language;
			console.log(language);
		} */
	}

	for(var i = 0; i < originalGists.length; i++) {
		var gistList = insertHtml(originalGists[i]);
	}
	var displayGistList = document.getElementById('gists');
	displayGistList.appendChild(gistList);
}

function generateId(num) {
	return('gist' + num.toString());
}

function GistObject(gistDesc, gistId, descUrl) {
	this.gistDesc = gistDesc;
	this.gistId = gistId;
	this.descUrl = descUrl;
}

function insertHtml(gist) {
	var a = document.createElement('a');
	a.setAttribute('href', descUrl);

	if(gistDesc === "" || gistDesc === null || gistDesc === undefined) {
		gistDesc = 'No description';
	}

	a.innerHTML = gistDesc;
	var fbutton = document.createElement('button');
	fbutton.innerHTML = 'Add to Favorites';

	a.appendChild(fbutton);

	var listItem = document.createElement('li');
	listItem.appendChild(a);
	gistList.appendChild(listItem);

	return gistList;
}