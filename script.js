// Mobile Navigation
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
if (mobileNavToggle && navMenu) {
// Toggle mobile menu
mobileNavToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('show');
    mobileNavToggle.innerHTML = navMenu.classList.contains('show') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile nav when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-menu') && !e.target.closest('.mobile-nav-toggle')) {
        navMenu.classList.remove('show');
        mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
});
}

document.addEventListener("DOMContentLoaded", function () {
    // Select the scroll button
    const scrollBtn = document.getElementById('scrollBtn');
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            } else {
                // Fallback to scroll to top if target not found
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-menu a");

    function updateActiveNavLink() {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").slice(1) === current) {
                link.classList.add("active");
            }
        });
    }

    // Optimize scroll event with requestAnimationFrame
    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNavLink();
                handleNavbarScroll();
                // Show/hide scroll button based on scroll position
                if (window.scrollY > 100) {
                    scrollBtn.classList.add('visible');
                } else {
                    scrollBtn.classList.remove('visible');
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Handle navigation background on scroll
    const navbar = document.querySelector(".navbar");
    let lastScrollTop = 0;

    function handleNavbarScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Only hide navbar when scrolling down
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = "translateY(-100%)";
        } else {
            navbar.style.transform = "translateY(0)";
        }

        // Update opacity based on scroll position
        const opacity = Math.min(scrollTop / 200, 0.98);
        navbar.style.background = `rgba(255, 255, 255, ${opacity})`;

        lastScrollTop = scrollTop;
    }
});


// Certificate Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const certificateItems = document.querySelectorAll('.certificate-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        certificateItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                setTimeout(() => item.style.opacity = '1', 0);
            } else {
                item.style.opacity = '0';
                setTimeout(() => item.style.display = 'none', 300);
            }
        });
    });
});

// Modal Handling
const projectModal = document.querySelector('.project-modal');
const certificateModal = document.querySelector('.certificate-modal');
const closeButtons = document.querySelectorAll('.close-modal');

// Project Modal Content
const projectDetails = {
    project1: {
        title: 'Power BI Dashboard',
        description: 'An interactive Power BI dashboard for data visualization and business analytics. The dashboard provides insights into key metrics, trends, and performance analysis.',
        technologies: ['Power BI', 'Data Modeling'],
        images: ['images/project1.1.png', 'images/project1.2.png'],
        link: 'https://app.powerbi.com/groups/6f5ad2ae-2bda-43b4-b0e1-149c0f5e3724/dashboards/6689af9a-77d6-4e0f-8a91-02027897eb62?experience=power-bi'  // Replace with your actual link
    },
    project2: {
        title: 'Machine Learning Model',
        description: 'An advanced machine learning model built using TensorFlow and Scikit-learn for predictive analytics.',
        technologies: ['Python', 'TensorFlow', 'Scikit-learn', 'NumPy'],
        images: ['images/project2-detail1.jpg', 'images/project2-detail2.jpg'],
        link: 'https://github.com/yourusername/ml-model'
    },
    project3: {
        title: 'Portfolio Website',
        description: 'A responsive web application built using modern web technologies.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
        images: ['images/project3.1.png', 'images/project3.2.png'],
        link: 'https://github.com/KamleshSaini'
    }
};

// Open Project Modal
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        const project = projectDetails[item.dataset.project];
        const content = `
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <div class="tech-stack">
                <h3>Technologies Used:</h3>
                <ul>
                    ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
                </ul>
            </div>
            <div class="project-images">
                ${project.images.map(img => `<img src="${img}" alt="Project Detail">`).join('')}
            </div>
            <a href="${project.link}" target="_blank" class="project-link">View Project</a>
        `;
        projectModal.querySelector('.project-details').innerHTML = content;
        projectModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Open Certificate Modal
document.querySelectorAll('.certificate-item').forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        const title = item.querySelector('h3').textContent;
        const issuer = item.querySelector('p').textContent;
        
        const content = `
            <h2>${title}</h2>
            <p>Issued by: ${issuer}</p>
            <img src="${imgSrc}" alt="${title}" style="width: 100%; max-width: 600px; margin: 2rem auto; display: block;">
        `;
        certificateModal.querySelector('.certificate-details').innerHTML = content;
        certificateModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close Modals
closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        projectModal.style.display = 'none';
        certificateModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === projectModal || e.target === certificateModal) {
        projectModal.style.display = 'none';
        certificateModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const certificates = document.querySelectorAll(".certificate-item");

    function handleScroll() {
        const triggerBottom = window.innerHeight * 0.9;

        certificates.forEach((certificate) => {
            const rect = certificate.getBoundingClientRect();
            if (rect.top < triggerBottom) {
                certificate.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();
});



