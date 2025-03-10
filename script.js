// Initialize AOS (Animate On Scroll) library
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Initialize EmailJS
    (function() {
        // Replace with your actual EmailJS public key
        emailjs.init("nmpZNndUjXZk-eQmw");
    })();

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('show');
        menuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('show');
            menuToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== "#") {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Offset for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Form submission with EmailJS - FIXED IMPLEMENTATION
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Get form data
            const name = contactForm.querySelector('#name').value;
            const email = contactForm.querySelector('#email').value;
            const subject = contactForm.querySelector('#subject').value;
            const message = contactForm.querySelector('#message').value;
            
            // Form validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                return;
            }
            
            // Prepare template parameters
            const templateParams = {
                name: name,
                email: email,
                subject: subject,
                message: message
            };
            
            // Send email using EmailJS
            emailjs.send(
                'service_h14jqje',       // EmailJS service ID
                'template_jqwxazi',      // EmailJS template ID
                templateParams
            )
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Create success message element
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully!';
                
                // Insert success message after form
                contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Remove success message after 5 seconds
                setTimeout(function() {
                    successMessage.remove();
                }, 5000);
            })
            .catch(function(error) {
                console.error('FAILED...', error);
                
                // Create error message element
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send message. Please try again later.';
                
                // Insert error message after form
                contactForm.parentNode.insertBefore(errorMessage, contactForm.nextSibling);
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Remove error message after 5 seconds
                setTimeout(function() {
                    errorMessage.remove();
                }, 5000);
            });
        });
    }

    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Resume popup functionality
    window.openResumePopup = function() {
        document.getElementById('resume-popup').style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };
    
    window.closeResumePopup = function() {
        document.getElementById('resume-popup').style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
    };

    // Close popup when clicking outside content
    const popup = document.getElementById('resume-popup');
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closeResumePopup();
        }
    });

    // Escape key to close popup
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.style.display === 'flex') {
            closeResumePopup();
        }
    });

    // Sticky header
    const header = document.getElementById('header');
    const headerOffset = header.offsetTop;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > headerOffset) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`.nav-item[href="#${sectionId}"]`).classList.add('active');
            } else {
                document.querySelector(`.nav-item[href="#${sectionId}"]`).classList.remove('active');
            }
        });
    });
});