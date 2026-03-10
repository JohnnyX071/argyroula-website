document.addEventListener("DOMContentLoaded", function () {
  const servicesSection = document.querySelector("#services-section");
  const dotsContainer = document.querySelector(".dots-container");
  const serviceBoxes = document.querySelectorAll(".service-box");

  if (window.matchMedia("(max-width: 768px)").matches) {
    // Create dots
    serviceBoxes.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.className = `dot${index === 0 ? " active" : ""}`;
      dot.addEventListener("click", () => {
        const scrollPos = serviceBoxes[index].offsetLeft - servicesSection.offsetLeft;
        servicesSection.scrollTo({
          left: scrollPos,
          behavior: "smooth",
        });
      });
      dotsContainer.appendChild(dot);
    });

    // Update active dot
    servicesSection.addEventListener("scroll", () => {
      const scrollCenter = servicesSection.scrollLeft + servicesSection.offsetWidth / 2;
      serviceBoxes.forEach((box, index) => {
        const boxStart = box.offsetLeft;
        const boxEnd = boxStart + box.offsetWidth;
        dotsContainer.children[index].classList.toggle("active", scrollCenter >= boxStart && scrollCenter <= boxEnd);
      });
    });
  }
});
