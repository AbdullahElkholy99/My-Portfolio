const defaultPortfolioData = [
    {
        id: 1,
        name: "History Fayoum Website",
        category: "web",
        description: "A comprehensive website showcasing the rich history and cultural heritage of Fayoum, Egypt. Features interactive timelines, historical artifacts gallery, and detailed information about significant historical periods.",
        image: "https://images.unsplash.com/photo-1471919743851-c4df8b6ee133?w=400&h=250&fit=crop",
        link: "https://nour-cs19.github.io/HistoryFayoumWebsite/",
        technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"]
    },
    {
        id: 2,
        name: "Personal Portfolio",
        category: "web",
        description: "My personal portfolio website showcasing my skills, projects, and professional journey. Built with modern web technologies and features a clean, responsive design.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
        link: "https://noureddinemaher.netlify.app/",
        technologies: ["HTML5", "CSS3", "JavaScript", "Netlify"]
    },
    {
        id: 3,
        name: "Interactive Web Application",
        category: "web",
        description: "A dynamic web application with modern UI/UX design, featuring interactive elements and smooth animations. Demonstrates advanced JavaScript functionality and responsive design principles.",
        image: "https://images.unsplash.com/photo-1551288049-b1f3c21d0e6b?w=400&h=250&fit=crop",
        link: "https://lovely-genie-897156.netlify.app/",
        technologies: ["JavaScript", "CSS3", "Responsive Design"]
    },
    {
        id: 4,
        name: "Creative Landing Page",
        category: "design",
        description: "A visually stunning landing page with modern design aesthetics, smooth scrolling effects, and engaging user interactions. Perfect example of creative web design.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
        link: "https://66944aa1f55665c6866846f7--joyful-starlight-af9375.netlify.app/",
        technologies: ["HTML5", "CSS3", "JavaScript", "Animation"]
    },
    {
        id: 5,
        name: "Modern Web Interface",
        category: "web",
        description: "A sleek and modern web interface featuring contemporary design patterns, optimized performance, and excellent user experience across all devices.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
        link: "https://lively-sunflower-8abe8e.netlify.app/",
        technologies: ["HTML5", "CSS3", "JavaScript", "Modern Design"]
    }
];

// Initialize portfolio data from localStorage or use default
let portfolioData = JSON.parse(localStorage.getItem('portfolioData')) || defaultPortfolioData;
let isAdminMode = false;

