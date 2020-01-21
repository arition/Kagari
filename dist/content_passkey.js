var PasskeyInject = (function () {
    function PasskeyInject() {
    }
    PasskeyInject.prototype.Main = function () {
        console.log("Kagari loaded");
        var url = window.location.href;
        if (document.querySelector('.res-not-allowed') != null) {
            chrome.runtime.sendMessage("refreshStatus", function (response) {
                switch (response) {
                    case "run":
                        window.location.reload();
                        break;
                }
            });
        }
    };
    return PasskeyInject;
}());
var passkeyInject = new PasskeyInject();
passkeyInject.Main();
//# sourceMappingURL=content_passkey.js.map