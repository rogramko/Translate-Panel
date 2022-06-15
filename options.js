const arkaplanrengi = document.getElementById("arkaplanrengi");
const fontBoyutu = document.getElementById("fontBoyutu");
const cevirilecekDil = document.getElementById("cevirilecekDil");

let settings = chrome.i18n.getMessage("settings");
let arkaplanrengibaslik = chrome.i18n.getMessage("settingSubTitle1");
let fontBoyutubaslik = chrome.i18n.getMessage("settingSubTitle2");
let cevirilecekDilbaslik = chrome.i18n.getMessage("settingSubTitle3");
let translatePanelName = chrome.i18n.getMessage("extensionName");

document.getElementById("translatePanelName").textContent = translatePanelName;
document.getElementById("settings").textContent = settings;
document.getElementById("arkaplanrengibaslik").textContent = arkaplanrengibaslik;
document.getElementById("fontBoyutubaslik").textContent = fontBoyutubaslik;
document.getElementById("cevirilecekDilbaslik").textContent = cevirilecekDilbaslik;
document.getElementById("logo").src = chrome.runtime.getURL("128bgwhite.png");

document.getElementById("version").textContent += chrome.runtime.getManifest().version;

var languageCode = ["af", "sq", "am", "ar", "hy", "az", "eu", "be", "bn", "bs", "bg", "ca", "ceb", "zh-CN", "zh-TW", "co", "hr", "cs", "da", "nl", "en", "eo", "et", "fi", "fr", "fy", "gl", "ka", "de", "el", "gu", "ht", "ha", "haw", "he", "hi", "hmn", "hu", "is", "ig", "id", "ga", "it", "ja", "jv", "kn", "kk", "km", "rw", "ko", "ku", "ky", "lo", "lv", "lt", "lb", "mk", "mg", "ms", "ml", "mt", "mi", "mr", "mn", "my", "ne", "no", "ny", "or", "ps", "fa", "pl", "pt", "pa", "ro", "ru", "sm", "gd", "sr", "st", "sn", "sd", "si", "sk", "sl", "so", "es", "su", "sw", "sv", "tl", "tg", "ta", "tt", "te", "th", "tr", "tk", "uk", "ur", "ug", "uz", "vi", "cy", "xh", "yi", "yo", "zu"];
var optionArr = [];
languageCode.forEach((one) => {

	var option = document.createElement("option");
	option.value = one;
	option.text = chrome.i18n.getMessage("lang_" + one.replace("-", "_"))
	optionArr.push(option);

});

var optionArrSort = optionArr.sort(function (a, b) {
	return a.text.localeCompare(b.text);
});

optionArrSort.forEach((i) => cevirilecekDil.add(i));


chrome.storage.local.get(null, a => {


	kontrol1 = a.storageBgColor;
	kontrol2 = a.storageFontSize;
	kontrol3 = a.storageTransLan;

	if (typeof kontrol1 != "undefined" || typeof kontrol2 != "undefined" || typeof kontrol3 != "undefined") {

		arkaplanrengi.value = kontrol1;
		fontBoyutu.value = kontrol2;
		cevirilecekDil.value = kontrol3;
	}
	else {

		var defaultarkarenk = arkaplanrengi.value;
		var defaultFontBoyutu = fontBoyutu.value;
		var defaultCevirilecekDil = cevirilecekDil.value;

		chrome.storage.local.set({
			"storageBgColor": defaultarkarenk,
			"storageFontSize": defaultFontBoyutu,
			"storageTransLan": defaultCevirilecekDil
		});



	}


});



arkaplanrengi.addEventListener("change", () => {


	chrome.storage.local.set({ "storageBgColor": arkaplanrengi.value });


});

fontBoyutu.addEventListener("change", () => {


	chrome.storage.local.set({ "storageFontSize": fontBoyutu.value });


});

cevirilecekDil.addEventListener("change", () => {


	chrome.storage.local.set({ "storageTransLan": cevirilecekDil.value });


});

