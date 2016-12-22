function getDreamEntries(callbackFn) {
  $.ajax({
    url: "/dreams/demo",
    async: true,
    type: 'GET',
    dataType: 'json',

    success: function(data) {
      dateArray = [];
      hoursArray = [];
      if(data) {
        for (var i = 0; i < data.length; i++) {
          dateArray.unshift(data[i].created);
          hoursArray.unshift(data[i].hoursSlept);
        }

        console.log(dateArray);
    //    callbackFn(data);

      const sleepChart = new Chart(LINE_CHART, {
        type: 'line',
        data: {
          labels: dateArray,
          datasets: [
            {
              label: "Hours Slept",
              fill: true,
              lineTension: 0,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 3,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 3,
              pointRadius: 5,
              pointHitRadius: 10,
              data: hoursArray,
              spanGaps: false,
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });

      }
    },

    error: function() {
      console.log('something went wrong');
    }
  });
}



// function getDreamDates(data) {
// //  let dateArray = [];
//   for (var i = 0; i < data.length; i++) {
//     dateArray.unshift(data[i].created);
//     //sleepChart.config.data.labels.unshift(data[i].created);
//   }
// //  console.log(dateArray);
// //  return dateArray;
// }

const LINE_CHART = $("#lineChart");
const DOUGHNUT_CHART = $("#doughnutChart");

Chart.defaults.global.animation.duration = 2500;


const dreamChart = new Chart(DOUGHNUT_CHART, {
  type: 'doughnut',
  data: {
    labels: ['Normal', 'Lucid', 'Nightmare', 'Recurring', 'Double'],
    datasets:[
      {
        label: 'Points',
        backgroundColor: ['#54c6ff', '#ff7ae0', '#bc7aff', '#fffc7a', '#7afffc'],
        data:[10, 20, 55, 30, 10]
      }
    ]
  }
});

$(function() {
  getDreamEntries();
});