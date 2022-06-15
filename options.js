const arkaplanrengi = document.getElementById("arkaplanrengi");
const fontBoyutu = document.getElementById("fontBoyutu");
const cevirilecekDil = document.getElementById("cevirilecekDil");



let settings = chrome.i18n.getMessage("settings");
let arkaplanrengibaslik = chrome.i18n.getMessage("settingSubTitle1");
let fontBoyutubaslik = chrome.i18n.getMessage("settingSubTitle2");
let cevirilecekDilbaslik = chrome.i18n.getMessage("settingSubTitle3");
let translatePanelName = chrome.i18n.getMessage("extensionName");

document.getElementById("translatePanelName").textContent=translatePanelName;
document.getElementById("settings").textContent=settings;
document.getElementById("arkaplanrengibaslik").textContent=arkaplanrengibaslik;
document.getElementById("fontBoyutubaslik").textContent=fontBoyutubaslik;
document.getElementById("cevirilecekDilbaslik").textContent=cevirilecekDilbaslik;
document.getElementById("logo").src = chrome.runtime.getURL("128bgwhite.png");

document.getElementById("version").textContent+=chrome.runtime.getManifest().version;

var languageCode = ["af","sq","am","ar","hy","az","eu","be","bn","bs","bg","ca","ceb","zh-CN","zh-TW","co","hr","cs","da","nl","en","eo","et","fi","fr","fy","gl","ka","de","el","gu","ht","ha","haw","he","hi","hmn","hu","is","ig","id","ga","it","ja","jv","kn","kk","km","rw","ko","ku","ky","lo","lv","lt","lb","mk","mg","ms","ml","mt","mi","mr","mn","my","ne","no","ny","or","ps","fa","pl","pt","pa","ro","ru","sm","gd","sr","st","sn","sd","si","sk","sl","so","es","su","sw","sv","tl","tg","ta","tt","te","th","tr","tk","uk","ur","ug","uz","vi","cy","xh","yi","yo","zu"];
console.log(languageCode.sort())
	languageCode.map((one)=>{

			var option = document.createElement("option");
			option.value = one;
			option.text = chrome.i18n.getMessage("lang_"+one.replace("-","_"))
			cevirilecekDil.add(option);

	});
	

	var gg = document.querySelectorAll("select#cevirilecekDil > option");
	



var hhh = Array.from(gg).sort(function(a,b) {
	return a.text.localeCompare(b.text);
});
console.log(hhh);
hhh.map((i)=>cevirilecekDil.add(i));
var kontrol;

chrome.storage.local.get(null,a=>{
		
		console.log("depo kontrolu yapılıyor "+a.arkaplanrengidepolanacakdeger);
		console.log("depo kontrolu yapılıyor "+a.fontboyutudepolanacakdeger);
		console.log("depo kontrolu yapılıyor "+a.cevirilecelkdildepolanacakdeger);
		kontrol=a.arkaplanrengidepolanacakdeger;
		kontrol1 =a.fontboyutudepolanacakdeger;
		kontrol2 =a.cevirilecelkdildepolanacakdeger
			if(kontrol!=undefined)
			{
				
				console.log("kontrol edildi deger var depoda: "+kontrol);
				
				arkaplanrengi.value=kontrol;
				fontBoyutu.value=kontrol1;
				cevirilecekDil.value=kontrol2;
			}
			else{
				
				console.log("kontrol edildi depoda deger yok varsayılan renk depoya kaydedildi");
				
				var defaultarkarenk =arkaplanrengi.value;
				var defaultFontBoyutu =fontBoyutu.value;
				var defaultCevirilecekDil =cevirilecekDil.value;
				alert("default deger alındı");

				chrome.storage.local.set({
				  "arkaplanrengidepolanacakdeger":defaultarkarenk,
				  "fontboyutudepolanacakdeger" :defaultFontBoyutu,
				  "cevirilecelkdildepolanacakdeger":defaultCevirilecekDil
				 });
				
				
				
			}
			
		
		});		



	arkaplanrengi.addEventListener("change", ()=>{
		
		console.log("degisim algılandı ve gereken ayar yapıldı");
		chrome.storage.local.set({"arkaplanrengidepolanacakdeger":arkaplanrengi.value});
		
		
		});

	fontBoyutu.addEventListener("change", ()=>{
	
		console.log("degisim algılandı ve gereken ayar yapıldı");
		chrome.storage.local.set({"fontboyutudepolanacakdeger":fontBoyutu.value});
		
		
		});

	cevirilecekDil.addEventListener("change", ()=>{
	
		console.log("degisim algılandı ve gereken ayar yapıldı");
		chrome.storage.local.set({"cevirilecelkdildepolanacakdeger":cevirilecekDil.value});
		
		
		});

 