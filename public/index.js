

// Smooth scroll to top
$('.nav-brand').click(function(event) {
  event.preventDefault();
    $('body,html').animate({
      scrollTop: 0
    }, 800
    );
});

// Add smooth scrolling to navbar links
$("a").on('click', function(event) {
  if (this.hash !== "") {
    event.preventDefault();
    var hash = this.hash;
    $('html, body').animate({
        scrollTop: $(hash).offset().top-55
    }, 800, 'swing', function(){
      window.location.hash = hash;
    });
  }
});

$('.modal-close').on('click', function(event) {
  $('.modal').addClass('modal-close');
});

$('.log-in').on('click', function(event) {
  event.preventDefault();
  $('.modal').removeClass('modal-close');
});

$('.handle').on('click', function(event) {
  $('nav ul').toggleClass('showing');
});

$('nav ul a').on('click', function(event) {
  $('nav ul').toggleClass('showing');
});

// Toggle navigation class on scroll
$(window).scroll(function(){
    var a = 10;
    var pos = $(window).scrollTop();
    if(pos > a) {
        $('nav ul').addClass('nav-ul-scroll');
        $('.nav-brand').addClass('nav-brand-scroll');
    }
    else {
        $('nav ul').removeClass('nav-ul-scroll');
        $('.nav-brand').removeClass('nav-brand-scroll');
    }
});


// Test to make sure I've selected correctly
$('.sign-up-button').on('click', function(event) {
  alert('hi');
});

//This function is breaking all of the event handlers on my page for some reason
// function addUser() {
//   $.ajax({
//     url: "/users",
//     type: 'POST',
//     dataType: 'jsonp',
//     data: {

//     },

//     success: function(data) {
//       console.log(hi);
//     }
// }