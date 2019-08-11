class AXInject {
    public Main(): void {
        console.log("Kagari loaded");

        const url = window.location.href;

        if (url.match("/register")) {
            console.log("Register Page: Find match url");
            const feeList = document.querySelectorAll(".fee");
            feeList.forEach(fee => {
                if (fee.textContent.match("Premier")) {
                    const link = fee.querySelector(".fee-aside a") as HTMLAnchorElement;
                    if (link != null) {
                        //this.ReplaceToIframe("https://www.eventbrite.com/e/charaexpo-usa-2019-tickets-61886810115");
                        if (!this.ReplaceToIframe(link.href)) {
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
            });
        }
    }

    public ReplaceToIframe(url: string): boolean {
        console.log("Try replacing iframe: " + url);
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

            return true;
        }
        return false;
    }
}

const axInject = new AXInject();
axInject.Main();