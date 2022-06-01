var langIndex = 0;

/***
 * Switch the language of the page
 */
chrome.action.onClicked.addListener(function(tab) {
    if (tab.url.includes("https://docs.microsoft.com/")) {
        var currentLang = tab.url.split("/")[3];  // ja-jp, en-us
        var uiLang = chrome.i18n.getUILanguage();  // ja, en-us
        
        var newLang = "";
        if (uiLang == "en-US") {
            // If the current language is English, switch to AcceptLanguages in order.
            chrome.i18n.getAcceptLanguages(function(langs) {
                langIndex = langIndex+1 < langs.length ? langIndex+1 : 0;
                newLang = langs[langIndex];
                console.log(langIndex + ": " + newLang);

                switchToNewLang(tab, currentLang, newLang);
            });
        } else {
            // If the current language is not English, switch to UILanguage of browser.
            newLang = currentLang.includes(uiLang) ? "en-us" : uiLang;
            switchToNewLang(tab, currentLang, newLang);
        }
    }
});

/***
 * Load new page with new language
 */
function switchToNewLang(tab, currentLang, newLang) {
    console.log("Switching language from " + currentLang + " to " + newLang);
    var newUrl = tab.url.replace(currentLang, newLang);
    
    chrome.tabs.update(tab.id, {
        url: newUrl
    });
}