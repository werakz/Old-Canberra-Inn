const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");

// Keep the mobile navigation state mirrored for screen readers.
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });
}

const slider = document.querySelector("[data-slider]");

// The home page review slider loops through a small static quote set.
if (slider) {
  const cards = Array.from(slider.querySelectorAll(".review-card"));
  const next = slider.querySelector("[data-slider-next]");
  const prev = slider.querySelector("[data-slider-prev]");
  let index = 0;

  const showCard = (nextIndex) => {
    cards[index].classList.remove("is-active");
    index = (nextIndex + cards.length) % cards.length;
    cards[index].classList.add("is-active");
  };

  next.addEventListener("click", () => showCard(index + 1));
  prev.addEventListener("click", () => showCard(index - 1));
}

const menuButtons = document.querySelectorAll("[data-menu-filter]");
const menuCategories = document.querySelectorAll("[data-category]");

// Menu filters hide full categories while keeping the source content simple.
menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.menuFilter;

    menuButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    menuCategories.forEach((category) => {
      const shouldShow = filter === "all" || category.dataset.category === filter;
      category.hidden = !shouldShow;
    });
  });
});

const newsletter = document.querySelector("[data-newsletter]");

// Static form feedback keeps the experience polished until an email service is connected.
if (newsletter) {
  newsletter.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = newsletter.querySelector(".form-message");
    newsletter.reset();
    message.textContent = "Thanks. You are on the list.";
  });
}

const bookingForm = document.querySelector("[data-booking-form]");

// Booking requests cannot be submitted for past dates or groups under eight.
if (bookingForm) {
  const dateInput = bookingForm.querySelector('input[name="date"]');
  const today = new Date();
  const localDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
  dateInput.min = localDate;

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = bookingForm.querySelector(".form-message");
    const guests = Number(bookingForm.elements.guests.value);

    if (!bookingForm.checkValidity()) {
      message.textContent = "Please complete the required booking details.";
      bookingForm.reportValidity();
      return;
    }

    if (guests < 8) {
      message.textContent = "Bookings are available for groups of eight or more. Smaller groups are welcome to walk in.";
      bookingForm.elements.guests.focus();
      return;
    }

    message.textContent = "Booking request received. We will send a confirmation text once it is confirmed.";
    bookingForm.reset();
    bookingForm.elements.guests.value = 8;
  });
}

const contactForm = document.querySelector("[data-contact-form]");

// Contact form validation mirrors the booking form's inline feedback pattern.
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = contactForm.querySelector(".form-message");

    if (!contactForm.checkValidity()) {
      message.textContent = "Please complete the required contact details.";
      contactForm.reportValidity();
      return;
    }

    message.textContent = "Thanks. Your enquiry is ready to send once the backend is connected.";
    contactForm.reset();
  });
}
