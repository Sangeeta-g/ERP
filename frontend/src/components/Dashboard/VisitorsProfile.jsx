// import React from 'react';
// import Chart from 'react-apexcharts';

// const VisitorsProfile = () => {
//   // Chart data configuration
//   const chartOptions = {
//     chart: {
//       type: 'donut',
//     },
//     labels: ['Male', 'Female'], // Labels for the donut chart
//     colors: ['#435EBE', '#55C6E8'], // Custom colors for the chart
//     legend: {
//       position: 'bottom', // Position of the legend
//     },
//     responsive: [
//       {
//         breakpoint: 480,
//         options: {
//           chart: {
//             width: 200,
//           },
//           legend: {
//             position: 'bottom',
//           },
//         },
//       },
//     ],
//     dataLabels: {
//       enabled: true, // Show data labels on the chart
//       style: {
//         fontSize: '12px',
//         fontWeight: 'bold',
//         colors: ['#fff'], // White color for data labels
//       },
//     },
//     plotOptions: {
//       pie: {
//         donut: {
//           size: '60%', // Adjust the size of the donut hole
//         },
//       },
//     },
//   };

//   // Chart data
//   const chartSeries = [70, 30]; // Data for Male and Female

//   return (
//     <div className="card">
//       <div className="card-header">
//         <h4>Visitors Profile</h4>
//       </div>
//       <div className="card-body" style={{ position: 'relative' }}>
//         <Chart
//           options={chartOptions}
//           series={chartSeries}
//           type="donut"
//           height={350}
//         />
//       </div>
//     </div>
//   );
// };

// export default VisitorsProfile;

import React from "react";
import Chart from "react-apexcharts";

const VisitorsProfile = () => {
  // Chart data configuration
  const chartOptions = {
    chart: {
      type: 'donut',
    },
    labels: ['Male', 'Female'],
    colors: ['#435EBE', '#55C6E8'],
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        fontWeight: 'bold',
        colors: ['#fff'],
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
        },
        customScale: 1, // Adjust the size of the chart
      },
    },
    stroke: {
      width: 2,
      colors: ['#fff'], // White border around segments
    },
  };

  // Chart data
  const chartSeries = [70, 30]; // Data for Male and Female

  return (
    <div className="card">
      <div className="card-header">
        <h4>Visitors Profile</h4>
      </div>
      <div className="card-body text-center">
        <Chart options={chartOptions} series={chartSeries} type="donut" height={350} />
        {/* Custom Legend */}
        <div className="mt-3 d-flex justify-content-center gap-3">
          <div className="d-flex align-items-center">
            <span
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: "#435EBE",
                display: "inline-block",
                borderRadius: "50%",
                marginRight: "5px",
              }}
            ></span>
            <span>Male</span>
          </div>
          <div className="d-flex align-items-center">
            <span
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: "#55C6E8",
                display: "inline-block",
                borderRadius: "50%",
                marginRight: "5px",
              }}
            ></span>
            <span>Female</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorsProfile;
