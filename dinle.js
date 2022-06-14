 
 //rgb(215, 193, 70);
//rgb(9,235,251) 141,49,216    205,54,4   252,85,29   194,178,187   209,61,61   rgb(172,56,17)   #31d8c4  #EEF218  rgb(112 62 229)



var getArkaplanRengi;
var getFontBoyutu; 
var getCevirilecekDil;

chrome.storage.local.get(null,a=>{
		
	console.log("kayitli arkaplan rengi: "+a.arkaplanrengidepolanacakdeger);
	console.log("kayitli font boyutu: "+a.fontboyutudepolanacakdeger);
	console.log("kayitli cevirilecek dil kodu "+a.cevirilecelkdildepolanacakdeger);
			
	 getArkaplanRengi = a.arkaplanrengidepolanacakdeger;
	 getFontBoyutu = a.fontboyutudepolanacakdeger;
	 getCevirilecekDil = a.cevirilecelkdildepolanacakdeger;

})

 

  console.log("burası dinle.js ");
  
  var xmlhttp; 
 
  let selection="";
  let eskiselection="";
  var element;
  var ceviripaneli;
  var ceviributonu;
  var xKonumTiklanildigindaki; 
  var yKonumTiklanildigindaki;


document.addEventListener("mouseup", onMouseup);



 function onMouseup(e) {
	 
	

        if (e.button != 0) {return;} //tiklanilan farenin sag tusu ise hicbirsey yapma
        if (e.target == element) {return;} // tiklanilan nesne element ise hicbirsey yapma
        
        setTimeout(()=>onUp(e), 120); // kosullar gecildi ise asil yapacagimiz isi 120 milisaniye sonra calistir
    }
	
	
	function onUp(e) {
        
        

         xKonumTiklanildigindaki = e.clientX  // farenin x konumu alindi
         yKonumTiklanildigindaki = e.clientY  // farenin y konumu alindi

        
            init();
       
	   if(selection!="")
	   {
			
            ceviributonu.style.left = xKonumTiklanildigindaki + 10 + "px"; // ceviri butonu konumunu ayarla
            ceviributonu.style.top =  yKonumTiklanildigindaki - 20 + "px"; // ceviri butonu konumunu ayarla
            ceviributonu.style.top =  yKonumTiklanildigindaki - 20 + "px";
            ceviributonu.style.display = "block"; //secim bos bir dize degilse yani bir secim yapılmıs ise ceviri butonunu goster
	   }
		
        
    }








    function init() {
        if (element) {return;} //elementimiz varsa birdaha olusturma yani hicbirsey yapma ama yoksa olustur
		
		
        element = document.createElement("div");
		element.id="translatePanel";
	    document.body.appendChild(element);
        shadowRoot = element.attachShadow({mode: "closed"});
		
		ceviripaneli =document.createElement("div");
		ceviripaneli.id="ceviripaneli";
		ceviripaneli.style.backgroundColor = getArkaplanRengi;
	    shadowRoot.appendChild(ceviripaneli);

		ceviributonu =document.createElement("div");
		ceviributonu.id="ceviributonu";
	    shadowRoot.appendChild(ceviributonu);
		
		shadowrootStyle=document.createElement("style");
		shadowRoot.appendChild(shadowrootStyle);
		shadowrootStyle.innerHTML=`
		
				 
		#ceviributonu {
					
					
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

              #ceviripaneli 
			  {
				  
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
		

        ceviributonu.addEventListener("click", onClick); // ceviri butonuna tiklanirsa onclick adli metodu calistir
        document.addEventListener("mousedown", onDown);  // dokumanda herhangi biryere tiklanildigi anda ondown metodunu calsitir
		dragElement(ceviripaneli);
    }
	
	    
	
	
	
	function dragElement(elmnt) {
		
		
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  

  function dragMouseDown(e) {
	 
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
		
	
	

	
	 function onClick(e) {
       
 	 alert(e);
	/*	 
		 var xmlhttp = new XMLHttpRequest();
			
							var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=tr&dt=t&dt=bd&dj=1&q="+eskiselection;
							
							xmlhttp.onreadystatechange = function() {
							 
							  if (this.readyState == 4 && this.status == 200) {
								  console.log(xmlhttp.getResponseHeader('Content-Type'));
								 var cevirilenJsonveri = JSON.parse(this.responseText);
							     
								 gelenJsonCevabiDuzenle(cevirilenJsonveri);
							       
								
							  }
							 
							  xmlhttp.onerror= function(e) {
								    
									
									alert("Error fetching " );
									}
							  
							};


							xmlhttp.open("GET", url, true);

							xmlhttp.setRequestHeader("Content-type", "text/plain; charset=utf-8");

							xmlhttp.send();
		 
		 */


						if(typeof e == "string")	
						{
							eskiselection=e;
						}
		     		 
		var sozver = new Promise((resolve,reject)=>{
			
			
							xmlhttp = new XMLHttpRequest();
							
							var urlEncodingSelection = encodeURIComponent(eskiselection);
							var url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${getCevirilecekDil}&dt=t&dt=bd&dj=1&q=`+urlEncodingSelection;
							
							xmlhttp.onreadystatechange = function() {
							 
							  if (this.readyState == 4 && this.status == 200) {
								  console.log(xmlhttp.getResponseHeader('Content-Type'));
								 var cevirilenJsonveri = JSON.parse(this.responseText);
							     
								 resolve(cevirilenJsonveri);
							       
								
							  }
							  if(this.readyState == 4 && this.status > 200)
							  {
								  reject("hata ! "+this.status);
							  }
							  xmlhttp.onerror= function(e) {
								    
									reject("Hata ! servis limiti doldu biraz bekleyin"+this.status);
									alert("Error fetching "+this.status );
									}
							  
							};


							xmlhttp.open("GET", url, true);

							xmlhttp.setRequestHeader("Content-type", "text/plain; charset=utf-8");

							xmlhttp.send();
			
									
		}); // promise bitti 
			
		sozver.then(resolveValue =>
		{
			gelenJsonCevabiDuzenle(resolveValue);
		},
		rejectValue =>
		{

			if(typeof e != "string" && typeof e != "undefined")
								{					console.log("HTML SAYFASI BUTONDAN  CEVİRİ ");
									ceviripaneli.textContent =rejectValue;
									ceviripaneli.style.display = "block";
									ceviributonu.style.display = "none";			
									ceviripaneli.style.left = e.clientX + 10 + "px";
									ceviripaneli.style.top = e.clientY - 20 + "px";
								}
								else if(typeof e == "string")
								{
									console.log("PDF SAYFASI CONTEXT MENDUEN CEVİRİ");
									panelPDF.textContent = rejectValue;
									panelPDF.style.display = "block";
								}
								else
								{	
									console.log("HTML SAYFASI CONTEXT MENDUEN CEVİRİ ");
									ceviripaneli.textContent =rejectValue;
									ceviripaneli.style.display = "block";
									ceviributonu.style.display = "none";
									ceviripaneli.style.left = xKonumTiklanildigindaki + 10 + "px";
									ceviripaneli.style.top  = yKonumTiklanildigindaki - 20 + "px";
								}


		}
		);
								
							
							//json veriyi duzenle
							function gelenJsonCevabiDuzenle(duzenlenecekJson)
							{
																
								var ceviriduzenlendi="";
														
								for(var i=0;i<duzenlenecekJson.sentences.length;i++)
								{
									
									// ceviriduzenlendi +=duzenlenecekJson.sentences[i].trans;
									
									duzenlenecekJson.sentences[i].trans.split(/(\n)/g).map((bir,iki,uc)=>{
									
												if(bir.match(/(\n)/g))
												{
													bir="<br>";
													ceviriduzenlendi+=bir;
												}
												else{
													
													ceviriduzenlendi+=bir;
												}
									
									
									
											})
																
								}
			
								if(duzenlenecekJson.dict)
								{
									for(var i=0;i<duzenlenecekJson.dict.length;i++)
									{
										ceviriduzenlendi +="<br>"+duzenlenecekJson.dict[i].pos+": "+duzenlenecekJson.dict[i].terms.join(", ");
										
									}
								}
								
																						
								
								if(typeof e != "string" && typeof e != "undefined")
								{					console.log("HTML SAYFASI BUTONDAN  CEVİRİ ");
									ceviripaneli.innerHTML = ceviriduzenlendi;
									ceviripaneli.style.display = "block";
									ceviributonu.style.display = "none";			
									ceviripaneli.style.left = e.clientX + 10 + "px";
									ceviripaneli.style.top = e.clientY - 20 + "px";
								}
								else if(typeof e == "string")
								{
									console.log("PDF SAYFASI CONTEXT MENDUEN CEVİRİ");
									panelPDF.innerHTML = ceviriduzenlendi;
									panelPDF.style.display = "block";
								}
								else
								{	
									console.log("HTML SAYFASI CONTEXT MENDUEN CEVİRİ ");
									ceviripaneli.innerHTML = ceviriduzenlendi;
									ceviripaneli.style.display = "block";
									ceviributonu.style.display = "none";
									ceviripaneli.style.left = xKonumTiklanildigindaki + 10 + "px";
									ceviripaneli.style.top  = yKonumTiklanildigindaki - 20 + "px";
								}
							}
							//json veriyi duzenleme bitti
		
    }
	
	
	
		  document.onselectionchange = function() {
           selection = document.getSelection();
  
		   if(selection=="")
		   {
			   return;
		   }
		   else{
			   
			      eskiselection="";
			       eskiselection += selection;	
		   }
			 
          	 
		   	 
  }
		

	
	   function onDown(e) {
        if (e.target != element)
			{
            ceviripaneli.style.display = "none";
            ceviributonu.style.display = "none";
           
        }
				
    }
	
	
	
  /*    ----------------   WEB SAYFA CEVİRİ İSLEMLERİ BİTTİ      ----------------      */	
  /*    ----------------   PDF SAYFA CEVİRİ İSLEMLERİ BASLADİ    ----------------      */	
	

  
  chrome.runtime.onMessage.addListener((mesaj, sender, sendResponse)=> {
	  
	     if(mesaj.yollanacakMesaj=="contextMenuHTMLPage")
			 
		 {
			  onClick();
			 
		 } 
		 else if (mesaj.yollanacakMesaj=="contextMenuPDFPage") {
			 
			  init2();
			  onClick(mesaj.seciliMetinDegeri);
			 
		 }
	  
         
});
  
  
  
  
  
  var element2;
  var panelPDF;
  
  function init2() {
	  
	  
        if (element2) { return}
		
        element2 = document.createElement("div");
		element2.id="translatePanel";
        shadowRoot2 = element2.attachShadow({mode: "closed"});

        shadowRoot2.innerHTML = `
          <style>
             		

			#panelPDF {

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

        document.body.appendChild(element2);
		
		chrome.storage.local.get("arkaplanrengidepolanacakdeger",
			 function renkgetirdepodan(geldi){
				 
				panelPDF.style.backgroundColor = geldi.arkaplanrengidepolanacakdeger;
			
			
			})
		
		dragElement(panelPDF);

		window.addEventListener("dblclick",kapat);
		
		
		function kapat(e)
		{
			panelPDF.style.display="none";
			
		}
		
		
		
      
    }
  



   chrome.storage.onChanged.addListener(function(list, sync) {

	        console.log(list);
   
		
	chrome.storage.local.get(null,a=>{
		
			console.log("storage onchanged icinden local get ile deger getirildi "+a.arkaplanrengidepolanacakdeger);
			console.log("storage onchanged icinden local get ile deger getirildi "+a.fontboyutudepolanacakdeger);
			console.log("storage onchanged icinden local get ile deger getirildi "+a.cevirilecelkdildepolanacakdeger);
					getArkaplanRengi =a.arkaplanrengidepolanacakdeger;
					getCevirilecekDil =a.cevirilecelkdildepolanacakdeger;
					getFontBoyutu =a.fontboyutudepolanacakdeger;
		
			console.log(getCevirilecekDil);
			//ceviripaneli.style.backgroundColor =	getArkaplanRengi;
			//ceviripaneli.style.fontSize        =	getFontBoyutu;
			panelPDF.style.backgroundColor     = 	getArkaplanRengi;
			panelPDF.style.fontSize			   =	getFontBoyutu;
	
	})
   
  
   })
   
	