// Save portfolio data to localStorage
function savePortfolioToLocalStorage() {
    try {
        localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
        console.log('Portfolio data saved to localStorage:', portfolioData);
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        showNotification('Failed to save project data.', 'danger');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Ensure Add Project button is hidden on load
    const addProjectBtn = document.getElementById('addProjectBtn');
    if (addProjectBtn) {
        addProjectBtn.style.display = 'none';
        console.log('Initial addProjectBtn display: none');
    } else {
        console.error('Add Project button not found in DOM');
    }

    // Initialize Typed.js
    try {
        new Typed('.typing', {
            strings: ['Fullstack .NET & Angular Developer', 'BackEnd ASP .NET', 'Angular Developer', 'Freelancer'],
            typeSpeed: 80,
            backSpeed: 50,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
        console.log('Typed.js initialized successfully');
    } catch (error) {
        console.error('Error initializing Typed.js:', error);
    }

    // Load portfolio projects
    loadPortfolio();

    // Initialize event listeners
    initializeEventListeners();

    // Initialize animations
    initializeAnimations();
});

// Event Listeners
function initializeEventListeners() {
    // Admin button to open admin login modal
    const adminBtn = document.getElementById('adminBtn');
    if (adminBtn) {
        adminBtn.addEventListener('click', function() {
            console.log('Admin button clicked, opening admin login modal');
            openModal('adminLoginModal');
        });
    } else {
        console.error('Admin button not found in DOM');
    }

    // Admin login form submission
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Admin login form submitted');
            handleAdminLogin();
        });
    } else {
        console.error('Admin login form not found in DOM');
    }

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            console.log('Hamburger menu toggled, active:', navMenu.classList.contains('active'));
        });
    } else {
        console.error('Hamburger or navMenu not found in DOM');
    }

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            console.log('Nav link clicked, closing mobile menu');
        });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                console.log('Smooth scrolling to:', this.getAttribute('href'));
            }
        });
    });

    // Scroll to top button
    const scrollTop = document.getElementById('scrollTop');
    if (scrollTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTop.classList.add('show');
            } else {
                scrollTop.classList.remove('show');
            }

            // Navbar background change
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                }
            }
        });

        scrollTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            console.log('Scroll to top clicked');
        });
    } else {
        console.error('Scroll top button not found in DOM');
    }

    // Portfolio filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterPortfolio(filter);
            console.log('Filter applied:', filter);
        });
    });

    // Add project button
    const addProjectBtn = document.getElementById('addProjectBtn');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', function() {
            console.log('Add Project button clicked');
            openModal('addProjectModal');
        });
    } else {
        console.error('Add Project button not found when setting event listener');
    }

    // Add project form
    const addProjectForm = document.getElementById('addProjectForm');
    if (addProjectForm) {
        addProjectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Add Project form submitted');
            addProject();
        });
    } else {
        console.error('Add Project form not found in DOM');
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Contact form submitted');
            handleContactForm();
        });
    } else {
        console.error('Contact form not found in DOM');
    }

    // Image preview for project image
    const projectImage = document.getElementById('projectImage');
    if (projectImage) {
        projectImage.addEventListener('change', function(e) {
            const file = e.target.files[0];
            const preview = document.getElementById('imagePreview');
            if (file && preview) {
                preview.src = URL.createObjectURL(file);
                preview.style.display = 'block';
                console.log('Image selected for preview');
            } else {
                preview.style.display = 'none';
                console.error('No file selected or image preview element not found');
            }
        });
    } else {
        console.error('Project image input not found in DOM');
    }

    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        const adminModal = document.getElementById('adminLoginModal');
        const projectModal = document.getElementById('addProjectModal');
        if (e.target === adminModal) {
            closeModal('adminLoginModal');
            console.log('Admin modal closed by clicking outside');
        }
        if (e.target === projectModal) {
            closeModal('addProjectModal');
            console.log('Project modal closed by clicking outside');
        }
    });

    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal('adminLoginModal');
            closeModal('addProjectModal');
            console.log('Escape key pressed, closing all modals');
        }
    });
}

// Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                console.log('Section in view:', entry.target.id);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// Portfolio Functions
function loadPortfolio() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (portfolioGrid) {
        portfolioGrid.innerHTML = '';
        portfolioData.forEach(project => {
            const projectElement = createProjectElement(project);
            portfolioGrid.appendChild(projectElement);
        });
        console.log('Portfolio loaded with', portfolioData.length, 'projects');
    } else {
        console.error('Portfolio grid not found in DOM');
    }
}

function createProjectElement(project) {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'portfolio-item';
    projectDiv.setAttribute('data-category', project.category);

    projectDiv.innerHTML = `
        <div class="portfolio-image">
            <img src="${project.image}" alt="${project.name}" onerror="this.src='https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop'">
            <div class="portfolio-overlay">
                <a href="${project.link}" class="portfolio-link" target="_blank">
                    <i class="fas fa-external-link-alt"></i>
                </a>
                <a href="${project.link}" class="portfolio-link" target="_blank">
                    <i class="fas fa-eye"></i>
                </a>
                ${isAdminMode ? `<button class="remove-btn" onclick="removeProject(${project.id})">
                    <i class="fas fa-trash"></i>
                </button>` : ''}
            </div>
        </div>
        <div class="portfolio-info">
            <h4>${project.name}</h4>
            <p class="portfolio-category">${getCategoryName(project.category)}</p>
            <p>${project.description}</p>
        </div>
    `;

    return projectDiv;
}

function getCategoryName(category) {
    const categories = {
        'web': 'Web Development',
        'design': 'Design',
        'mobile': 'Mobile App'
    };
    return categories[category] || 'Project';
}

function filterPortfolio(filter) {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.6s ease';
        } else {
            item.style.display = 'none';
        }
    });
    console.log('Portfolio filtered with:', filter);
}

