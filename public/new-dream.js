/* ================================= USER INPUT CONTROL FOR DATES ================================= */

$('.date-month').change(function(event) {
  if(parseInt(this.value) < 10) {
    this.value ='0'+ this.value;
  };
});

$('.date-day').change(function(event) {
  if(parseInt(this.value) < 10) {
    this.value ='0'+ this.value;
  };
});

function addDreamRequest(title, entry, hoursSlept, type, month, day, year) {
  $.ajax({
    url: '/dreams/new',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(
      {
        title: title,
        entry: entry,
        type: type,
        hoursSlept: hoursSlept,
        created: {
          month: month,
          day: day,
          year: year
        }
      }
    ),

    success: function(data) {
      console.log(data)
    },

    error: function(err) {
      console.log(err);
    }
  });
}

function addNewDream() {
  const dreamTitle = $('#dream-title').val().trim();
  const dreamEntry = $('.dream-entry').val().trim();
  const hoursSlept = $('.hours-slept-input').val();
  const dreamTypeSelect = $('input[type=radio]:checked').val();
  let dreamTypeChoice;

  if (dreamTypeSelect === '0') {
    dreamTypeChoice = 'Normal';
  }
  else if (dreamTypeSelect === '1') {
    dreamTypeChoice = 'Lucid';
  }
  else if (dreamTypeSelect === '2') {
    dreamTypeChoice = 'Nightmare';
  }
  else if (dreamTypeSelect === '3') {
    dreamTypeChoice = 'Recurring';
  }
  else if (dreamTypeSelect === '4') {
    dreamTypeChoice = 'Double';
  }

  const dreamMonth = $('.date-month').val();
  const dreamDay =  $('.date-day').val();
  const dreamYear = $('.date-year').val();

  addDreamRequest(dreamTitle, dreamEntry, hoursSlept, dreamTypeChoice, dreamMonth, dreamDay, dreamYear);

}

/* ================================= RESPONSIVE NAV ================================= */

$('.handle').on('click', function(event) {
  $('nav ul').toggleClass('showing');
});



$('form').submit(function(event) {
  event.preventDefault();
  addNewDream();
});