'use strict';
const hamburger = document.querySelector('.hamburger');
const navUl = document.querySelector('.navbar-links');
const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');
const slide = document.querySelectorAll('.slide');
const info = document.querySelector('.info');
const search = document.querySelector('.search');
const user = document.querySelector('.user');
const closeContentBtn = document.querySelector('.close-content');
const navA = document.querySelectorAll('.navbar-link');
const footerUl = document.querySelector('.footer-ul')
const form = document.querySelector('.contact-container');
const fullName = document.querySelector('#fullName');
const email = document.querySelector('#email');
const phoneNum = document.querySelector('#phone');
let currSlide = 0;
const maxSlide = slide.length - 1;

loadEvent()
function loadEvent() {
    navUl.addEventListener('click', smoothScroll);
    footerUl.addEventListener('click', (e) => {
        e.preventDefault();
        if(e.target.classList.contains('footer-link')) {
            const id = e.target.getAttribute('href');
            document.querySelector(id).scrollIntoView({behavior: 'smooth'});
        }
    });
    user.addEventListener('click', () => {
        document.querySelector('.login-content').classList.toggle('pop');
    })
    
    search.addEventListener('click', () => {
        document.querySelector('.search-bar').classList.toggle('show');
    })
    
    closeContentBtn.addEventListener('click',() => {
        document.querySelector('.overlay').classList.remove('go');
        document.querySelector('.info-container').classList.remove('go');
    })
    info.addEventListener('click', () => {
        document.querySelector('.overlay').classList.add('go');
        document.querySelector('.info-container').classList.add('go');
    });
    
    slide.forEach((s,i) => s.style.transform = `translateX(${100 * i}%)`);
    leftBtn.addEventListener('click', prevSlide);
    rightBtn.addEventListener('click', nextSlide);
    hamburger.addEventListener('click', openMenu);
    navA.forEach(i => i.addEventListener('click', closeMenu));
}

function smoothScroll(e) {
    e.preventDefault();
    if (e.target.classList.contains('navbar-link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    }
}
function openMenu() {
    hamburger.classList.toggle('active');
    navUl.classList.toggle('active');
}
function closeMenu() {
    hamburger.classList.remove('active');
    navUl.classList.remove('active');
}
function slideImg(currSlide) {
    slide.forEach((s,i) => s.style.transform = `translateX(${100 * (i - currSlide)}%)`);
}
function nextSlide() {
    if(maxSlide === currSlide) {
        currSlide = 0;
    } else {
        currSlide++;
    }
    slideImg(currSlide);
}
function prevSlide() {
    if(currSlide === 0) {
        maxSlide = currSlide;
    } else {
        currSlide--;
    }
    slideImg(currSlide);
}
let options = {
    root: null,
    threshold: 0.25,
    rootMargin: '0px',
}
function lazyLoad(entries, observer) {
    entries.forEach(entry => {
        if(entry.isIntersecting && entry.target.className === 'image') {
            let imageURL = entry.target.getAttribute('data-img');
            if(imageURL) {
                entry.target.src = imageURL;
                observer.unobserve(entry.target);
            }
        }
    })
}
let imgObserve = new IntersectionObserver(lazyLoad, options);
let images = document.querySelectorAll('.image');
images.forEach(i => imgObserve.observe(i))

form.addEventListener('submit', formValidation)
function formValidation(e) {
    e.preventDefault();
    let fullNameValue = fullName.value.trim();
    let emailValue = email.value.trim();
    let phoneNumValue = phoneNum.value.trim();
    if(fullNameValue === '') {
        setError(fullName, 'Name cannot be blank');
    } else {
        setSuccess(fullName)
    }
    if(emailValue === '') {
        setError(email, 'Email cannot be blank')
    } else {
        setSuccess(email);
    }
    if(phoneNumValue === '') {
        setError(phoneNum, 'Phone number cannot be blank');
    } else {
        setSuccess(phoneNum);
    }
};
function setError(input, message) {
    let inputContainer = input.parentElement;
    let small = inputContainer.querySelector('small');
    small.innerText = message;
    inputContainer.className = 'form-group error';
}
function setSuccess(input) {
    let inputContainer = input.parentElement;
    inputContainer.className = 'form-group success';
}
var swiper = new Swiper(".mySwiper", {
        // slidesPerView: 1,
        loop: true,
        grabCursor: true,
        spaceBetween: 20,
        // pagination: {
        // el: ".swiper-pagination",
        // clickable: true,
        // },
        breakpoints: {
        640: {
            slidesPerView: 1,
            // spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            // spaceBetween: 40,
        },
        991: {
            slidesPerView: 3,
            spaceBetween: 50,
        },
    },
});
// function fizzBuzz(num) {
//     for(let i = 1; i <= num; i++) {
//         if(i % 2 === 0 && i % 3 === 0) {
//             console.log('fizzbuzz');
//         } else if(i % 2 === 0) {
//             console.log('fizz');
//         } else if(i % 3 === 0) {
//             console.log('buzz');
//         } else {
//             console.log(i);
//         }
//     };
// };

// fizzBuzz(6)