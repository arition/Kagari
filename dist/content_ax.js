var AXInject = (function () {
    function AXInject() {
    }
    AXInject.prototype.Main = function () {
        var _this = this;
        console.log("Kagari loaded");
        var url = window.location.href;
        if (url.match("/register")) {
            console.log("Register Page: Find match url");
            var feeList = document.querySelectorAll(".fee");
            feeList.forEach(function (fee) {
                if (fee.textContent.match(/Premier/i)) {
                    var link = fee.querySelector(".fee-aside a");
                    if (link != null) {
                        if (!_this.ReplaceToIframe(link.href)) {
                            chrome.runtime.sendMessage("refreshStatus", function (response) {
                                switch (response) {
                                    case "run":
                                        window.location.reload();
                                        break;
                                }
                            });
                        }
                    }
                }
            });
        }
    };
    AXInject.prototype.ReplaceToIframe = function (url) {
        console.log("Try replacing iframe: " + url);
        if (url.match(/\d+(?=\?|\/)|\d+$/)) {
            var id = url.match(/\d+(?=\?|\/)|\d+$/)[0];
            var iframe = document.createElement("iframe");
            iframe.src = "https://www.eventbrite.com/checkout-external?eid=" + id +
                "&parent=" + encodeURIComponent(url) + "&modal=1&aff=oddtdteb";
            iframe.id = "eventbrite-widget-modal-" + id;
            iframe.setAttribute("data-automation", "checkout-widget-iframe-" + id);
            iframe.setAttribute("allowtransparency", "true");
            iframe.setAttribute("allowfullscreen", "true");
            iframe.setAttribute("frameborder", "0");
            iframe.style.zIndex = "2147483647";
            iframe.style.position = "fixed";
            iframe.style.top = "0";
            iframe.style.left = "0";
            iframe.style.right = "0";
            iframe.style.bottom = "0";
            iframe.style.margin = "0";
            iframe.style.border = "0";
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            document.querySelector("body").innerHTML = "";
            document.querySelector("body").appendChild(iframe);
            return true;
        }
        return false;
    };
    return AXInject;
}());
var axInject = new AXInject();
//# sourceMappingURL=content_ax.js.map