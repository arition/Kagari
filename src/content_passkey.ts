class PasskeyInject {
    public Main(): void {
        console.log("Kagari loaded");

        const url = window.location.href;
        if (document.querySelector('.res-not-allowed') != null) {
            chrome.runtime.sendMessage("refreshStatus", (response) => {
                switch (response) {
                    case "run":
                        window.location.reload();
                        break;
                }
            });
        }
    }
}

const passkeyInject = new PasskeyInject();
passkeyInject.Main();