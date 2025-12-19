// Typewriter Effect
const texts = [
    "Full-Stack Developer",
    "Computer Engineer",
    "AI Enthusiast",
    "Community Leader"
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.getElementById("typewriter").textContent = letter;

    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000); // Wait 2 seconds before deleting/next word (simplified for loop)
    } else {
        setTimeout(type, 100);
    }
})();

// Sticky Navbar Background
window.addEventListener("scroll", function() {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(15, 23, 42, 0.95)";
        navbar.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
    } else {
        navbar.style.background = "rgba(15, 23, 42, 0.8)";
        navbar.style.boxShadow = "none";
    }
});

// Mobile Menu Toggle (Basic implementation)
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    // Toggle functionality for mobile would go here
    // For this demo, we'll just alert or console log
    // In a real scenario, you'd toggle a class like 'active' on navLinks
    if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
    } else {
        navLinks.style.display = "flex";
        navLinks.style.flexDirection = "column";
        navLinks.style.position = "absolute";
        navLinks.style.top = "70px";
        navLinks.style.right = "0";
        navLinks.style.background = "#0f172a";
        navLinks.style.width = "100%";
        navLinks.style.padding = "2rem";
    }
});