

var getBackgroundColor;
var getFontSize;
var getTranlateLanguage;

chrome.storage.local.get(null, a => {

	getBackgroundColor = a.arkaplanrengidepolanacakdeger;
	getFontSize = a.fontboyutudepolanacakdeger;
	getTranlateLanguage = a.cevirilecelkdildepolanacakdeger;

})


var xmlhttp;
let selection = "";
let eskiselection = "";
var element;
var ceviripaneli;
var ceviributonu;
var xKonumTiklanildigindaki;
var yKonumTiklanildigindaki;


document.addEventListener("mouseup", onMouseup);



function onMouseup(e) {

	if (e.button != 0) { return; }
	if (e.target == element) { return; }

	setTimeout(() => onUp(e), 120);
}


function onUp(e) {

	xKonumTiklanildigindaki = e.clientX
	yKonumTiklanildigindaki = e.clientY


	init();

	if (selection != "") {

		ceviributonu.style.left = xKonumTiklanildigindaki + 10 + "px";
		ceviributonu.style.top = yKonumTiklanildigindaki - 20 + "px"
		ceviributonu.style.display = "block";
	}


}


function init() {
	if (element) { return; }


	element = document.createElement("div");
	element.id = "translatePanel";
	document.body.appendChild(element);
	shadowRoot = element.attachShadow({ mode: "closed" });

	ceviripaneli = document.createElement("div");
	ceviripaneli.id = "ceviripaneli";
	ceviripaneli.style.backgroundColor = getBackgroundColor;
	shadowRoot.appendChild(ceviripaneli);

	ceviributonu = document.createElement("div");
	ceviributonu.id = "ceviributonu";
	shadowRoot.appendChild(ceviributonu);

	shadowrootStyle = document.createElement("style");
	shadowRoot.appendChild(shadowrootStyle);
	shadowrootStyle.innerHTML = `
		
				 
		#ceviributonu{

                  z-index: 999999999;
                  position:fixed;
                  background-repeat: no-repeat;
                  background-size: cover;
                  background-image: url(${chrome.runtime.getURL("yeni128arkabeyaz.png")});
                  width: 25px;
                  height: 25px;
                  cursor: pointer;
                  display: none;
				  border:1px solid #dedede;
				  border-radius:50px;
              }
			  #ceviributonu:hover{

				  border-color:#3191F7;
			  }

              #ceviripaneli{
				  
                   z-index: 999999999;
                   position:fixed;
                   border-radius: 10px;                                              
                   color: #000;              
				   float:left; 
				   max-width:264px;
				   max-height: 100%;				   
				   padding:18px;
                   cursor:move;				   				  						  
				   display: none;					   
				   font-family: "Segoe UI", "San Francisco", "Ubuntu", "Fira Sans", "Roboto", "Arial", "Helvetica", sans-serif !important;
				   text-align: left;
				   overflow-wrap: break-word;
				   width: max-content;
			       height: max-content;	
				   line-height: 150%;
                   font-size: 13px;
                   font-weight: 500;
				}`;


	ceviributonu.addEventListener("click", onClick);
	document.addEventListener("mousedown", onDown);
	dragElement(ceviripaneli);
}


function onDown(e) {
	if (e.target != element) {

		ceviripaneli.style.display = "none";
		ceviributonu.style.display = "none";
	}

}

