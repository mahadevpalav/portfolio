const header = document.getElementById("header");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const revealItems = document.querySelectorAll(".reveal");
const bars = document.querySelectorAll(".bar");
const menuBtn = document.getElementById("menuBtn");
const navLinksWrap = document.getElementById("navLinks");
const scrollProgress = document.getElementById("scrollProgress");
const yearSpan = document.getElementById("year");

menuBtn.addEventListener("click", () => {
  navLinksWrap.classList.toggle("open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => navLinksWrap.classList.remove("open"));
});

function updateScrollUI() {
  const y = window.scrollY;
  header.classList.toggle("scrolled", y > 20);

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (y / docHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollUI);
updateScrollUI();

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  { threshold: 0.55 }
);

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => revealObserver.observe(item));

let barsAnimated = false;
const skillsSection = document.getElementById("skills");

const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || barsAnimated) return;
      barsAnimated = true;
      bars.forEach((bar) => {
        bar.style.width = bar.dataset.width || "0%";
      });
    });
  },
  { threshold: 0.35 }
);

if (skillsSection) skillsObserver.observe(skillsSection);

if (yearSpan) yearSpan.textContent = new Date().getFullYear();
