// Implement switching between Light Theme and Dark Theme upon clicking the toggle
const toggle = document.getElementById("hidden-checkbox");
const body = document.querySelector("body");
toggle.addEventListener("click", changeTheme);
function changeTheme() {
  if (toggle.checked) {
    body.classList.add("theme-light");
    body.classList.remove("theme-dark");  
  } else {
    body.classList.remove("theme-light");
    body.classList.add("theme-dark");  
  }
}

// Implement showing and hiding the search box upon clicking the search button on the nav bar
const searchButton = document.getElementById("search-button");
const searchBox = document.getElementById("input-search");
searchButton.onclick = toggleSearchBox;
function toggleSearchBox() {
  // Only do the switch if both classes are present or both are absent. This should prevent issues when the button is clicked before the transition animation completes.
  if ((searchBox.classList.contains("visible")) && (searchBox.classList.contains("wide"))) {
    searchBox.classList.remove("wide");
    setTimeout(() => {searchBox.classList.remove("visible");}, 200); // Wait for the transition animation to complete, then hide the search box
  } else if ((!searchBox.classList.contains("visible")) && (!searchBox.classList.contains("wide"))) {
    searchBox.classList.add("visible");
    setTimeout(() => {searchBox.classList.add("wide");}, 10); // Wait for the search box to become visible, then start the transition animation
  }
}

// Implement sticky header
window.onscroll = handleStickyHeader;
const header = document.querySelector("header");
const sticky = header.offsetTop;
function handleStickyHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// Implement onclick functionality for the arrow button (it should scroll towards the Trends section)
const arrowButton = document.getElementById("scroll-down-button");
const trendsSection = document.getElementById("trends");
arrowButton.onclick = scrollToTrends;
function scrollToTrends() {
  trendsSection.scrollIntoView({behavior: "smooth"});
}


// Implement the onclick functionality for all product articles on the main page
const allMainPageProducts = document.querySelectorAll("article.product-main");
allMainPageProducts.forEach(handleClick);
const mainSection = document.getElementById("main-page"); // Used later for scrolling;
function handleClick(element) {
  element.onclick = activateOrDeactivate;
}
function activateOrDeactivate() {
  if (this.classList.contains("active")) {
    // If the clicked product is active, deactivate it
    this.classList.remove("active");
  } else {
    // If the clicked product is inactive, deactivate all products then activate the one that got clicked
    deactivateAllProducts();
    this.classList.add("active");
    // Also scroll the document to the very top
    mainSection.scrollIntoView({behavior: "smooth"});
  }
}
function deactivateAllProducts() {
  allMainPageProducts.forEach(deactivateProduct);
}
function deactivateProduct(element) {
  element.classList.remove("active");
}


// Implement horizontal scrolling with mouse wheel for all scrollable containers
const allScrollableContainers = document.querySelectorAll(".scrollable-container");
allScrollableContainers.forEach(handleScrolling);
function handleScrolling(element) {
  element.onwheel = scrollHandler;
}
function scrollHandler(event) {
  event.preventDefault();
  // Calculate the maximum possible value of scrollLeft for this container
  let maxScrollLeft = this.scrollWidth - this.clientWidth;
  if (((this.scrollLeft === 0) && (event.deltaY < 0)) || ((Math.ceil(this.scrollLeft) >= maxScrollLeft) && (event.deltaY > 0))) {
    // If (the contaner is scrolled to its minimum and the user scrolls upwards) or (the contaner is scrolled to its maximum and the user scrolls downwards),
    // scroll the document window instead of the container
    window.scrollBy(0, (event.deltaY * 3));
  } else {
    // Scroll the container
    this.scrollLeft += event.deltaY;
  }
}

 
// Implement the countdown timer
// Set the timer to the current time plus 3 hours
var countDownTime = new Date().getTime();
countDownTime += (1000 * 3 * 60 * 60);

// Get the HTML elements that we'll use to display hours, minutes and seconds
const hoursDisplay = document.getElementById("hours-left");
const minutesDisplay = document.getElementById("minutes-left");
const secondsDisplay = document.getElementById("seconds-left");

// Update the count down every 1 second
const saleTimer = setInterval(function() {
  
  // Get today's date and time
  let now = new Date().getTime();

  // Find the distance between now and the count down date. Math.max ensures that the result never gets less than zero
  let distance = Math.max((countDownTime - now), 0);

  // Time calculations for hours, minutes and seconds
  let hours = Math.floor((distance % (86400000)) / (3600000));   // Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  let minutes = Math.floor((distance % (3600000)) / (60000));    // Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  let seconds = Math.floor((distance % (60000)) / 1000);         // Math.floor((distance % (1000 * 60)) / 1000)

  function twoDigits(timeComponent) {
    // Turn "1" into "01", etc.
      if ((timeComponent >= 0) && (timeComponent <= 9)) {
        timeComponent = "0" + timeComponent;
      }
    return timeComponent;
  }

  // Display the result in the HTML elements
  hoursDisplay.innerHTML = twoDigits(hours);
  minutesDisplay.innerHTML = twoDigits(minutes);
  secondsDisplay.innerHTML = twoDigits(seconds);

  // If the countdown is finished, change the header and stop the count
  if (distance < 1000) {
    clearInterval(saleTimer);
    document.getElementById("countdown-header").innerHTML = "EXPIRED";
  }
}, 1000);


// Implement inserting the current year into the copyright text
const copyrightYear = document.getElementById("copyright-year");
copyrightYear.innerHTML = new Date().getFullYear();