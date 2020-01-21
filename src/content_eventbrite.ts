class EventbriteInject {
    public Main(): void {
        console.log("Kagari loaded");

        const url = window.location.href;

        if (url.match(/\d+(?=\?|\/)|\d+$/)) {
            if (document.querySelector("#ticket_table") == null) {
                chrome.runtime.sendMessage("refreshStatus", (response) => {
                    switch (response) {
                        case "run":
                        case "burst":
                            window.location.reload(true);
                            break;
                    }
                });
            } else {
                chrome.runtime.sendMessage("refreshStatus", (response) => {
                    if (response == "burst") {
                        const ticketRows = document.querySelectorAll(".ticket_row");
                        ticketRows.forEach(ticket => {
                            const name = ticket.querySelector(".ticket_type_name");
                            if (name != null && name.textContent.match(/premier/)) {
                                const quantitySelect = ticket.querySelector(".ticket_table_select") as HTMLSelectElement;
                                if (quantitySelect != null) {
                                    quantitySelect.value = "1";
                                    quantitySelect.dispatchEvent(new Event("change", { bubbles: true }));
                                }
                            }
                        });
                        const registerBtn = document.querySelector(".cta_container a") as HTMLAnchorElement;
                        registerBtn.click();
                    }
                });
            }
        } else if (url.match(/checkout-external/)) {
            console.log("loaded from iframe");

            let cardList = document.querySelectorAll(".eds-card-list__item");
            while (cardList.length == 0) {
                // Waiting for react to render the dom
                cardList = document.querySelectorAll(".eds-card-list__item");
            }

            cardList.forEach(card => {
                //if (card.textContent.match(/planning to attend both DAys/i)) {
                if (card.textContent.match(/premier/i)) {
                    console.log("hit: " + card.textContent);
                    const sel = card.querySelector("select");
                    sel.value = "1";
                    sel.dispatchEvent(new Event("change", { bubbles: true }));
                    (document.querySelector(".eds-btn") as HTMLButtonElement).click();
                    console.log("Entered checkout page");
                }
            });
        }
    }
}

const ebInject = new EventbriteInject();
ebInject.Main();