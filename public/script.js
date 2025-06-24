document.addEventListener('DOMContentLoaded', function() {
    //Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');
    const logos = document.querySelectorAll('.logo');

      //Function to update all logos
    function updateLogoSrc(newSrc) {
    logos.forEach(logo => {
      logo.src = newSrc;
    });
  }


    //Check for saved theme preference or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    //Apply theme based on saved preference or system preference
    if(savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        html.classList.add('dark');
        icon.classList.replace('fa-moon', 'fa-sun');
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#000000'); 
        updateLogoSrc('../assets/logos/white-logo.png');
    }else {
        updateLogoSrc('../assets/logos/black-logo.png'); 
    }

    //Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        html.classList.toggle('dark');

        //update icon and local storage
        if(html.classList.contains('dark')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
            document.querySelector('meta[name="theme-color"]').setAttribute('content', '#000000'); 
            updateLogoSrc('../assets/logos/white-logo.png');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
            document.querySelector('meta[name="theme-color"]').setAttribute('content', '#0070f3'); 
            updateLogoSrc('../assets/logos/black-logo.png');
        }
});

//Mobile navigation toggle
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    if(menuToggle && closeMenu && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.remove('translate-x-full');
            document.body.classList.add('overflow-hidden');
        });

        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.add('translate-x-full');
            document.body.classList.remove('overflow-hidden');
        });

        //close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('translate-x-full');
                document.body.classList.remove('overflow-hidden');
            });
        });
    }

//Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
    });

    //Form Submission Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            //Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            //Here

            const button = contactForm.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Message Sent!';
            button.classList.add('bg-green-500');

            //REset Form
            contactForm.reset();

            //Reset Button text after a delay
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('bg-green-500');
            }, 3000);
        })
    }

    //send Email


    //Add scroll events for header shadow and reveal animations
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');

    function checkScroll() {
        //Header Shadow 
        if (window.scrollY > 0) {
            header.classList.add('shadow-md');
        }else {
            header.classList.remove('shadow-md');
        }

        //Section Reveal
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.85) {
                section.classList.add('opacity-100', 'translate-y-0');
                section.classList.remove('opacity-0', 'translate-y-4');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    //Run on page load
    checkScroll();

    //Add intersection observer for animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-4');
                //stop observing once the animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    //Terminal animation
    const terminalContainer = document.getElementById('terminal-container');
    const terminalContent = document.querySelector('.terminal-content');
    const commandSpan = document.querySelector('.command-text');

    if(terminalContainer && terminalContent && commandSpan) {
        const commandText = "Welcome to the world of copywriting";

        let i = 0;
        const typeCommand = () => {
            if (i < commandText.length) {
                commandSpan.textContent += commandText.charAt(i);
                i++;
                setTimeout(typeCommand, 50); 
            } else {
                const cursor = document.createElement('span');
                cursor.className = 'inline-block w-2 h-5 bg-gray-900 dark:bg-white animate-blink align-middle';
                terminalContent.appendChild(cursor);
            }
        };

        //Start typing after delay
        setTimeout(typeCommand, 1000);
    }else{
        //fallback for original terminal structure
        const terminal = document.querySelector('.termina-body');
        if(terminal) {
            const commandText = terminal.querySelector('.command').textContent;
            terminal.querySelector('.command').textContent = '';

            let i = 0;
            const typeCommand = () => {
                    if (i < commandText.length) {
                        terminal.querySelector('.command').textContent += commandText.charAt(i);
                        i++;
                        setTimeout(typeCommand, 50);
                    } else {
                      terminal.querySelector('.command').insertAdjacentHtm('afterend', '<span class="animate-blink">_</span>')
                    }
            };
            //Start typing after delay
            setTimeout(typeCommand, 1000);
        }
    }
   // Dynamic date display
    
     document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
    });
    
// Custom CSS to fix cursor position
    const style = document.createElement('style');
    style.textContent = `
        .Typewriter__cursor {
            display: inline-block !important;
            vertical-align: middle !important;
            margin-left: 2px !important;
        }
    `;
    document.head.appendChild(style);

    const typewriter = new Typewriter('.typing-container', {
        loop: true,
        delay: 60,
        deleteSpeed: 40,
    });
    
    typewriter
        .typeString('Turning features into benefits.')
        .pauseFor(1500)
        .deleteAll()
        .typeString('Clarity over cleverness.')
        .pauseFor(1500)
        .deleteAll()
        .typeString('Precision in every phrase.')
        .pauseFor(1500)
        .deleteAll()
        .typeString('Your story, powerfully told.')
        .pauseFor(1500)
        .deleteAll()
        .start();
 
})




