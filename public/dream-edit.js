/* ================================= GET DREAM TO EDIT =================================*/

function getDreamEntries(callbackFn) {
  let fullPathName = window.location.pathname;
  let dreamId = fullPathName.slice(8);

  $.ajax({
    url: `/dreams/${dreamId}/json`,
    type: 'GET',
    dataType: 'json',

    success: function(data) {
      if(data) {
        callbackFn(data);
      }
    }
  });
}

/* ================================= FILL FORM WITH DATE =================================*/

function displayDream(data) {
  let dreamType;
  if (data.type === "Normal") {
    dreamType = '0';
  }
  else if (data.type === "Lucid") {
    dreamType = '1';
  }
  else if (data.type === "Nightmare") {
    dreamType = '2';
  }
  else if (data.type === "Recurring") {
    dreamType = '3';
  }
  else if (data.type === "Double") {
    dreamType = '4';
  }
  else {
    dreamType = '';
  }

  $('#dream-title').val(data.title);
  $('.dream-entry').val(data.entry);
  $('.hours-slept-input').val(data.hoursSlept);
  $('.dream-type-box').find(':radio[name=type-of-dream][value='+ dreamType +']').prop('checked', true);
  $('.date-month').val(data.created.split('.')[0]);
  $('.date-day').val(data.created.split('.')[1]);
  $('.date-year').val(data.created.split('.')[2]);
}

/* ================================= CONTROL USER INPUT FOR DATES =================================*/

$('.date-day').change(function(event) {
  if(parseInt(this.value) < 10) {
    this.value ='0'+ this.value;
  };
});

$('.date-month').change(function(event) {
  if(parseInt(this.value) < 10) {
    this.value ='0'+ this.value;
  };
});

/* ================================= IIFE =================================*/

$(function() {
  getDreamEntries(displayDream);
});

/* ================================= PUT REQUEST AJAX ====================================== */

function editDetails(id, title, entry, type, hoursSlept, month, day, year) {
  let fullPathName = window.location.pathname;
  let dreamId = fullPathName.slice(8);

  $.ajax({
    url: `/dreams/${dreamId}/json`,
    contentType: 'application/json',
    type: 'PUT',
    dataType: 'json',
    data: JSON.stringify(
      {
        id: id,
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
      $('form').addClass('fadeOut');
      setTimeout(function(){
        window.location.replace("/dreams");
      }, 900);

    }
  });
}

/* ================================ GET DATA FOR PUT REQUEST ============================== */

function editDream(callback) {
  let fullPathName = window.location.pathname;

  const dreamId = fullPathName.slice(8);
  const dreamTitle = $('#dream-title').val().trim();
  const dreamEntry = $('.dream-entry').val().trim();
  const hoursSlept = $('.hours-slept-input').val();
  const dreamTypeSelect = $('input[type=radio]:checked').val();
  let dreamTypeChoice;
  const dreamMonth = $('.date-month').val();
  const dreamDay =  $('.date-day').val();
  const dreamYear = $('.date-year').val();

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

  editDetails(dreamId, dreamTitle, dreamEntry, dreamTypeChoice, hoursSlept, dreamMonth, dreamDay, dreamYear);
}

/* ================================ FORM SUBMIT ============================== */

$('form').submit(function(event) {
  event.preventDefault();
  editDream();
});