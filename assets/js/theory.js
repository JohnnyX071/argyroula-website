// Function to scroll to a specific unit
function scrollToUnit(unitId) {
  // Get the element by its ID
  var element = document.getElementById(unitId);

  // Check if the element exists
  if (element) {
    // Scroll smoothly to the element
    element.scrollIntoView({ behavior: "smooth" });
  }
}

// Function to toggle sidebar visibility
document.addEventListener("DOMContentLoaded", function () {
  // Create toggle button
  const sidebarToggle = document.createElement("button");
  sidebarToggle.className = "sidebar-toggle";
  document.body.appendChild(sidebarToggle);

  // Get sidebar reference
  const sidebar = document.querySelector(".theory-sidebar");

  // Toggle sidebar
  sidebarToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    sidebar.classList.toggle("active");
    sidebarToggle.classList.toggle("active");
  });

  // Close sidebar when clicking outside
  document.addEventListener("click", function (e) {
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
      sidebar.classList.remove("active");
      sidebarToggle.classList.remove("active");
    }
  });

  // Prevent sidebar clicks from closing
  sidebar.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});
