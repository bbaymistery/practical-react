import React from "react";
import { Pie, defaults, Bar, Line } from "react-chartjs-2";

defaults.plugins.tooltip.enabled = false;
defaults.plugins.legend.position = "bottom";

const BarChart = () => {
  return (
    <div>
      <Line
        data={{
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "# of votes",
              data: [52, 59, 3, 5, 2, 3],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
            //second obj
            {
              label: "Quantity",
              data: [47, 52, 67, 58, 9, 50],
              backgroundColor: "orange",
              borderColor: "red",
              borderWidth: 2,
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false, //scrolbar icin
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 24,
                  weight: "bold",
                },
              },
            },
          },
          layout: {
            padding: 3,
          },
        }}
      />
    </div>
  );
};

export default BarChart;
