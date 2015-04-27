/* Sources consulted:
   Saturday night tutorial session code
   GitHub API documentation
   Piazza discussions
   */

/* Generate a random id number for each gist object */
function generateId(num) {
    return ('gist' + num.toString());
}

/* Construct a gist object */
function GistObject(gistDesc, gistId, descUrl, lang) {
    this.gistDesc = gistDesc;
    this.gistId = gistId;
    this.descUrl = descUrl;
    this.lang = lang;
}

/* Convert gist object into HTML code, displayable on HTML page */
function insertHtml(gist) {
	/* create button */
    var fbutton = document.createElement('button');
    fbutton.innerHTML = 'Add to Favorites';
    fbutton.setAttribute('gistId', gist.gistId);
    fbutton.onclick = function () {
        var searchGists = document.getElementById('gists');
        var item = searchGists.getElementsByTagName('li');

        for (var i = 0; i < item.length; i++) {
        	if (item.childNodes[0].nodeValue === fbutton.getAttribute('gists')) {
        		console.log("in new remove");
        		var parent = document.getElementById('gists');
        		var child = item[i];
        		parent.removeChild(child);
        	}
        }
    };

    /* create <a> element to hold object */
    var a = document.createElement('a');

    /* set href attribute to the html_url of the gist object */
    a.setAttribute('href', gist.descUrl);

    /* if description is empty, provide one */
    if (gist.gistDesc === "" || gist.gistDesc === null || gist.gistDesc === undefined) {
        gist.gistDesc = 'No description';
    }

    /* set wording of <a> element to be the description*/
    a.innerHTML = gist.gistDesc;

    /* add the button to <a> element */
    a.appendChild(fbutton);

    /* create a new list item and add the <a> element to it */
    var listItem = document.createElement('li');
    listItem.appendChild(a);

    return listItem;
}

/* save and parse response */
function loadResponse() {
    var responseObj = JSON.parse(localStorage.getItem('localResponse'));

    var gistDesc;
    var descUrl;
    var gistID;
    var originalGists = [];
    var lang;
    var i;

    /* get object properties */
    for (i = 0; i < responseObj.length; i++) {

    	/* url of gist */
        descUrl = responseObj[i].html_url;
        console.log(descUrl);

        /* description of gist */
        gistDesc = responseObj[i].description;
        console.log(gistDesc);

        /* create unique id */
        gistID = generateId(i);
        console.log(gistID);

        /* language of gist */
        for (var property in responseObj[i].files) {
            if (responseObj[0].files.hasOwnProperty(property)) {
                if (responseObj[i].files[property].language) {
                    lang = responseObj[i].files[property].language
                }
            }
        }
        
        /* attempt at selecting languages - was not successful
        var langSelect = document.getElementById('python');
        if (langSelect.checked) {
            if (lang === 'Python') {
                originalGists.push(new GistObject(gistDesc, gistID, descUrl, lang));
            }
        }
        langSelect = document.getElementById('json');
        if (langSelect.checked) {
            if (lang === 'JSON') {
                originalGists.push(new GistObject(gistDesc, gistID, descUrl, lang));
            }
        }

        langSelect = document.getElementById('js');
        if (langSelect.checked) {
            if (lang === 'JavaScript') {
                originalGists.push(new GistObject(gistDesc, gistID, descUrl, lang));
            }
        }

        langSelect = document.getElementById('sql');
        if (langSelect.checked) {
            if (lang === 'SQL') {
                originalGists.push(new GistObject(gistDesc, gistID, descUrl, lang));
            }
        } */

        /* create new gist object and add to array */
        originalGists.push(new GistObject(gistDesc, gistID, descUrl, lang));
    }

    /* create unordered list */
    var gistList = document.createElement('ul');

    /* Convert gist object into HTML list item */
    for (i = 0; i < originalGists.length; i++) {
        var newElement = insertHtml(originalGists[i]);

        /* add list item to the unordered list */
        gistList.appendChild(newElement);
    }

    /* dictate where to add the unordered list - in gists */
    var displayGistList = document.getElementById('gists');
    displayGistList.appendChild(gistList);
}

/* function executes when "fetch" button pushed */
function search_gists() {
    var xmlhttp;

    /* generate new request */
    xmlhttp = new XMLHttpRequest();

    /* what to do when request is complete */
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var response = xmlhttp.responseText;

            /* save response in local storage */
            localStorage.setItem('localResponse', response);

            /* parse response */
            loadResponse();
        }
    };

    /* make request */
    var url = "https://api.github.com/gists";
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
}

/* window reload - check favorites list - Piazza */
window.onload = function () {
    var favsString = localStorage.getItem('favs'), favObj;
    /* If storage doesn't exist, create it */
    if( favsString === null ) {
        favsString = {'favList':[]};
        localStorage.setItem('favs', JSON.stringify(favObj));
    }
    /* exists, parse and create HTML elements */
    else {
        favObj = JSON.parse(localStorage.getItem('favs'));
        var favUList = document.createElement('ul');
        for (var i = 0; i < favObj.favList.length; i++) {
            var favItem = insertHtml(favObj.favList[i]);
            favUList.appendChild(favItem);
        }
        /* add elements to a list, add list to HTML document */
        var displayFavs = document.getElementById('favored-gists');
        displayFavs.appendChild(favUList);  
    }
}