// Admin Functions
function handleAdminLogin() {
    const username = document.getElementById('adminUsername').value.trim();
    const password = document.getElementById('adminPassword').value;
    const correctUsername = 'noureddinemahermahmoud7791@gmail.com';
    const correctPassword = '01223126694nourmaherzayed44447777@@##$$%%';

    if (username === correctUsername && password === correctPassword) {
        isAdminMode = true;
        const addProjectBtn = document.getElementById('addProjectBtn');
        const adminBtn = document.getElementById('adminBtn');
        if (addProjectBtn) {
            addProjectBtn.style.display = 'inline-block';
            console.log('Admin mode ON: Add Project button set to display: inline-block');
        }
        if (adminBtn) {
            adminBtn.textContent = 'Exit Admin';
            adminBtn.style.background = 'var(--danger)';
        }
        showNotification('Admin login successful!', 'success');
        closeModal('adminLoginModal');
        loadPortfolio(); // Reload portfolio to show remove buttons
    } else {
        showNotification('Invalid username or password!', 'danger');
        console.error('Admin login failed: incorrect credentials');
        document.getElementById('adminLoginForm').reset();
    }
}

function toggleAdmin() {
    if (isAdminMode) {
        isAdminMode = false;
        const addProjectBtn = document.getElementById('addProjectBtn');
        const adminBtn = document.getElementById('adminBtn');
        if (addProjectBtn) {
            addProjectBtn.style.display = 'none';
            console.log('Admin mode OFF: Add Project button set to display: none');
        }
        if (adminBtn) {
            adminBtn.textContent = 'Admin';
            adminBtn.style.background = 'var(--gradient)';
        }
        loadPortfolio(); // Reload portfolio to hide remove buttons
        showNotification('Exited admin mode.', 'success');
    } else {
        openModal('adminLoginModal');
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        if (modalId === 'addProjectModal') {
            document.getElementById('imagePreview').style.display = 'none';
            document.getElementById('addProjectForm').reset();
        } else if (modalId === 'adminLoginModal') {
            document.getElementById('adminLoginForm').reset();
        }
        console.log(`${modalId} opened`);
    } else {
        console.error(`${modalId} not found in DOM`);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        if (modalId === 'addProjectModal') {
            document.getElementById('addProjectForm').reset();
            document.getElementById('imagePreview').style.display = 'none';
        } else if (modalId === 'adminLoginModal') {
            document.getElementById('adminLoginForm').reset();
        }
        console.log(`${modalId} closed`);
    } else {
        console.error(`${modalId} not found in DOM`);
    }
}

function addProject() {
    const name = document.getElementById('projectName').value;
    const category = document.getElementById('projectCategory').value;
    const description = document.getElementById('projectDescription').value;
    const file = document.getElementById('projectImage').files[0];
    const link = document.getElementById('projectLink').value;

    if (!name || !category || !description || !file || !link) {
        showNotification('Please fill all fields and select an image!', 'danger');
        console.error('Form validation failed: missing fields');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const imageData = e.target.result;
        const newProject = {
            id: Date.now(),
            name: name,
            category: category,
            description: description,
            image: imageData,
            link: link,
            technologies: ['Custom Project']
        };
        portfolioData.push(newProject);
        savePortfolioToLocalStorage();
        loadPortfolio();
        closeModal('addProjectModal');
        showNotification('Project added successfully!', 'success');
        console.log('New project added:', newProject);
    };
    reader.onerror = function(error) {
        console.error('Error reading file:', error);
        showNotification('Failed to read image file.', 'danger');
    };
    reader.readAsDataURL(file);
}

function removeProject(id) {
    if (confirm('Are you sure you want to remove this project?')) {
        portfolioData = portfolioData.filter(project => project.id !== id);
        savePortfolioToLocalStorage();
        loadPortfolio();
        showNotification('Project removed successfully!', 'success');
        console.log('Project removed, ID:', id);
    }
}

// Contact Form
function handleContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) {
        console.error('Contact form not found in DOM');
        return;
    }
    const formData = new FormData(form);

    fetch('https://formspree.io/f/xblkegwr', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showNotification('Thank you for your message! I will get back to you soon.', 'success');
            form.reset();
            console.log('Contact form submitted successfully');
        } else {
            showNotification('Failed to send message. Please try again later.', 'danger');
            console.error('Contact form submission failed, status:', response.status);
        }
    })
    .catch(error => {
        showNotification('An error occurred. Please try again later.', 'danger');
        console.error('Form submission error:', error);
    });
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success)' : 'var(--danger)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: var(--shadow);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
    console.log('Notification shown:', message, type);
}