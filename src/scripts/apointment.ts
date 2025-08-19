let openAppBTN: HTMLAnchorElement | null = document.querySelector("#appointment");
let closeAppBTN: HTMLButtonElement | null = document.querySelector(".close_app");
const overlay2: HTMLDivElement | null = document.querySelector('#overlay2');
import gsap from "gsap";

const apointment_cnt = gsap.timeline({
    paused: true,
});

apointment_cnt.to(".appointment_cnt", 0.4, {
    autoAlpha: 1,
    delay: 0.1,
    x: 0,
});

apointment_cnt.from(
    ".close_app, .appointment_cnt h1, .appointment_cnt p, .appointment_cnt form, .appointment_cnt img",
    {
        duration: 0.5,
        opacity: 0,
        y: 15,
        stagger: {
            amount: 0.4,
        },
    },
    "-=.3"
);

function open_apointment_cnt() {
    apointment_cnt.play();
}
function close_apointment_cnt() {
    apointment_cnt.reverse();
}
if (openAppBTN){
openAppBTN.onclick = function (e) {
    e.preventDefault();
    open_apointment_cnt();
    overlay2?.classList.add('active');
};
}

if(closeAppBTN){
closeAppBTN.onclick = function (e) {
    e.preventDefault();
    close_apointment_cnt();
    overlay2?.classList.remove('active');
};
}

if(overlay2){
overlay2.onclick = function (e) {
    e.preventDefault();
    close_apointment_cnt();
    overlay2.classList.remove('active');
};
}