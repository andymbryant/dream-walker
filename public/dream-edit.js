/* ================================= GET DREAM TO EDIT =================================*/

function getDreamEntries(callbackFn) {
  const dreamId =
  $.ajax({
    url: "/dreams/585ec498896c0176f5203563",
    type: 'GET',
    dataType: 'json',

    success: function(data) {
      if(data) {
    //    console.log(data);
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
  console.log(data);
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