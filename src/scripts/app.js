"use strict";

// CURSEUR
document.addEventListener("mousemove", function(event) {
  const x = event.pageX - 5;
  const y = event.pageY - 5;
  const cursor = document.querySelector("#cursor");
  cursor.style.left = x + "px";
  cursor.style.top = y + "px";
});


const aElements = document.querySelectorAll("a, .da__img");
const buttonElements = document.querySelectorAll("button");
const labelElements = document.querySelectorAll("label");

aElements.forEach(function(a) {
  a.addEventListener("mouseover", function() {
    document.querySelector("#cursor").style.transform = "scale(2)";
  });

  a.addEventListener("mouseleave", function() {
    document.querySelector("#cursor").style.transform = "scale(1)";
  });
});

buttonElements.forEach(function(button) {
  button.addEventListener("mouseover", function() {
    document.querySelector("#cursor").style.transform = "scale(2)";
  });

  button.addEventListener("mouseleave", function() {
    document.querySelector("#cursor").style.transform = "scale(1)";
  });
});

labelElements.forEach(function(label) {
  label.addEventListener("mouseover", function() {
    document.querySelector("#cursor").style.transform = "scale(2)";
  });

  label.addEventListener("mouseleave", function() {
    document.querySelector("#cursor").style.transform = "scale(1)";
  });
});

// NAV
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-83px";
  }
  prevScrollpos = currentScrollPos;
};

import anime from 'animejs';
// ACTIVE NAV
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

var navigation = document.querySelector(".menu__liste");
if (navigation != undefined && navigation != null){
  const menuItems = document.querySelectorAll('.menu__link');

  menuItems.forEach((menuItem) => {
    const link = menuItem;
    const sectionId = menuItem.getAttribute('href');
    const section = document.querySelector(sectionId);

    gsap.to(link, {
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          menuItems.forEach((item) => {
            if (item !== link) {
              item.classList.remove('nav--active');
            }
          });
          link.classList.add('nav--active');
        },
        onEnterBack: () => {
          menuItems.forEach((item) => {
            if (item !== link) {
              item.classList.remove('nav--active');
            }
          });
          link.classList.add('nav--active');
        },
      },
    });
  });
}

// BURGER MENU
const menuBurger = document.querySelector('.menu__burger');
const menu = document.querySelector('.menu');

if (menuBurger != undefined && menuBurger != null){
    menuBurger.addEventListener("click", function(){
        menu.classList.toggle('menu--open');
        cursor.classList.toggle('menu--open');
    });
        // Permet de fermer le burger menu quand on clique sur un lien
    const menuEls = document.querySelectorAll('.menu__el');
    
    menuEls.forEach(menuEl => {
        menuEl.addEventListener('click', (e)=> {
            menu.classList.toggle('menu--open');
        });
    });
};

// SLIDER
class Slider {
  constructor(container) {
    this.container = container;
    this.items = container.querySelectorAll('.item');
    this.controls = container.querySelectorAll('.control');
    this.headerItems = container.querySelectorAll('.item-header');
    this.descriptionItems = container.querySelectorAll('.item-description');
    this.activeDelay = 0.76;
    this.interval = 12000;
    this.current = 0;
    this.intervalId = null;

    this.init();
  }

  init() {
    this.controls.forEach((control, index) => control.addEventListener('click', (e) => { this.clickedControl(e, index) }));
    this.controls[this.current].classList.add('active');
    this.items[this.current].classList.add('active');
    this.intervalId = setInterval(() => this.nextSlide(), this.interval);
  }

  nextSlide() {
    this.reset();
    if (this.current === this.items.length - 1) this.current = -1;
    this.current++;
    this.controls[this.current].classList.add('active');
    this.items[this.current].classList.add('active');
    this.transitionDelay(this.headerItems);
    this.transitionDelay(this.descriptionItems);
  }

  clickedControl(e, index) {
    this.reset();
    clearInterval(this.intervalId);

    const control = e.target;

    control.classList.add('active');
    this.items.forEach((item, itemIndex) => {
      if (itemIndex === index) {
        item.classList.add('active');
        this.current = itemIndex;
      }
    })
    this.transitionDelay(this.headerItems);
    this.transitionDelay(this.descriptionItems);
    this.intervalId = setInterval(() => this.nextSlide(), this.interval);
  }

  reset() {
    this.items.forEach(item => item.classList.remove('active'));
    this.controls.forEach(control => control.classList.remove('active'));
  }

  transitionDelay(items) {
    let seconds;
  }
}

const sliders = document.querySelectorAll('.slideshow');

if (sliders != undefined && sliders != null){
  sliders.forEach(slider => new Slider(slider));
}

// FONCTIONNALITES
function updateCarousel(carouselData, imageId, textId) {
  let currentIndex = 0;

  setInterval(() => {
    // Mettre à jour l'image avec animation de fondu sortant (fadeOut)
    const image = document.getElementById(imageId);
    image.classList.remove('fade-in');
    image.classList.add('fade-out');
    setTimeout(() => {
      image.src = carouselData[currentIndex].src;
      image.srcset = carouselData[currentIndex].srcset || "";
      image.alt = carouselData[currentIndex].alt;
      image.classList.remove('fade-out');
      image.classList.add('fade-in');
    }, 500);

    // Mettre à jour le texte avec animation de fondu sortant (fadeOut)
    const text = document.getElementById(textId);
    text.classList.remove('fade-in');
    text.classList.add('fade-out');
    setTimeout(() => {
      text.innerText = carouselData[currentIndex].text;
      text.classList.remove('fade-out');
      text.classList.add('fade-in');
    }, 500);

    // Passer à l'élément suivant
    currentIndex = (currentIndex + 1) % carouselData.length;
  }, 6000);
};

var fonctionnalites = document.querySelector(".foncts__content");
if (fonctionnalites != undefined && fonctionnalites != null){
  fetch('scripts/foncts.json')
  .then(response => response.json())
  .then(data => {
    const fonctsEnvisagees = data.fonctsEnvisagees;
    const fonctsRetenues = data.fonctsRetenues;

    updateCarousel(fonctsEnvisagees, 'fonctsenvisagees-image', 'fonctsenvisagees-text');
    updateCarousel(fonctsRetenues, 'fonctsretenues-image', 'fonctsretenues-text');
  })
}


// MODAL
var modal = document.getElementById("modal");

if (modal != undefined && modal != null){
  var moodboard = document.getElementById("moodboard");
  moodboard.addEventListener("click", function() {
    modal.style.display = "flex";
  });

  var close = document.getElementById("closebtn");

  close.addEventListener("click", function() {
    modal.style.display = "none";
  });
}

// UI-KIT
var ratio = document.querySelector("#ratio");
if (ratio != undefined && ratio != null){
  window.addEventListener('resize', function() {
    var screenWidth = window.innerWidth;
    
  
    if (screenWidth >= 768) {
      ratio.innerText = '1.6 Ratio';
    } else {
      ratio.innerText = '1.414 Ratio';
    }
  });  
}

// TRANSITION PAGE
const links = document.querySelectorAll(".pagetransition")

if(links){

    links.forEach(pageAnimation);

    function pageAnimation(links){

        links.addEventListener("click", function(e){

            let newlocation = this.href;
            document.body.classList.add('animation-page')
            document.body.addEventListener("animationend", function(){
                window.location = newlocation
            })
            e.preventDefault();
    
        })
    
    };
}
