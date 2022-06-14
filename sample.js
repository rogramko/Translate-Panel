


var secilendeger;


function onClickHandler(info, tab) {
	
	secilendeger=info.selectionText;
	
	var secilenMetin =info.selectionText;
	var pdfUzantiliSekmeninId;
	
//sekmenin active ozelligi false ise calistir (pdf uzantili sayfalarda false oluyor bu ozellik ve birde sekme id sini almak icin tabs.query kullanmamiz gerekiyor)	
if(tab.active==false)
{
	//active ozelligi true olan sekmeleri seciyoruz
	chrome.tabs.query({ active:true}, function (tabs) {
		
   pdfUzantiliSekmeninId=tabs[0].id;
  
  chrome.tabs.sendMessage(pdfUzantiliSekmeninId,{yollanacakMesaj:"contextMenuPDFPage",seciliMetinDegeri:secilenMetin});
  
});
	
	alert("blok calisti");
	console.log("tab önce: " + JSON.stringify(tab));
	chrome.tabs.update({active:true,highlighted:true,selected:true});
	console.log("tab sonra: " + JSON.stringify(tab));
}
//sekmenin active ozelligi false degilse calistir (normal web sayfalarinda true oluyor bu ozellik ve sekme id almak icin tabs.query gerekmez direk onclickhandlerden alabiliriz)
else{
	
	 console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
	console.log("BURASI: " + info.selectionText);
	console.log("tab id burasi: " + tab.id);
		
	
	chrome.tabs.sendMessage(tab.id,{yollanacakMesaj:"contextMenuHTMLPage",seciliMetinDegeri:secilenMetin}); 

 
	
}	 
		
  
};

chrome.contextMenus.onClicked.addListener(onClickHandler); //context menuye bir tiklama oldugunda onClickHandler metodunu calistir

// eklenti yuklenirken context menuye eleman ekliyoruz
chrome.runtime.onInstalled.addListener(function() {
	
  chrome.runtime.openOptionsPage();
  chrome.contextMenus.create({"title": "secili yaziyi cevir", "id": "seciliyaziyicevir", "contexts":["selection"]});
  
  
  
});






















