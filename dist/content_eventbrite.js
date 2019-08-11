var EventbriteInject = (function () {
    function EventbriteInject() {
    }
    EventbriteInject.prototype.Main = function () {
        console.log("Kagari loaded");
        var url = window.location.href;
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
        }
        else if (url.match(/checkout-external/)) {
            console.log("loaded from iframe");
            var cardList = document.querySelectorAll(".eds-card-list__item");
            while (cardList.length == 0) {
                cardList = document.querySelectorAll(".eds-card-list__item");
            }
            cardList.forEach(function (card) {
                if (card.textContent.match(/premier/i)) {
                    console.log("hit: " + card.textContent);
                    var sel = card.querySelector("select");
                    sel.value = "1";
                    sel.dispatchEvent(new Event("change", { bubbles: true }));
                    document.querySelector(".eds-btn").click();
                    console.log("Entered checkout page");
                }
            });
        }
    };
    return EventbriteInject;
}());
var ebInject = new EventbriteInject();
ebInject.Main();
//# sourceMappingURL=content_eventbrite.js.map