// JavaScript to add sticky class on scroll
window.onscroll = function() {toggleSticky()};

var header = document.querySelector('header');
var nav = document.querySelector('nav');
var sticky = nav.offsetTop;

function toggleSticky() {
    if (window.pageYOffset > sticky) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
}

function openResumePopup() {
    document.getElementById('resume-popup').style.display = 'block';
}

function closeResumePopup() {
    document.getElementById('resume-popup').style.display = 'none';
}

// contact

// function initMap() {
//   const location = { lat: 40.730610, lng: -73.935242 }; // Replace with your desired coordinates
//   const map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 15,
//     center: location
//   });
//   const marker = new google.maps.Marker({
//     position: location,
//     map: map,
//     title: 'Our Location'
//   });
// }

// // Load the Google Maps API asynchronously
// function loadScript() {
//   const script = document.createElement('script');
//   script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
//   script.defer = true;
//   document.head.appendChild(script);
// }

// window.onload = loadScript;



// message 

// (function(){
//   emailjs.init("nmpZNndUjXZk-eQmw");
// })();


// const form = document.getElementById('contact-form');
// const nameInput = document.getElementById('name');
// const emailInput = document.getElementById('email');
// const subjectInput = document.getElementById('subject');
// const messageInput = document.getElementById('message');
// const subscribeCheckbox = document.getElementById('subscribe');

// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const formData = {
//       name: nameInput.value,
//       email: emailInput.value,
//       subject: subjectInput.value,
//       message: messageInput.value
//   };

//   // Send the form data via EmailJS
//   emailjs.send('service_h14jqje', 'template_jqwxazi', formData)
//   .then((response) => {
//       console.log('SUCCESS!', response.status, response.text);
//       form.reset();
//       alert('Message sent successfully!');
//   }, (error) => {
//       console.error('FAILED...', error);
//       alert('There was an error sending your message.');
//   });

//   // Reset the form after successful submission
//   form.reset();
//   alert('Message sent successfully!');
// });