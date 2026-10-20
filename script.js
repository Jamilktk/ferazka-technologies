
// ==========================================
// FERAZKA TECHNOLOGIES
// Website JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. MOBILE NAVIGATION
  const menuToggle = document.getElementById("menu-toggle");
  const navigation = document.getElementById("primary-navigation");
  const navLinks = navigation
    ? navigation.querySelectorAll("a")
    : [];

  function closeMenu() {
    if (!menuToggle || !navigation) return;

    menuToggle.classList.remove("active");
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    // Close the menu after selecting a navigation link
    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close the menu when clicking outside it
    document.addEventListener("click", (event) => {
      const clickedInsideNavigation = navigation.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideNavigation && !clickedToggle) {
        closeMenu();
      }
    });

    // Close the menu when switching to desktop layout
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });

    // Close the menu when Escape is pressed
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });
  }


  // 2. STICKY HEADER SCROLL EFFECT
  const header = document.getElementById("site-header");

  function updateHeader() {
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 20);
  }

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });


  // 3. AUTOMATIC COPYRIGHT YEAR
  const currentYear = document.getElementById("current-year");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  // 4. CONTACT FORM DEMO
  // IMPORTANT:
  // This demo does NOT send emails.
  // Connect the form to Formspree before launching the website.




const contactForm = document.getElementById("contact-form");
const formNotice = document.getElementById("form-notice");

if (contactForm && formNotice) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const submitButton = contactForm.querySelector(
      'button[type="submit"]'
    );

    const originalButtonText = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    formNotice.textContent = "";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        formNotice.textContent =
          "Message sent successfully! Thank you for contacting FERAZKA Technologies.";
        contactForm.reset();
      } else {
        formNotice.textContent =
          "Sorry, your message could not be sent. Please try again.";
      }
    } catch (error) {
      formNotice.textContent =
        "A connection error occurred. Please try again.";
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  });
}





  // 5. SMOOTH SCROLL FOR INTERNAL LINKS
  // CSS already enables smooth scrolling.
  // This section closes the mobile menu when links are selected,
  // so no duplicate scrolling logic is needed.

  console.log("FERAZKA Technologies website initialized.");
});
