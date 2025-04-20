// Load Google Fonts for cleaner typography
document.head.innerHTML += '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">';

// Preloader
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.style.opacity = "0";
    preloader.style.transition = "opacity 0.5s ease";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }, 800);
});

// Mobile Menu Toggle - FIXED
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  // Toggle between hidden class and open class
  mobileMenu.classList.toggle("hidden");

  // Add animation classes if not hidden
  if (!mobileMenu.classList.contains("hidden")) {
    mobileMenu.classList.add("open");
    mobileMenuButton.classList.add("open");
  } else {
    mobileMenu.classList.remove("open");
    mobileMenuButton.classList.remove("open");
  }
});

// Close mobile menu when clicking a menu item
const mobileMenuItems = mobileMenu.querySelectorAll("a");
mobileMenuItems.forEach((item) => {
  item.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("open");
    mobileMenuButton.classList.remove("open");
  });
});

// Header Background Change on Scroll
const header = document.getElementById("header");
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  // Header background - transparent at top, dark green when scrolled
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
    header.classList.add("bg-[#1a4731]");
    header.classList.remove("bg-transparent");
  } else {
    header.classList.remove("scrolled");
    header.classList.remove("bg-[#1a4731]");
    header.classList.add("bg-transparent");
  }

  // Back to top button
  if (window.scrollY > 300) {
    backToTopButton.classList.remove("opacity-0");
    backToTopButton.classList.add("opacity-100");
  } else {
    backToTopButton.classList.remove("opacity-100");
    backToTopButton.classList.add("opacity-0");
  }

  // Scroll animations
  revealElements();
});

// Back to top functionality
backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Gallery Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightbox = document.getElementById("close-lightbox");
const prevImage = document.getElementById("prev-image");
const nextImage = document.getElementById("next-image");
const galleryItems = document.querySelectorAll(".gallery-item img");

let currentImageIndex = 0;

// Open lightbox when clicking on a gallery image
galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    currentImageIndex = index;
    lightbox.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Prevent scrolling when lightbox is open
  });
});

// Close lightbox
closeLightbox.addEventListener("click", () => {
  lightbox.classList.add("hidden");
  document.body.style.overflow = ""; // Restore scrolling
});

// Navigate to previous image
prevImage.addEventListener("click", () => {
  currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
  lightboxImg.src = galleryItems[currentImageIndex].src;
  lightboxImg.alt = galleryItems[currentImageIndex].alt;
});

// Navigate to next image
nextImage.addEventListener("click", () => {
  currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
  lightboxImg.src = galleryItems[currentImageIndex].src;
  lightboxImg.alt = galleryItems[currentImageIndex].alt;
});

// Close lightbox when clicking outside the image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.add("hidden");
    document.body.style.overflow = ""; // Restore scrolling
  }
});

// Keyboard navigation for lightbox
document.addEventListener("keydown", (e) => {
  if (lightbox.classList.contains("hidden")) return;

  if (e.key === "Escape") {
    lightbox.classList.add("hidden");
    document.body.style.overflow = ""; // Restore scrolling
  } else if (e.key === "ArrowLeft") {
    prevImage.click();
  } else if (e.key === "ArrowRight") {
    nextImage.click();
  }
});

// Testimonials Slider
const testimonialSlider = document.getElementById("testimonial-slider");
const testimonialDots = document.querySelectorAll(".testimonial-dot");
const testimonialSlides = document.querySelectorAll(".testimonial-slide");
let currentTestimonialIndex = 0;

// Initialize dots
testimonialDots[0].classList.add("bg-primary-green");

// Function to update slider position
function updateTestimonialSlider() {
  const slideWidth = testimonialSlides[0].offsetWidth;
  testimonialSlider.style.transform = `translateX(-${currentTestimonialIndex * slideWidth}px)`;

  // Update active dot
  testimonialDots.forEach((dot, index) => {
    if (index === currentTestimonialIndex) {
      dot.classList.remove("bg-gray-300");
      dot.classList.add("bg-primary-green");
    } else {
      dot.classList.remove("bg-primary-green");
      dot.classList.add("bg-gray-300");
    }
  });
}

// Set up dot click handlers
testimonialDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentTestimonialIndex = index;
    updateTestimonialSlider();
  });
});

// Auto-rotate testimonials
let testimonialInterval = setInterval(() => {
  currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialSlides.length;
  updateTestimonialSlider();
}, 5000);

// Pause auto-rotation on hover
const testimonialContainer = document.querySelector("#testimonials .relative");
testimonialContainer.addEventListener("mouseenter", () => {
  clearInterval(testimonialInterval);
});

testimonialContainer.addEventListener("mouseleave", () => {
  testimonialInterval = setInterval(() => {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialSlides.length;
    updateTestimonialSlider();
  }, 5000);
});

// Update slider on window resize
window.addEventListener("resize", updateTestimonialSlider);

// Contact Form Validation
const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");
const formSuccess = document.getElementById("form-success");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;

  // Reset errors
  nameError.classList.add("hidden");
  emailError.classList.add("hidden");
  messageError.classList.add("hidden");

  // Validate name
  if (nameInput.value.trim() === "") {
    nameError.classList.remove("hidden");
    isValid = false;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    emailError.classList.remove("hidden");
    isValid = false;
  }

  // Validate message
  if (messageInput.value.trim() === "") {
    messageError.classList.remove("hidden");
    isValid = false;
  }

  // If form is valid, show success message
  if (isValid) {
    formSuccess.classList.remove("hidden");
    contactForm.reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
      formSuccess.classList.add("hidden");
    }, 5000);
  }
});

