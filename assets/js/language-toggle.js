document.addEventListener("DOMContentLoaded", function () {
  // Function to toggle language and store preference
  function toggleLanguage() {
    var btn = document.getElementById("language-btn");
    var isEnglish = btn.classList.contains("active");

    // Determine the current language and switch accordingly
    if (isEnglish) {
      // Switch to Greek
      localStorage.setItem('language', 'GR');
      switchLanguageToGreek();
    } else {
      // Switch to English
      localStorage.setItem("language", "EN");
      switchLanguageToEnglish();
    }
  }

  // Function to switch language to English
  function switchLanguageToEnglish() {
    var currentPath = window.location.pathname;
    var newPath;
    if (currentPath.endsWith("/index_gr.html")) {
      newPath = currentPath.replace("/index_gr.html", "/index.html");
    } else if (currentPath.includes("/html_gr/")) {
      newPath = currentPath.replace("/html_gr/", "/html_eng/");
    } else {
      newPath = currentPath;
    }
    
    if (newPath !== currentPath) {
      window.location.href = newPath;
    }
  }

  // Function to switch language to Greek
  function switchLanguageToGreek() {
    var currentPath = window.location.pathname;
    var newPath;

    if (currentPath.endsWith('/') || currentPath.endsWith('/index.html')) {
      newPath = currentPath.replace('/index.html', '/index_gr.html');
      if (newPath.endsWith('/')) {
        newPath += 'index_gr.html';
      }
    } else if (currentPath.includes('/html_eng/')) {
      newPath = currentPath.replace('/html_eng/', '/html_gr/');
    } else {
        newPath = currentPath;
    }

    if (newPath !== currentPath) {
      window.location.href = newPath;
    }
  }

  // Function to initialize language toggle based on saved preference
  function initializeLanguageToggle() {
    var savedLanguage = localStorage.getItem("language");
    var btn = document.getElementById("language-btn");
    var langEn = document.getElementById("lang-en");
    var langGr = document.getElementById("lang-gr");

    // Set initial language based on saved preference or default to English
    var isEnglish = savedLanguage === "EN" || !savedLanguage; // Default to English if no preference is saved

    // Update UI based on initial language
    btn.classList.toggle("active", isEnglish);
    langEn.classList.toggle("active-lang", isEnglish);
    langGr.classList.toggle("active-lang", !isEnglish);

    // Update content of text elements based on the saved language
    var elements = document.querySelectorAll("[data-gr]");
    elements.forEach(function (el) {
      var enText = el.getAttribute("data-en") || el.textContent.trim();
      var grText = el.getAttribute("data-gr").trim();
      el.textContent = isEnglish ? enText : grText; // Update text content based on the saved language
    });

    // Check if the current path matches the saved language
    var currentPath = window.location.pathname;
    if (isEnglish && (currentPath.endsWith("/index_gr.html") || currentPath.includes("/html_gr/"))) {
      switchLanguageToEnglish();
    } else if (!isEnglish && (currentPath.endsWith("/") || currentPath.endsWith("/index.html") || currentPath.includes("/html_eng/"))) {
      switchLanguageToGreek();
    }
  }

  // Event listener for the language toggle button
  var languageBtn = document.getElementById("language-btn");
  if (languageBtn) {
    languageBtn.addEventListener("click", toggleLanguage);
  }

  // Initialize language toggle on page load
  initializeLanguageToggle();
});