function onClick(e) {

	alert(e);



	if (typeof e == "string") {
		eskiselection = e;
	}

	var sozver = new Promise((resolve, reject) => {


		xmlhttp = new XMLHttpRequest();

		var urlEncodingSelection = encodeURIComponent(eskiselection);
		var url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${getTranlateLanguage}&dt=t&dt=bd&dj=1&q=` + urlEncodingSelection;

		xmlhttp.onreadystatechange = function () {

			if (this.readyState == 4 && this.status == 200) {
				console.log(xmlhttp.getResponseHeader('Content-Type'));
				var cevirilenJsonveri = JSON.parse(this.responseText);

				resolve(cevirilenJsonveri);


			}
			if (this.readyState == 4 && this.status > 200) {
				reject("hata ! " + this.status);
			}
			xmlhttp.onerror = function (e) {

				reject("Hata ! servis limiti doldu biraz bekleyin" + this.status);
				alert("Error fetching " + this.status);
			}

		};


		xmlhttp.open("GET", url, true);

		xmlhttp.setRequestHeader("Content-type", "text/plain; charset=utf-8");

		xmlhttp.send();


	});

	sozver.then(resolveValue => {
		gelenJsonCevabiDuzenle(resolveValue);
	},
		rejectValue => {

			if (typeof e != "string" && typeof e != "undefined") {

				ceviributonu.style.display = "none";
				ceviripaneli.textContent = rejectValue;
				ceviripaneli.style.display = "block";
				ceviripaneli.style.left = e.clientX + 10 + "px";
				ceviripaneli.style.top = e.clientY - 20 + "px";
			}
			else if (typeof e == "string") {

				panelPDF.textContent = rejectValue;
				panelPDF.style.display = "block";
			}
			else {

				ceviributonu.style.display = "none";
				ceviripaneli.textContent = rejectValue;
				ceviripaneli.style.display = "block";
				ceviripaneli.style.left = xKonumTiklanildigindaki + 10 + "px";
				ceviripaneli.style.top = yKonumTiklanildigindaki - 20 + "px";
			}


		}
	);



	function gelenJsonCevabiDuzenle(duzenlenecekJson) {

		var ceviriduzenlendi = "";

		for (var i = 0; i < duzenlenecekJson.sentences.length; i++) {



			duzenlenecekJson.sentences[i].trans.split(/(\n)/g).map((bir, iki, uc) => {

				if (bir.match(/(\n)/g)) {
					bir = "<br>";
					ceviriduzenlendi += bir;
				}
				else {

					ceviriduzenlendi += bir;
				}



			})

		}

		if (duzenlenecekJson.dict) {
			for (var i = 0; i < duzenlenecekJson.dict.length; i++) {
				ceviriduzenlendi += "<br>" + duzenlenecekJson.dict[i].pos + ": " + duzenlenecekJson.dict[i].terms.join(", ");

			}
		}



		if (typeof e != "string" && typeof e != "undefined") {
			console.log("HTML SAYFASI BUTONDAN  CEVİRİ ");
			ceviripaneli.innerHTML = ceviriduzenlendi;
			ceviripaneli.style.display = "block";
			ceviributonu.style.display = "none";
			ceviripaneli.style.left = e.clientX + 10 + "px";
			ceviripaneli.style.top = e.clientY - 20 + "px";
		}
		else if (typeof e == "string") {
			console.log("PDF SAYFASI CONTEXT MENDUEN CEVİRİ");
			panelPDF.innerHTML = ceviriduzenlendi;
			panelPDF.style.display = "block";
		}
		else {
			console.log("HTML SAYFASI CONTEXT MENDUEN CEVİRİ ");
			ceviripaneli.innerHTML = ceviriduzenlendi;
			ceviripaneli.style.display = "block";
			ceviributonu.style.display = "none";
			ceviripaneli.style.left = xKonumTiklanildigindaki + 10 + "px";
			ceviripaneli.style.top = yKonumTiklanildigindaki - 20 + "px";
		}
	}


}



function dragElement(elmnt) {


	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;


	elmnt.onmousedown = dragMouseDown;


	function dragMouseDown(e) {

		e = e || window.event;
		e.preventDefault();

		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;

		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();

		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;

		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

	}

	function closeDragElement() {

		document.onmouseup = null;
		document.onmousemove = null;
	}
}




document.onselectionchange = function () {
	selection = document.getSelection();

	if (selection == "") {
		return;
	}
	else {

		eskiselection = "";
		eskiselection += selection;
	}
}


chrome.runtime.onMessage.addListener((mesaj, sender, sendResponse) => {

	if (mesaj.yollanacakMesaj == "contextMenuHTMLPage") {
		onClick();

	}
	else if (mesaj.yollanacakMesaj == "contextMenuPDFPage") {

		init2();
		onClick(mesaj.seciliMetinDegeri);

	}


});


var element2;
var panelPDF;

function init2() {


	if (element2) { return }

	element2 = document.createElement("div");
	element2.id = "translatePanel";
	shadowRoot2 = element2.attachShadow({ mode: "closed" });

	shadowRoot2.innerHTML = `
          <style>
             		

		#panelPDF{

			z-index: 999999999;
			position:fixed;
			border-radius: 10px;
			color: #000;
			float:left;
			max-width:264px;
			max-height: 100%;
			padding:18px;
			cursor:move;
			display:none;
			font-family: "Segoe UI";
			text-align: left;	
			overflow-wrap: break-word;	   
			width: max-content;
			height: max-content;				
			line-height: 150%;
			font-size: 13px;
			font-weight: 500;			
			top: 0px;
			left: 0px;
		}

            
          </style>
      
          <div id="panelPDF"></div>`;

	panelPDF = shadowRoot2.getElementById("panelPDF");
	panelPDF.style.backgroundColor = getBackgroundColor;
	document.body.appendChild(element2);

	dragElement(panelPDF);

	window.addEventListener("dblclick", kapat);


	function kapat(e) {
		panelPDF.style.display = "none";

	}

}

chrome.storage.onChanged.addListener(function (list, sync) {


	chrome.storage.local.get(null, a => {

		getBackgroundColor = a.arkaplanrengidepolanacakdeger;
		getTranlateLanguage = a.cevirilecelkdildepolanacakdeger;
		getFontSize =a.fontboyutudepolanacakdeger;
		ceviripaneli.style.backgroundColor = getBackgroundColor;
		ceviripaneli.style.fontSize = getFontSize;
		panelPDF.style.backgroundColor = getBackgroundColor;
		panelPDF.style.fontSize = getFontSize;

	})



})

