import "../node_modules/normalize.css/normalize.css";
import "./style.scss";

import {
    removeLoadingCover,
    runConciseAnimation,
    runFullAnimation
} from "./animations";

function setEmailAddress() {
    const contactEmail = document.getElementById("contactEmail");
    if (!!contactEmail) {
        const email = `contact${String.fromCharCode(64)}vincentplatt.com`;
        contactEmail.innerText = email;
        contactEmail.setAttribute("href", `mailto:${email}`);
    }
}

window.onload = () => {
    removeLoadingCover();
    setEmailAddress();

    if (window.innerWidth > 1200) {
        runFullAnimation();
    } else {
        runConciseAnimation();
    }
};

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js", { scope: "/" }).catch(function(error) {
        console.error("Service worker failed: " + error);
    });
}