/* ================================= GET DREAMS =================================*/

function getDreamEntries(callbackFn) {
  $.ajax({
    url: "/dreams/json",
    type: 'GET',
    dataType: 'json',

    success: function(data) {
      if(data) {
        var results = data;
        callbackFn(results);
      }
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
        '<dt id="'+ data[index].id +'" class="animated"><p class="dream-title">' + data[index].title + '</p>' +
        '<p class="dream-date">' + data[index].created + '</p></dt>' +
        '<dd class="animated"><blockquote>' + data[index].entry + '</blockquote>' +
        '<p class="dream-info">Hours Slept: ' + '<span class="stats">' + data[index].hoursSlept + '</span></p>' +
        '<p class="dream-info">Dream Type: ' + '<span class="stats">' + data[index].type + '</span></p>' +
        '<a href="/dreams/'+ data[index].id +'"><p class="dream-info edit-button">Edit</p></a>' +
        '<p class="dream-info delete-button">Delete</p>' +
        '</dd>'
        );
    }

    accordion.find('dd').hide();
    accordion.find('dt').on('click', function(event) {
      $(this).toggleClass('open').next('dd').slideToggle().siblings('dd:visible').slideUp().prev('dt').removeClass('open');
    });

    $('.delete-button').on('click', function(event) {
      const dreamId = $(this).closest('dd').prev('dt').attr('id');
      $(this).closest('dd').prev().addClass('fadeOut');
      $(this).closest('dd').addClass('fadeOut');

      $.ajax({
        url: `/dreams/${dreamId}/json`,
        type: 'DELETE',
        dataType: 'json',

        success: function(data) {
            console.log('successfully deleted');
        },

        error: function() {
          console.log('something went wrong');
        }
      });

      setTimeout(function(){
        location.reload(true);
      }, 700);

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