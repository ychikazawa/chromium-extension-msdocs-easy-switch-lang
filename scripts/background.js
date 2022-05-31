chrome.action.onClicked.addListener(function(tab) {
    if (tab.url.includes("https://docs.microsoft.com/")) {
        var currentLang = tab.url.split("/")[3];
        var newLang = currentLang=="ja-jp" ? "en-us" : "ja-jp";
        var newUrl = tab.url.replace(currentLang, newLang);

        chrome.tabs.update(tab.id, {
            url: newUrl
        });
    }
});