// Add reveal on scroll animation
document.addEventListener("DOMContentLoaded", function () {
  // Add reveal class to sections
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    if (section.id !== "home") {
      section.classList.add("reveal");
    }
  });

  // Add enhanced-card class to product cards
  const productCards = document.querySelectorAll("#products .bg-gray-50");
  productCards.forEach((card) => {
    card.classList.add("enhanced-card");
  });

  // Add btn-primary class to CTA buttons
  document.querySelector("#home a.bg-primary-green").classList.add("btn-primary");
  const orderButtons = document.querySelectorAll("#products button");
  orderButtons.forEach((button) => {
    button.classList.add("btn-primary");
  });

  // Add hover-grow to gallery items
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item) => {
    item.classList.add("hover-grow");
  });

  // Check which elements are visible on initial load
  revealElements();
});

// Add class to header links for minimalist underline effect
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("header nav a");
  navLinks.forEach((link) => {
    link.classList.add("nav-link");
  });

  // Add enhanced card classes
  const productCards = document.querySelectorAll("#products .bg-gray-50");
  productCards.forEach((card) => {
    card.classList.add("enhanced-card");
  });

  // Add button classes
  const ctaButton = document.querySelector("#home a.bg-primary-green");
  if (ctaButton) {
    ctaButton.classList.add("btn-primary");
    // Remove conflicting classes
    ctaButton.classList.remove("hover:bg-opacity-90");
  }

  const orderButtons = document.querySelectorAll("#products button");
  orderButtons.forEach((button) => {
    button.classList.add("btn-primary");
    // Remove conflicting classes
    button.classList.remove("bg-primary-brown", "hover:bg-opacity-90");
  });

  const submitButton = document.querySelector("#contact form button");
  if (submitButton) {
    submitButton.classList.add("btn-primary");
    // Remove conflicting classes
    submitButton.classList.remove("hover:bg-opacity-90");
  }

  // Add subtle entrance animations to sections
  const sections = document.querySelectorAll("section");
  sections.forEach((section, index) => {
    if (section.id !== "home") {
      section.classList.add("opacity-0");
      section.style.transform = "translateY(20px)";
      section.style.transition = "opacity 0.5s ease, transform 0.5s ease";

      // Delayed observation to trigger animation
      setTimeout(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                section.classList.remove("opacity-0");
                section.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1 }
        );

        observer.observe(section);
      }, 100);
    }
  });
});

// Function to reveal elements when scrolled into view
function revealElements() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((reveal) => {
    const windowHeight = window.innerHeight;
    const elementTop = reveal.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add("active");
    }
  });
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Responsive iframe adjustments
function adjustIframeHeight() {
  const iframe = document.querySelector("iframe");
  const iframeContainer = iframe.parentElement;

  if (window.innerWidth <= 640) {
    iframeContainer.style.height = "240px";
  } else {
    iframeContainer.style.height = "256px"; // 64 * 4 = h-64
  }
}

window.addEventListener("resize", adjustIframeHeight);
window.addEventListener("load", adjustIframeHeight);

document.addEventListener("DOMContentLoaded", function () {
  // Enhanced mobile menu toggle with animation
  const mobileLinks = document.querySelectorAll(".mobile-link");

  // Active link highlighting based on scroll position
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  // Enhanced header scroll behavior
  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {
    // Header background change
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Find current section for active link
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id");
      }
    });

    // Update active links
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });

    mobileLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });

  // Close mobile menu when clicking a link
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("open");
      mobileMenuButton.classList.remove("open");
    });
  });
});

// Enhanced Smooth Scrolling
document.addEventListener("DOMContentLoaded", function () {
  // Get all navigation links
  const navLinks = document.querySelectorAll('header a[href^="#"]');
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const sections = document.querySelectorAll("section[id]");
  const scrollProgress = document.querySelector(".scroll-progress");

  // Update scroll progress indicator
  window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + "%";

    // Update active menu items
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id");
      }
    });

    // Update active state for desktop nav links
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });

    // Update active state for mobile nav links
    mobileLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });

  // Add smooth scroll behavior
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Get the target section
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Add a small animation to the target section
        targetSection.classList.add("section-highlight");

        // Remove mobile menu if it's open
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("open");
        mobileMenuButton.classList.remove("open");

        // Scroll to target with smooth behavior
        const headerOffset = 70; // Height of fixed header
        const targetPosition = targetSection.offsetTop - headerOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Remove highlight class after animation completes
        setTimeout(() => {
          targetSection.classList.remove("section-highlight");
        }, 1500);

        // Update URL hash without scrolling
        history.pushState(null, null, targetId);
      }
    });
  });

  // Apply the same behavior to mobile links
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Add a small animation to the target section
        targetSection.classList.add("section-highlight");

        // Close mobile menu
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("open");
        mobileMenuButton.classList.remove("open");

        // Scroll to target with smooth behavior
        const headerOffset = 70;
        const targetPosition = targetSection.offsetTop - headerOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Remove highlight class after animation completes
        setTimeout(() => {
          targetSection.classList.remove("section-highlight");
        }, 1500);

        // Update URL hash without scrolling
        history.pushState(null, null, targetId);
      }
    });
  });

  // Handle initial page load with hash
  if (window.location.hash) {
    const initialTargetId = window.location.hash;
    const initialTargetSection = document.querySelector(initialTargetId);

    if (initialTargetSection) {
      // Wait a bit for page to load properly
      setTimeout(() => {
        const headerOffset = 70;
        const targetPosition = initialTargetSection.offsetTop - headerOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }, 300);
    }
  }
});
