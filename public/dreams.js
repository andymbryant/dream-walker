/* ================================= GET DREAMS =================================*/

function getDreamEntries(callbackFn) {
  $.ajax({
    url: "/dreams/demo",
    type: 'GET',
    dataType: 'json',

    success: function(data) {
      if(data) {
        var results = data;
        console.log(results);
        callbackFn(results);
      }
    },

    error: function() {
      console.log('something went wrong');
    }
  });
}

function displayDreamEntries(data) {
  const accordion = $('.accordion');

  if (data.length === 0) {
    accordion.html('<h2 class="no-results">You haven\'t recorded any dreams! Click "Add New Dream" in the menu to get started.</h2>');
  }
  else {
    for (index in data) {
      accordion.append(
        '<dt id="'+ data[index].id +'"><p class="dream-title">' + data[index].title + '</p>' +
        '<p class="dream-date">' + data[index].created + '</p></dt>' +
        '<dd><blockquote>' + data[index].entry + '</blockquote>' +
        '<p class="dream-info">Hours Slept: ' + '<span class="stats">' + data[index].hoursSlept + '</span></p>' +
        '<p class="dream-info">Dream Type: ' + '<span class="stats">' + data[index].type + '</span></p>' +
        '<p class="dream-info"><a href="dream-edit.html" class="edit-button">Edit</a></p>' +
        '<p class="dream-info"><a href="#" class="delete-button">Delete</a></p>' +
        '</dd>'
        );
    }

    accordion.find('dd').hide();
    accordion.find('dt').on('click', function(event) {
      $(this).toggleClass('open').next('dd').slideToggle().siblings('dd:visible').slideUp().prev('dt').removeClass('open');
    });

    $('.edit-icon').on('click', function(event) {
      alert('hi');
    });
  }
}

function getAndDisplayDreamEntries() {
  getDreamEntries(displayDreamEntries);
}

/* ================================= IIFE =================================*/

$(function() {
  getAndDisplayDreamEntries();
  //  getDreamEntries();
});

/* ================================= RESPONSIVE NAVIGATION =================================*/

$('.handle').on('click', function(event) {
  $('nav ul').toggleClass('showing');
});