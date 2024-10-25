import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { FiCheckCircle } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";

const Dashboard = () => {
  const { id } = useParams();

  const [project,setProject] = useState({});



  useEffect(() => {
    const project = async () => {
   const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/projects/getProject/${id}`
      );
      setProject(res.data.project);
    };
    project();
  });

  const [plannedProgress, setPlannedProgress] = useState([20, 40, 60, 80, 100]);
  const [actualProgress, setActualProgress] = useState([20, 35, 75, 75, 95]);

  const totalTasks = 100;
  const completedTasks = Math.round(totalTasks * 0.6);
  const inProgressTasks = Math.round(totalTasks * 0.25);
  const pendingTasks = Math.round(totalTasks * 0.1);
  const onHoldTasks = Math.round(totalTasks * 0.05);

  const tasks = [
    "Site Preparation",
    "Foundation Work",
    "Structural Framing",
    "Plumbing & Electrical",
    "Final Inspection",
  ];

  const [plannedDurations, setPlannedDurations] = useState([
    { start: 0, end: 7 },
    { start: 8, end: 20 },
    { start: 21, end: 30 },
    { start: 31, end: 40 },
    { start: 41, end: 45 },
  ]);

  const [actualDurations, setActualDurations] = useState([
    { start: 0, end: 8 },
    { start: 9, end: 22 },
    { start: 23, end: 33 },
    { start: 34, end: 42 },
    { start: 43, end: 46 },
  ]);

  const barData = {
    labels: tasks,
    datasets: [
      {
        label: "Planned Duration",
        data: plannedDurations.map((task) => task.end - task.start),
        backgroundColor: "rgba(98, 54, 255, 0.6)",
        barThickness: 16,
      },
      {
        label: "Actual Duration",
        data: actualDurations.map((task) => task.end - task.start),
        backgroundColor: "rgba(144, 238, 144, 0.6)",
        barThickness: 16,
      },
    ],
  };

  const barOptions = {
    indexAxis: "y",
    scales: {
      x: {
        type: "linear",
        min: 0,
        max: 50,
        title: {
          display: true,
          text: "Weeks",
          font: {
            size: 18,
            weight: "bold",
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Tasks",
          font: {
            size: 18,
            weight: "bold",
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const task = tooltipItem.dataset.label;
            const duration = tooltipItem.raw;
            return `${task}: ${duration} days`;
          },
        },
      },
      legend: {
        position: "top",
        labels: {
          boxWidth: 12,
        },
      },
    },
    maintainAspectRatio: false,
  };

  const doughnutData = {
    labels: ["Completed", "In Progress", "Pending", "On Hold"],
    datasets: [
      {
        data: [completedTasks, inProgressTasks, pendingTasks, onHoldTasks],
        backgroundColor: [
          "rgb(40, 167, 69)",
          "rgb(255, 193, 7)",
          "rgb(23, 162, 184)",
          "rgb(220, 53, 69)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const doughnutOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 15,
          boxHeight: 15,
          padding: 20,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => tooltipItem.label + ": " + tooltipItem.raw,
        },
      },
    },
    cutout: "0%",
    maintainAspectRatio: false,
  };

  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    datasets: [
      {
        label: "Planned Progress",
        data: plannedProgress,
        borderColor: "rgba(98, 54, 255, 1)",
        backgroundColor: "rgba(98, 54, 255, 0.2)",
        pointBackgroundColor: "rgba(98, 54, 255, 1)",
        pointBorderColor: "rgba(255, 255, 255, 1)",
        pointHoverRadius: 10,
        pointHoverBackgroundColor: "rgba(98, 54, 255, 1)",
        pointRadius: 6,
        pointBorderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Actual Progress",
        data: actualProgress,
        borderColor: "rgba(144, 238, 144, 1)",
        backgroundColor: "rgba(144, 238, 144, 0.2)",
        pointBackgroundColor: "rgba(144, 238, 144, 1)",
        pointBorderColor: "rgba(255, 255, 255, 1)",
        pointHoverRadius: 10,
        pointHoverBackgroundColor: "rgba(144, 238, 144, 1)",
        pointRadius: 6,
        pointBorderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 12,
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          title: (tooltipItem) => `${tooltipItem[0].label}`,
          label: (tooltipItem) =>
            `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`,
        },
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleFont: {
          size: 14,
          color: "white",
        },
        bodyFont: {
          size: 12,
          color: "white",
        },
        cornerRadius: 4,
        displayColors: true,
        yAlign: "bottom",
        xAlign: "center",
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: "rgba(200, 200, 200, 0.5)",
        },
        title: {
          display: true,
          text: "Project Timeline (Weeks)",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
      y: {
        grid: {
          display: true,
          color: "rgba(200, 200, 200, 0.5)",
        },
        display: true,
        title: {
          display: true,
          text: "Progress (%)",
          font: {
            size: 16,
            weight: "bold",
          },
        },
        ticks: {
          callback: function (value) {
            return value + "%";
          },
          beginAtZero: true,
        },
        min: 0,
        max: 100,
      },
    },
    maintainAspectRatio: false,
    elements: {
      point: {
        hoverRadius: 10,
      },
    },
  };

  const getCompletionRate = () => {
    return ((completedTasks / totalTasks) * 100).toFixed(0);
  };

  const getProjectStatus = () => {
    const isOnTrack = plannedProgress.every(
      (value, index) => actualProgress[index] >= value
    );
    return isOnTrack ? "On track" : "Behind schedule";
  };

  const getMostDelayedActivity = () => {
    const delays = lineData.datasets[0].data
      .map((scheduled, index) => {
        const delay = scheduled - lineData.datasets[1].data[index];
        return delay > 0 ? delay : null;
      })
      .filter((delay) => delay !== null);

    if (delays.length === 0) {
      return "None";
    }

    const maxDelayIndex = delays.indexOf(Math.max(...delays));
    return `Week ${maxDelayIndex + 1}`;
  };

  const projectStatus = getProjectStatus();
  const completionRate = getCompletionRate();
  const mostDelayedActivity = getMostDelayedActivity();

  const handleInputChange = (e) => {
    const value = e.target.value.split(",").map(Number);
    if (e.target.name === "planned") {
      setPlannedProgress(value);
    } else if (e.target.name === "actual") {
      setActualProgress(value);
    }

    const name =
      e.target.placeholder === "Planned Duration" ? "planned" : "actual";

    if (name === "planned") {
      const updatedPlanned = value.map((val, i) => ({
        start: plannedDurations[i].start,
        end: plannedDurations[i].start + val,
      }));
      setPlannedDurations(updatedPlanned);
    } else {
      const updatedActual = value.map((val, i) => ({
        start: actualDurations[i].start,
        end: actualDurations[i].start + val,
      }));
      setActualDurations(updatedActual);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen p-6">
      <div className="flex min-h-full bg-blue-50 pt-[90px]">
        <Sidebar id={id} />
        <div className="flex-grow pl-4 min-h-full">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
           {project.name}
          </h1>
          <p className="text-sm text-gray-600 mb-6">{project.location}</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full h-[300px] flex flex-col justify-between">
              <h2 className="text-xl font-semibold mb-4">
                Task Completion Rates
              </h2>
              <div className="w-full h-full">
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
            </div>

            <div className="flex bg-white p-6 rounded-lg shadow-lg w-full h-[300px]">
              <div className="flex-shrink-0 w-1/4 flex flex-col justify-center items-start pr-4">
                <div className="mt-2">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {completionRate}%
                  </h2>
                  <p className="text-gray-600">Completion Rate</p>
                </div>

                <p className="text-gray-600">Status</p>
                <div className="flex items-center mt-4">
                  {projectStatus === "On track" ? (
                    <>
                      <FiCheckCircle className="text-green-500" size={24} />
                      <span className="font-semibold text-green-500">
                        {projectStatus}
                      </span>
                    </>
                  ) : (
                    <>
                      <AiFillCloseCircle className="text-red-500" size={24} />
                      <span className="font-semibold text-red-500">
                        {projectStatus}
                      </span>
                    </>
                  )}
                </div>

                <p className="text-gray-600">
                  Most Delayed Activity: {mostDelayedActivity}
                </p>
              </div>

              <div className="flex-grow w-3/4">
                <Line data={lineData} options={lineOptions} />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6 w-full h-[300px]">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
