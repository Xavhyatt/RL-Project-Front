let home = document.getElementById("main");
let findUs = document.getElementById("findus");
let potw = document.getElementById("pickOfTheWeek");

$(document).ready(function () {
    $('#results').DataTable({
    "scrollY": "50vh",
    "scrollCollapse": true,
    });
    $('.dataTables_length').addClass('bs-select');
    });

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("toTop").style.display = "block";
    } else {
        document.getElementById("toTop").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


function showHome() {
    window.location.hre = "Blockbuster.html";
    findUs.style.display = "none";
    home.style.display = "block";
	
}

function showFindUs() {

    home.style.display = "none";
    findUs.style.display = "block";
	potw.style.display = "none"

}

function showLogIn() {
    document.getElementById("accountAccess").style.display = "none";
    document.getElementById("accountAccessLog").style.display = "block";
}

function showPickOfTheWeek(){
	
	let potw = document.getElementById("pickOfTheWeek");
    if (potw.style.display === "none") {
        potw.style.display = "block";
    }
    else {
        potw.style.display = "none";
    }
	document.getElementById("allFilmList").style.display = "none";
	let potwInfo = "http://www.omdbapi.com/?apikey=50d432c1&i=tt1133985&plot=full";
	
	 let request = new XMLHttpRequest();
    request.open("GET", potwInfo);
    request.responseType = "json";
    request.send();
	request.onload = function () {
        let starFilm = request.response;
		 
	
	console.log(starFilm);
	document.getElementById("potw Title").innerHTML = starFilm.Title;
	document.getElementById("Rating").innerHTML = "Rated: " + starFilm.Rated;
	document.getElementById("actors").innerHTML = "Starring: " + starFilm.Actors;
	document.getElementById("plot").innerHTML = "Plot: " + starFilm.Plot;
	
	
	}
}


var movies = [];
var srcRes = [];



function filmList() {
	
	
    let filmList = document.getElementById("allFilmList");
    if (filmList.style.display === "none") {
        filmList.style.display = "block";
    }
    else {
        filmList.style.display = "none";
    }
	document.getElementById("pickOfTheWeek").style.display = "none";
    loadFilms("search");
}


function loadFilms(a) {
    let srcReq;
    if (a == "search") {
        srcReq = document.getElementById("search").value;
    }
    if (a == "qSearch") {
        srcReq = document.getElementById("myInput").value;
    }
    var ratingFilter = document.getElementById("ratingSelect").value;


    let requestURL;

    if (srcReq == "" && ratingFilter == "All") {
        requestURL = "http://192.168.1.106:8080/api/film";
    }
    if(ratingFilter=="All"){
        requestURL = "http://192.168.1.106:8080/api/film/" + srcReq + "&";
    }
    else {
        requestURL = "http://192.168.1.106:8080/api/film/" + srcReq + "&" + ratingFilter;
    }

    let request = new XMLHttpRequest();
    request.open("GET", requestURL);
    request.responseType = "json";
    request.send();
    request.onload = function () {
        let films = request.response;
        createTable(films);
    }

    function createTable(films) {

        // EXTRACT VALUE FOR HTML HEADER. 
        // ('Book ID', 'Book Name', 'Category' and 'Price')
        var col = [];
        for (var i = 1; i < films.length; i++) {
            for (var key in films[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");
        table.setAttribute("id","results");
        table.setAttribute("class", "resultsC");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 1; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 1; i < films.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 1; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = films[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);

        if (films.length == 0) {
            document.getElementById("message").innerHTML = "No Film Found!";
        } else {
			    document.getElementById("message").innerHTML = "";
		}
		
    }
}

function buttonOn1(){

	document.getElementById("card1Btn").style.background="green";
	document.getElementById("card1Btn").style.color="white";
}
function buttonOff1(){
	document.getElementById("card1Btn").style.background="white";
	document.getElementById("card1Btn").style.color="green";
}

function buttonOn2(){

	document.getElementById("card3Btn").style.background="red";
	document.getElementById("card3Btn").style.color="white";
}
function buttonOff2(){
	document.getElementById("card3Btn").style.background="white";
	document.getElementById("card3Btn").style.color="red";
}

function goToGame(){
	showHome();
		potw.style.display = "none"
    document.getElementById("allFilmList").style.display = "none";
    document.getElementById("welcome").innerHTML = "Blockbuster Game";
    document.getElementById("welcome1").innerHTML = "Find what we have in stock for all Gaming Platforms!";
    document.getElementById("caro1").setAttribute("src" , "CP2077.jpg");
    document.getElementById("caro2").setAttribute("src" , "starfield.jpg");
    document.getElementById("caro3").setAttribute("src" , "hitman.jpg");
    document.getElementById("caro4").setAttribute("src" , "anthem.jpg");
    document.getElementById("card1Title").innerHTML = "Xbox";
    document.getElementById("card2Title").innerHTML = "Playstation";
    document.getElementById("card3Title").innerHTML = "Nintendo";
    document.getElementById("card1Img").setAttribute("src", "xbox.png");
    document.getElementById("card1Img").setAttribute("width", "auto");
    document.getElementById("card2Img").setAttribute("src", "PS.png");
    document.getElementById("card3Img").setAttribute("src", "nintendo.png");

    document.getElementById("card1Btn").innerHTML = "Browse Xbox";
    document.getElementById("card2Btn").innerHTML = "Browse Playstation";
    document.getElementById("card3Btn").innerHTML = "Browse Nintendo";
 
	
	//document.getElementById("card1Btn").style.background="green";
	document.getElementById("card1Btn").style.color="green";
	document.getElementById("card1Btn").style.borderColor="green";
   document.getElementById("card1Btn").setAttribute("onmouseenter" , "buttonOn1()");
	document.getElementById("card1Btn").setAttribute("onmouseleave" , "buttonOff1()");
	
		document.getElementById("card2Btn").setAttribute("onclick" , "");
	//document.getElementById("card3Btn").style.background="red";
	document.getElementById("card3Btn").style.color="red";
	document.getElementById("card3Btn").style.borderColor="red";
	document.getElementById("card3Btn").setAttribute("onmouseenter" , "buttonOn2()");
	document.getElementById("card3Btn").setAttribute("onmouseleave" , "buttonOff2()");
		document.getElementById("card3Btn").setAttribute("onclick" , "");
}

$(document).ready(function () {
    $('#dtDynamicVerticalScrollExample').DataTable({
    "scrollY": "50vh",
    "scrollCollapse": true,
    });
    $('.dataTables_length').addClass('bs-select');
    });