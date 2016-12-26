/* ================================= GET DREAM TO EDIT =================================*/

function getDreamEntries(callbackFn) {
  const fullPathName = window.location.pathname;
  const dreamId = fullPathName.slice(8);

  $.ajax({
    url: `/dreams/${dreamId}/json`,
    type: 'GET',
    dataType: 'json',

    success: function(data) {
      if(data) {
      //  console.log(data);
        callbackFn(data);
      }
    },

    error: function() {
      console.log('something went wrong');
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

function editDetails(title, entry, type, hoursSlept) {
  const fullPathName = window.location.pathname;
  const dreamId = fullPathName.slice(8);

  $.ajax({
    url: `/dreams/${dreamId}/json`,
    contentType: 'application/json',
    type: 'PUT',
    dataType: 'json',
    data: JSON.stringify(
      {
      title: title,
      entry: entry,
      type: type,
      hoursSlept: hoursSlept
      }
    ),
    success: function(data) {
      console.log('SUCCESS');
    },
    error: function() {
      console.log("SOMETHING WENT WRONG!!!");
    }
  });
}

function editDream(callback) {
  const dreamTitle = $('#dream-title').val();
  const dreamEntry = $('.dream-entry').val();
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

  editDetails(dreamTitle, dreamEntry, dreamTypeChoice, hoursSlept);


}

$('form').submit(function(event) {
  event.preventDefault();
  editDream();
});