$(document).ready(function () {
  var w = window.innerWidth;

  if (w > 767) {
    $("#menu-jk").scrollToFixed();
  } else {
    $("#menu-jk").scrollToFixed();
  }
});

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    autoplay: true,
    dots: true,
    autoplayTimeout: 5000,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });
});

// Publications
var buttons = document.querySelectorAll(".btn");
var expandedContainer = document.querySelector(".expanded-container");
var expandedContent = document.querySelector(".expanded-content");
var closeBtn = document.querySelector(".close-btn");

if (buttons.length > 0 && expandedContainer && expandedContent) {
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var category = this.closest(".category");
      if (category) {
        var categoryContent = category.querySelector(".category-content");
        if (categoryContent) {
          var content = categoryContent.innerHTML;
          // Populate expanded content with the content of the clicked category
          expandedContent.innerHTML = content;
          // Show expanded container
          expandedContainer.style.display = "block";
          // Auto-scroll to expanded container (scroll to center of viewport)
          expandedContainer.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    });
  });
}

// Close expanded container when close button is clicked
if (closeBtn) {
  closeBtn.addEventListener("click", function () {
    if (expandedContainer) {
      expandedContainer.style.display = "none";
    }

    // Reset all category buttons to "Explore Resources"
    if (buttons) {
      buttons.forEach(function (button) {
        button.textContent = "Explore Resources";
      });
    }
  });
}
