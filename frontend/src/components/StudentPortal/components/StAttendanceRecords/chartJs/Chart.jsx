import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);



// export const BarChart = ({ attendances }) => {

//   // Group attendance records by month
//   const monthlyData = {};
//   attendances.forEach((record) => {
//     const month = new Date(record.date).getMonth(); // Get the month index (0-indexed)
//     if (!monthlyData[month]) {
//       monthlyData[month] = { absent: 0, present: 0 };
//     }
//     if (record.status === "absent") {
//       monthlyData[month].absent++;
//     } else if (record.status === "present") {
//       monthlyData[month].present++;
//     }
//   });

//   // Prepare data for the chart
//   const labels = Object.keys(monthlyData).map((month) => {
//     const monthNames = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     return monthNames[parseInt(month)]; // Convert month index to month name
//   });

//   const data = Object.values(monthlyData).reduce(
//     (acc, curr) => {
//       acc.absent.push(curr.absent);
//       acc.present.push(curr.present);
//       return acc;
//     },
//     { absent: [], present: [] }
//   );

//   const chartData = {
//     labels: labels,
//     datasets: [
//       {
//         label: "Absent",
//         data: data.absent,
//         backgroundColor: "rgba(255, 99, 132, 1.2)",
//         borderWidth: 1,
//       },
//       {
//         label: "Present",
//         data: data.present,
//         backgroundColor: "rgba(75, 192, 192, 1.2)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     indexAxis: "x", // Display bars horizontally
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "bottom",
//       },
//       title: {
//         display: true,
//         text: "Monthly Attendance Status",
//       },
//     },
//   };

//   return <Pie options={options} data={chartData} />;
// };




export const DoughNutChart = ({ data }) => {
  const labels = ["Absent", "Present"];

  const Attdata = {
    labels,
    datasets: [
      {
        label: "Days",
        data: Object.values(data), // object because we have to pass an array if data absent and present so Object.values convert that objects to array
        borderColor: ["rgb(181, 94, 88)", "rgb(141, 90, 221)"],
        backgroundColor: ["rgb(181, 94, 88)", "rgb(141, 90, 221)"],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={Attdata} />;
};
