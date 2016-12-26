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

/* ================================= RESPONSIVE NAV ================================= */

$('.handle').on('click', function(event) {
  $('nav ul').toggleClass('showing');
});