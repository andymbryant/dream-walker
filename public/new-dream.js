$('.date-day').change(function(event) {
  if(parseInt(this.value) < 10) {
    this.value ='0'+ this.value;
  };
});

$('.handle').on('click', function(event) {
  $('nav ul').toggleClass('showing');
});