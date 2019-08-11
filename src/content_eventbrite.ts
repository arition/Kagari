class EventbriteInject {
    public Main(): void {
        console.log("Kagari loaded");

        const url = window.location.href;

        if (url.match(/\d+(?=\?|\/)|\d+$/)) {
            const id = url.match(/\d+(?=\?|\/)|\d+$/)[0];
            const iframe = document.createElement("iframe");

            iframe.src = "https://www.eventbrite.com/checkout-external?eid=" + id +
                "&parent=" + encodeURIComponent(url) + "&modal=1&aff=oddtdteb";

            // Add id to iframe so we find and delete it when the user closes the modal
            iframe.id = "eventbrite-widget-modal-" + id;

            iframe.setAttribute("data-automation", "checkout-widget-iframe-" + id);
            iframe.setAttribute("allowtransparency", "true");
            iframe.setAttribute("allowfullscreen", "true");
            iframe.setAttribute("frameborder", "0");

            // Modal takeover styles
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