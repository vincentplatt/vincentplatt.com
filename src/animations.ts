import anime from "animejs";

export function removeLoadingCover(): void {
    hideElement("loadingOuter");

    setTimeout(function() {
        hideElement("loadingCover");
    }, 750);

    setTimeout(function() {
        removeElement("loadingCover");
        removeElement("loadingOuter");
    }, 1800);
}

function hideElement(id: string) {
    document.getElementById(id)?.classList.add("hide");
}

function removeElement(id: string) {
    document.getElementById(id)?.remove();
}

export function runFullAnimation(): void {
    anime({
        targets: "#letters .zeroFont span",
        translateX: function() {
            return anime.random(-200, 200);
        },
        translateY: function() {
            return anime.random(-40, 300);
        },
        direction: "reverse",
        rotate: function() {
            return anime.random(-360, 360);
        },
        endDelay: function() {
            return anime.random(1000, 1250);
        },
        scale: function() {
            return anime.random(10, 30) / 10;
        },
        duration: function() {
            return anime.random(450, 1900);
        },
        delay: anime.stagger(80, { from: "last" }),
        complete: function() {
            showParagraphs(0, 340);
        },
    });
}

export function runConciseAnimation(): void {
    showParagraphs(1200, 310);
}

export function showParagraphs(initialDelay: number, timeBetween: number): void {
    const idsToAnimate = ["software", "skills", "contact"];

    idsToAnimate.forEach((id: string, index: number) => {
        setTimeout(() => {
            document.getElementById(id)?.classList.add("show");
        }, initialDelay + index * timeBetween);
    });
}
