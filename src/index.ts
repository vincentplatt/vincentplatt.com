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
    navigator.serviceWorker.register("sw.js", { scope: "/" }).then(function(reg) {
        if (reg.installing) {
            console.log("Service worker installing");
        } else if (reg.waiting) {
            console.log("Service worker installed");
        } else if (reg.active) {
            console.log("Service worker active");
        }

    }).catch(function(error) {
        console.log("Registration failed with " + error);
    });
}