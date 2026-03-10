// Function to animate elements when they scroll into view
document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".animate-pop");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  elements.forEach((element) => {
    observer.observe(element);
  });
});
