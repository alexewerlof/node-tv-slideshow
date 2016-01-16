var PAGE_RELOAD_INTERVAL = 3600000;
var SLIDE_CHECKUP_INTERVAL = 10000;
var SLIDE_DURATION = 3000;
var FADE_DURATION = 500;
var views = [$('#view-1'), $('#view-2')];
var viewIndex = 0;
var output = $('#output');
var listOfSlidesIndex = 0;
var listOfSlides = [];
function print(message) {
  $('<li/>', {text: (new Date).toISOString() + ' ' + message}).prependTo(output);
}
function currentView() {
  return views[viewIndex];
}
function switchView() {
  viewIndex = viewIndex ? 0 : 1;
}
// Shows the current slide
function showSlide() {
  var url = listOfSlides[listOfSlidesIndex];
  currentView().css({
    'z-index': 0
  });
  switchView();
  // Load the other slide
  currentView().css({
    opacity: 0,
    'z-index': 1,
    'background-image': 'url(' + url + ')'
  }).fadeTo(FADE_DURATION, 1, function () {
    print('Scheduling to show another slide');
    setTimeout(changeSlide, SLIDE_DURATION);
  });
}
function changeSlide() {
  if (listOfSlides.length === 1) {
    print('There is only one slide, there will be no change');
    return;
  }
  print('Switching slide');
  listOfSlidesIndex++;
  if (listOfSlidesIndex >= listOfSlides.length) {
    listOfSlidesIndex = 0;
  }
  showSlide();
}
function areArraysEqual(arr1, arr2) {
  if(arr1.length !== arr2.length) {
    return false;
  }
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}
function checkoutListOfSlides() {
  print('Checking slides on the server');
  $.get('/slides').done(function (newListOfSlides) {
    if (areArraysEqual(newListOfSlides, listOfSlides)) {
      print('Slides have not changed');
      // Check the list of slides every 10 seconds from the server
      setTimeout(checkoutListOfSlides, SLIDE_CHECKUP_INTERVAL);
    } else {
      refreshPage();
    }
  });
}
function initListOfSlides() {
  print('started');
  $.get('/slides').done(function (newListOfSlides) {
    listOfSlides = newListOfSlides;
    print('Initialized');
    if (listOfSlides.length > 0) {
      listOfSlidesIndex = 0;
      showSlide();
    } else {
      // TODO show it on the page instead of blocking with an alert
      print('No slides!');
    }
    // Check the list of slides every 10 seconds from the server
    setTimeout(checkoutListOfSlides, SLIDE_CHECKUP_INTERVAL);
  });
}
function refreshPage() {
  window.location.reload(true);
}
// Refresh the whole page every 10s invalidating the cache
setTimeout(refreshPage, PAGE_RELOAD_INTERVAL);
initListOfSlides();
