

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

//This function is breaking all of the event handlers on my page for some reason
function addUser(firstName, lastName, username, password, callback) {
  $.ajax({
    url: "/users",
    contentType: 'application/json',
    type: 'POST',
    dataType: 'json',
    data: JSON.stringify(
      {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password
      }
    ),
    success: function(data) {
      console.log(`User ${username} successfully created`);
      callback();
    },
    error: function() {
      console.log("SOMETHING WENT WRONG!!!");
    }
  });
}

function replaceSignUp() {
  $('.sign-up-title').html('Thank you for signing up!');
  $('.sign-up-box').html('<p>Please click below to log in.</p>' +
    '<a href="#log-in" class="login2"><p class="log-in-button2">Log in</p></a>');
}

// Test to make sure I've selected correctly
$('.sign-up-button').on('click', function(event) {
  event.preventDefault();
  let firstName = $('.register').find('#firstName').val();
  let lastName = $('.register').find('#lastName').val();
  let username = $('.register').find('#username').val();
  let password = $('.register').find('#password').val();
  addUser(firstName, lastName, username, password, replaceSignUp);
});