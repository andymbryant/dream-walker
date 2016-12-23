/*
function postDreamEntry(title, entry, type, hoursSlept, callback) {
  const newEntry = {
    url: 'localhost:8080/new-dream',
    data: {
      title: title,
      entry: entry,
      type: type,
      hoursSlept: hoursSlept
    },
    dataType: 'json',
    type: 'POST',
    success: callback
  };
  $.ajax(newEntry);
}
*/

$('#add-new-dream').click(function(event) {
    event.preventDefault();
    const title = $('#title').val();
    const entry = $('#entry').val();
    const type = $('#type').val();
    const hoursSlept = $('#hoursSlept').val();
    //console.log(title, entry, type, hoursSlept);
    postDreamEntry(title, entry, type, hoursSlept, itWorked);
});

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