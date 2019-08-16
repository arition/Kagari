var EventbriteInject = (function () {
    function EventbriteInject() {
    }
    EventbriteInject.prototype.Main = function () {
        console.log("Kagari loaded");
        var url = window.location.href;
        if (url.match(/\d+(?=\?|\/)|\d+$/)) {
            if (document.querySelector("#ticket_table") == null) {
                chrome.runtime.sendMessage("refreshStatus", function (response) {
                    switch (response) {
                        case "run":
                        case "burst":
                            window.location.reload(true);
                            break;
                    }
                });
            }
            else {
                chrome.runtime.sendMessage("refreshStatus", function (response) {
                    if (response == "burst") {
                        var ticketRows = document.querySelectorAll(".ticket_row");
                        ticketRows.forEach(function (ticket) {
                            var name = ticket.querySelector(".ticket_type_name");
                            if (name != null && name.textContent.match(/premier/)) {
                                var quantitySelect = ticket.querySelector(".ticket_table_select");
                                if (quantitySelect != null) {
                                    quantitySelect.value = "1";
                                    quantitySelect.dispatchEvent(new Event("change", { bubbles: true }));
                                }
                            }
                        });
                        var registerBtn = document.querySelector(".cta_container a");
                        registerBtn.click();
                    }
                });
            }
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