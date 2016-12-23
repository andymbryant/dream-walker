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

function displayDream(data) {
  //add html values here
}

$(function() {
  getDreamEntries(displayDream);
});