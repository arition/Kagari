class Background {
    public Main(): void {
        if (localStorage.getItem("refresh") != "stop" && localStorage.getItem("refresh") != "run") {
            localStorage.setItem("refresh", "stop");
        }

        chrome.browserAction.setBadgeText({ text: localStorage.getItem("refresh") });

        chrome.browserAction.onClicked.addListener(() => {
            const refreshStatus = localStorage.getItem("refresh");
            switch (refreshStatus) {
                case "stop":
                    localStorage.setItem("refresh", "run");
                    chrome.browserAction.setBadgeText({ text: "run" });
                    break;
                case "run":
                    localStorage.setItem("refresh", "stop");
                    chrome.browserAction.setBadgeText({ text: "stop" });
                    break;
            }
        });

        chrome.runtime.onMessage.addListener((message, _, response) => {
            if (message as string == "refreshStatus") {
                response(localStorage.getItem("refresh"));
            }
            response("");
        });
    }
}

const background = new Background();
background.Main();