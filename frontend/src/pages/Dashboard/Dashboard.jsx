import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import { Doughnut, Line, Bar, Radar } from "react-chartjs-2";
import { 
  FiCheckCircle, 
  FiAlertCircle, 
  FiTrendingUp, 
  FiCalendar, 
  FiDollarSign,
  FiUsers,
  FiClock,
  FiAlertTriangle,
  FiBarChart2,
  FiActivity,
  FiTarget,
  FiMenu,
  FiX,
  FiMapPin
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import "chart.js/auto";
import axios from "axios";

const Dashboard = () => {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for demonstration
  const teamMembers = [
    { name: "John Smith", role: "Project Manager", avatar: "/avatars/john.png", status: "online" },
    { name: "Sarah Johnson", role: "Site Engineer", avatar: "/avatars/sarah.png", status: "offline" },
    { name: "Mike Brown", role: "Safety Officer", avatar: "/avatars/mike.png", status: "online" },
    { name: "Emma Wilson", role: "Quality Control", avatar: "/avatars/emma.png", status: "online" },
  ];

  const recentActivities = [
    { type: "task", description: "Foundation work completed", time: "2 hours ago", status: "completed" },
    { type: "issue", description: "Material delivery delayed", time: "4 hours ago", status: "pending" },
    { type: "milestone", description: "First floor structure completed", time: "1 day ago", status: "completed" },
    { type: "task", description: "Safety inspection scheduled", time: "2 days ago", status: "upcoming" },
  ];

  const upcomingTasks = [
    { title: "Electrical Installation", dueDate: "2024-03-20", priority: "high", assignee: "Mike Brown" },
    { title: "Plumbing Work", dueDate: "2024-03-22", priority: "medium", assignee: "Sarah Johnson" },
    { title: "Interior Finishing", dueDate: "2024-03-25", priority: "low", assignee: "Emma Wilson" },
  ];

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
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          font: {
            family: "'Inter', sans-serif"
          }
        }
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: {
          size: 14,
          family: "'Inter', sans-serif"
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif"
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.05)"
        },
        title: {
          display: true,
          text: "Duration (Weeks)",
          font: {
            size: 14,
            family: "'Inter', sans-serif",
            weight: "500"
          }
        }
      },
      y: {
        grid: {
          display: false
        },
        title: {
          display: true,
          text: "Tasks",
          font: {
            size: 14,
            family: "'Inter', sans-serif",
            weight: "500"
          }
        }
      }
    },
    maintainAspectRatio: false
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
            family: "'Inter', sans-serif"
          }
        }
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: {
          size: 14,
          family: "'Inter', sans-serif"
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif"
        },
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`
        }
      }
    },
    cutout: "70%",
    maintainAspectRatio: false
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
          usePointStyle: true,
          font: {
            family: "'Inter', sans-serif"
          }
        }
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: {
          size: 14,
          family: "'Inter', sans-serif"
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif"
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.05)"
        },
        title: {
          display: true,
          text: "Project Timeline (Weeks)",
          font: {
            size: 14,
            family: "'Inter', sans-serif",
            weight: "500"
          }
        }
      },
      y: {
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.05)"
        },
        title: {
          display: true,
          text: "Progress (%)",
          font: {
            size: 14,
            family: "'Inter', sans-serif",
            weight: "500"
          }
        },
        ticks: {
          callback: (value) => `${value}%`,
          font: {
            family: "'Inter', sans-serif"
          }
        },
        min: 0,
        max: 100
      }
    },
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6
      },
      line: {
        tension: 0.4
      }
    }
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const MobileMenu = () => (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <FiMenu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Dashboard Menu</h2>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("overview")}>
                <FiBarChart2 className="mr-2 h-4 w-4" />
                Overview
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("progress")}>
                <FiActivity className="mr-2 h-4 w-4" />
                Progress
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("analytics")}>
                <FiTrendingUp className="mr-2 h-4 w-4" />
                Analytics
              </Button>
              <div className="pt-4 border-t">
                <h3 className="px-2 text-sm font-medium text-muted-foreground mb-2">Quick Actions</h3>
                <Button variant="ghost" className="w-full justify-start">
                  <FiTarget className="mr-2 h-4 w-4" />
                  Update Progress
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <FiActivity className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/projects/getProject/${id}`
        );
        setProject(res.data.project);
        setError(null);
      } catch (err) {
        setError("Failed to fetch project data");
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  // Add new chart data
  const progressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Planned Progress',
        data: [20, 35, 50, 65, 80, 90],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Actual Progress',
        data: [18, 32, 48, 60, 75, 85],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const resourceUtilizationData = {
    labels: ['Labor', 'Equipment', 'Materials', 'Subcontractors', 'Other'],
    datasets: [{
      data: [35, 25, 20, 15, 5],
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(234, 179, 8, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(156, 163, 175, 0.8)'
      ],
      borderWidth: 0
    }]
  };

  const costAnalysisData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Planned Cost',
        data: [150000, 250000, 350000, 450000, 550000, 650000],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true
      },
      {
        label: 'Actual Cost',
        data: [145000, 260000, 340000, 470000, 530000, 620000],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true
      }
    ]
  };

  const riskAnalysisData = {
    labels: ['Safety', 'Schedule', 'Budget', 'Quality', 'Weather'],
    datasets: [{
      label: 'Risk Level',
      data: [2, 4, 3, 2, 5],
      backgroundColor: 'rgba(99, 102, 241, 0.8)',
      borderWidth: 0
    }]
  };

  // Helper function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Helper function to calculate budget percentage
  const calculateBudgetPercentage = (spent, total) => {
    if (!total || total === 0) return 0;
    return Math.min(Math.round((spent / total) * 100), 100);
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid date';
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (error) {
      return 'Invalid date';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading project data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <FiAlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <p className="text-destructive">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-full pt-[90px]">
        <Sidebar id={id} />
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-grow p-6 space-y-6"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <MobileMenu />
              <div className="space-y-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold">{project.name || 'Untitled Project'}</h1>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <FiCalendar className="h-4 w-4" />
                        <span className="text-sm">Started on {formatDate(project.startDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <FiMapPin className="h-4 w-4" />
                        <span className="text-sm">{project.location || 'Location not specified'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <FiActivity className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
              <Button size="sm" className="hidden sm:flex">
                <FiTarget className="mr-2 h-4 w-4" />
                Update Progress
              </Button>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Budget Status</p>
                    <h3 className="text-2xl font-bold mt-1">
                      {formatCurrency(project.budget?.spent || 0)} / {formatCurrency(project.budget?.total || 0)}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {project.budget?.spent && project.budget?.total 
                        ? `${formatCurrency(project.budget.total - project.budget.spent)} remaining`
                        : 'No budget data available'}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <FiDollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <Progress 
                  value={calculateBudgetPercentage(project.budget?.spent, project.budget?.total)} 
                  className="mt-4" 
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Spent</span>
                  <span>Total Budget</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Team Members</p>
                    <h3 className="text-2xl font-bold mt-1">12 Active</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <FiUsers className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="flex -space-x-2 mt-4">
                  {teamMembers.slice(0, 4).map((member, i) => (
                    <Avatar key={i} className="border-2 border-background">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Time Remaining</p>
                    <h3 className="text-2xl font-bold mt-1">45 Days</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <FiClock className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">On track for completion</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Risk Level</p>
                    <h3 className="text-2xl font-bold mt-1">Medium</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                    <FiAlertTriangle className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">2 issues need attention</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Charts */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="progress">Progress</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Progress</CardTitle>
                      <CardDescription>Overall completion and milestone tracking</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <Line data={lineData} options={lineOptions} />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Task Distribution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[250px]">
                          <Doughnut data={doughnutData} options={doughnutOptions} />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Duration Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[250px]">
                          <Bar data={barData} options={barOptions} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="progress" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Progress Tracking</CardTitle>
                        <CardDescription>Planned vs Actual Progress</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <Line data={progressData} options={lineOptions} />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Resource Utilization</CardTitle>
                        <CardDescription>Distribution of project resources</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <Doughnut data={resourceUtilizationData} options={doughnutOptions} />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Task Completion Status</CardTitle>
                        <CardDescription>Current status of project tasks</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <Doughnut data={doughnutData} options={doughnutOptions} />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Duration Analysis</CardTitle>
                        <CardDescription>Planned vs Actual Duration</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <Bar data={barData} options={barOptions} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Cost Analysis</CardTitle>
                        <CardDescription>Planned vs Actual Costs</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <Line data={costAnalysisData} options={lineOptions} />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Risk Analysis</CardTitle>
                        <CardDescription>Current risk levels by category</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <Radar data={riskAnalysisData} options={{
                            ...lineOptions,
                            scales: {
                              r: {
                                beginAtZero: true,
                                max: 5,
                                ticks: { stepSize: 1 }
                              }
                            }
                          }} />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="lg:col-span-2">
                      <CardHeader>
                        <CardTitle>Project Health Metrics</CardTitle>
                        <CardDescription>Key performance indicators</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">Schedule Performance Index</p>
                            <div className="text-2xl font-bold">0.92</div>
                            <Progress value={92} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">Cost Performance Index</p>
                            <div className="text-2xl font-bold">0.95</div>
                            <Progress value={95} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">Quality Score</p>
                            <div className="text-2xl font-bold">88%</div>
                            <Progress value={88} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="lg:col-span-2">
                      <CardHeader>
                        <CardTitle>Trend Analysis</CardTitle>
                        <CardDescription>Project performance trends</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <Line data={lineData} options={lineOptions} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Right Column - Activity & Tasks */}
            <motion.div variants={itemVariants} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                      {recentActivities.map((activity, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <div className={`h-2 w-2 rounded-full mt-2 ${
                            activity.status === 'completed' ? 'bg-green-500' :
                            activity.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'
                          }`} />
                          <div>
                            <p className="text-sm font-medium">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                      {upcomingTasks.map((task, i) => (
                        <div key={i} className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium">{task.title}</p>
                            <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                          </div>
                          <Badge variant={
                            task.priority === 'high' ? 'destructive' :
                            task.priority === 'medium' ? 'default' : 'secondary'
                          }>
                            {task.priority}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Team Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamMembers.map((member, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        <Badge variant={member.status === 'online' ? 'success' : 'secondary'}>
                          {member.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
