/*==================== SHOW MENU ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 100 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 100) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SWIPER DISCOVER ====================*/
let swiper = new Swiper(".discover__container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    spaceBetween: 32,
    coverflowEffect: {
        rotate: 0,
    },
})


/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 200) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    distance: '60px',
    duration: 2800,
    // reset: true,
})


sr.reveal(`.home__data, .home__social-link, .home__info,
           .discover__container,
           .experience__data, .experience__overlay,
           .place__card,
           .sponsor__content,
           .footer__data, .footer__rights`,{
    origin: 'top',
    interval: 100,
})

sr.reveal(`.about__data, 
           .video__description,
           .subscribe__description`,{
    origin: 'left',
})

sr.reveal(`.about__img-overlay, 
           .video__content,
           .subscribe__form`,{
    origin: 'right',
    interval: 100,
})

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

function setVideo(modalId, btnId, iframeId, youtube) {

    console.log(modalId, btnId, iframeId, youtube + "<----")

    // Get the modal element
    var modal = document.getElementById(modalId);
    var iframe = document.getElementById(iframeId);

    // Get the button that opens the modal
    var btn = document.getElementById(btnId);

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close");

    // When the user clicks the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
        iframe.src = youtube;
    }
    

    // When the user clicks on <span> (x), close the modal
    for (var i = 0; i < span.length; i++){
        span[i].onclick = function() {
            modal.style.display = "none";
            iframe.src = "";
        }
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            iframe.src = "";
        }
    }
}

const form = document.getElementById('subcribe');

form.addEventListener('submit', async (e) => {
    myFunction()
  e.preventDefault();
  const formData = new FormData(form);
  console.log(formData);

  var object = {};
  formData.forEach(function(value, key){
      object[key] = value;
  });
  var json = JSON.stringify(object);

  try {
    const response = await fetch('https://keiken.onrender.com/keiken/calculator', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    });
    const data = await response.json();
    // if('Success!' == data['Message']) {
    //     myFunction()
    // }
    
  } catch (error) {
    console.error(error);
  }
});


// form
function myFunction() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
  
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
  }



// INPUT PHONE MASK
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', () => {
  let phone = phoneInput.value.replace(/\D/g,''); // remove all non-numeric characters
  phone = phone.substring(0,11); // limit input to 11 digits
  const phoneFormatted = phone.replace(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/, '+7 ($2) $3-$4-$5'); // format phone number
  phoneInput.value = phoneFormatted;
});

const languageSelect = document.getElementById('languageSelect');
const selectedValue = localStorage.getItem('selectedValue');

// если значение есть, устанавливаем его в качестве выбранного элемента
if (selectedValue) {
    languageSelect.value = selectedValue;
}

languageSelect.addEventListener('change', function() {
  const selectedOption = this.options[this.selectedIndex];
  window.location.href = selectedOption.value;
  localStorage.setItem('selectedValue', languageSelect.value);
});

window.addEventListener('load', () => {
    const body = document.querySelector('body');
    body.style.visibility = 'visible';
  });

  const spinner = new Spinner().spin(document.getElementById('spinner'));

  var video = document.getElementById('bg-video');
  var videoTop = video.getBoundingClientRect().top;

  window.addEventListener('scroll', function() {
    if (videoTop < window.innerHeight) {
      video.play();
    }
  });

  function sendPostRequest() {
    // ваш код отправки запроса здесь

    fetch('https://keiken.onrender.com/keiken/calculator', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ "Test": "Every hour" })
})
.then(response => {
  if (response.ok) {
    return response.json(); // если сервер ответил корректным JSON-объектом
  } else {
    throw new Error('Ошибка HTTP: ' + response.status); // генерируем ошибку в случае некорректного ответа
  }
})
.then(data => {
  console.log(data); // обрабатываем полученные данные
})
.catch(error => {
  console.error(error); // обрабатываем ошибки, если возникли
});
  }
  
  // Запускаем функцию отправки запроса каждый час
  setInterval(sendPostRequest, 1000 * 60 * 60); // 1000 мс * 60 с * 60 минут