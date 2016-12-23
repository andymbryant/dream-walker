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

// this function stays the same when we connect
// to real API later
function displayDreamEntries(data) {
  const accordion = $('.accordion');

  if (data.length === 0) {
    accordion.html('<h2 class="no-results">You haven\'t recorded any dreams! Click "New Dream" in the menu to get started.</h2>');
  }
  else {
    for (index in data) {
      accordion.append(
        '<dt id="'+ data[index].id +'"><p class="dream-title">' + data[index].title + '</p>' +
        '<p class="dream-date">' + data[index].created + '</p></dt>' +
        '<dd><blockquote>' + data[index].entry + '</blockquote>' +
        '<p class="dream-info">Hours Slept: ' + '<span class="stats">' + data[index].hoursSlept + '</span></p>' +
        '<p class="dream-info">Dream Type: ' + '<span class="stats">' + data[index].type + '</span></p>' +
        '<p class="dream-info"><a href="dreams/'+ data[index].id +'" class="edit-icon"><i class="fa fa-pencil fa-lg" aria-hidden="true"></i> Edit</a></p>' +
        '<p class="dream-info"><a href="#" class="edit-icon"><i class="fa fa-eraser fa-lg" aria-hidden="true"></i> Delete</a></p>' +
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

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayDreamEntries() {
  getDreamEntries(displayDreamEntries);
}


$(function() {
  getAndDisplayDreamEntries();
  //  getDreamEntries();
});