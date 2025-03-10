import React from 'react';
import Chart from 'react-apexcharts';

const ProfileVisitChart = () => {
  // Chart data configuration
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ],
    },
    yaxis: {
      title: {
        text: 'Visits',
      },
    },
    fill: {
      opacity: 1,
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.25,
        gradientToColors: ['#435EBE'],
        inverseColors: false,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [0, 100],
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + ' visits';
        },
      },
    },
    colors: ['#435EBE'], // Custom color for the bars
  };

  // Chart data
  const chartSeries = [
    {
      name: 'Profile Visits',
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 80, 90, 100],
    },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h4>Profile Visit</h4>
      </div>
      <div className="card-body" style={{ position: 'relative' }}>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default ProfileVisitChart;

