var Background = (function () {
    function Background() {
    }
    Background.prototype.Main = function () {
        if (localStorage.getItem("refresh") != "stop" &&
            localStorage.getItem("refresh") != "run" &&
            localStorage.getItem("refresh") != "burst") {
            localStorage.setItem("refresh", "stop");
        }
        chrome.browserAction.setBadgeText({ text: localStorage.getItem("refresh") });
        chrome.browserAction.onClicked.addListener(function () {
            var refreshStatus = localStorage.getItem("refresh");
            switch (refreshStatus) {
                case "stop":
                    localStorage.setItem("refresh", "run");
                    chrome.browserAction.setBadgeText({ text: "run" });
                    break;
                case "run":
                    localStorage.setItem("refresh", "burst");
                    chrome.browserAction.setBadgeText({ text: "burst" });
                    break;
                case "burst":
                    localStorage.setItem("refresh", "stop");
                    chrome.browserAction.setBadgeText({ text: "stop" });
                    break;
            }
        });
        chrome.runtime.onMessage.addListener(function (message, _, response) {
            if (message == "refreshStatus") {
                response(localStorage.getItem("refresh"));
            }
            response("");
        });
    };
    return Background;
}());
var background = new Background();
background.Main();
//# sourceMappingURL=background.js.map