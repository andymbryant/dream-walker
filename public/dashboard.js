const LINE_CHART = $("#lineChart");
const DOUGHNUT_CHART = $("#doughnutChart");

Chart.defaults.global.animation.duration = 2500;

const sleepChart = new Chart(LINE_CHART, {
  type: 'line',
  data: {
    labels: ["12.01.16", "12.02.16", "12.03.16", "12.04.16", "12.05.16", "12.06.16", "12.07.16", "12.08.16", "12.09.16", "12.10.16", "12.11.16", "12.12.16", "12.13.16", "12.14.16"],
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
        data: [7, 9, 6, 8, 8, 5, 7, 3, 9, 8, 7, 7, 8, 6],
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