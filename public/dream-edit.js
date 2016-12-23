function getDreamEntries(callbackFn) {
  $.ajax({
    url: "/dreams/585d5338b41a4f62ec044af6",
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


function displayDream(data) {
  console.log(data);

  $('#dream-title').val(data.title);
  $('.dream-entry').val(data.entry);
  $('.hours-slept-input').val(data.hoursSlept);
  $('.date-month').val(data.created.split('.')[0]);
  $('.date-day').val(data.created.split('.')[1]);
  $('.date-year').val(data.created.split('.')[2]);
}


$(function() {
  getDreamEntries(displayDream);
});