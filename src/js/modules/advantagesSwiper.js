import Swiper from 'swiper/swiper-bundle';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default () => {
  const advantagesWrappers = document.querySelectorAll('.js-advantages-swiper-wrapper');

  advantagesWrappers.forEach((wrapper) => {
    const swiperBox = wrapper.querySelector('.advantages__swiper.swiper');
    const swiperBody = wrapper.querySelector('.advantages__body');
    const items = swiperBox.querySelectorAll('.advantages__swiper-slide.swiper-slide');
    const scrolled = (items[0].clientWidth * items.length) - swiperBody.offsetWidth;

    const swiper = new Swiper(swiperBox, {
      speed: 800,
      spaceBetween: 24,
      slidesPerView: 'auto',
      allowTouchMove: false,
      watchOverflow: true,

      breakpoints: {
        640: {
          slidesPerView: 3.1,
          spaceBetween: 40
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 40
        }
      },

      on: {
        init: function () {
          let tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".js-scroller-animation",
              start: "top center+=15%",
              end: "bottom center-=30%",
              scrub: 3.5,
              // markers: true,
            }
          });

          tl.addLabel('start')
            .from('.js-scroller-animation', {
              translateX: 0,
            })
            .addLabel('scroll')
            .to('.js-scroller-animation', {
              translateX: -scrolled,
              duration: 5,
              ease: "sine.out",
              stagger: 1,
            })
            .addLabel('end');
        },
      },
    });
  })
}
