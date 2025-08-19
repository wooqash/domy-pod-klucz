// import Swiper JS
import Swiper from 'swiper';
// import Swiper styles
import 'swiper/css';

document.addEventListener("DOMContentLoaded", function () {
// const swiperElement1: HTMLDListElement | null = document.querySelector(".mySwiper");
// const swiperElement2: HTMLDListElement | null = document.querySelector(".mySwiper2");
// let swiper;


// if (swiperElement1) {
   var swiper = new Swiper(".mySwiper", {
            spaceBetween: 20,
            slidesPerView: 4,
            freeMode: true,
            watchSlidesProgress: true,
        });
// }
// if (swiper && swiperElement2) {
        var swiper2 = new Swiper(".mySwiper2", {
            spaceBetween: 10,
            thumbs: {
                swiper: swiper,
            },
        });
    // }
});