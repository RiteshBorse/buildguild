import { useState } from "react"
import { useForm } from "react-hook-form"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"
import axios from "axios"

const initialMaintenanceData = [
  { factor: "Project Size", impact: 0, threshold: 50000 },
  { factor: "Complexity", impact: 0, threshold: 5 },
  { factor: "Team Experience", impact: 0, threshold: 10 },
]

export default function EquipmentMaintenance() {
  const [maintenanceData, setMaintenanceData] = useState(initialMaintenanceData)
  const [predictedCost, setPredictedCost] = useState(null)
  const [maintenanceStatus, setMaintenanceStatus] = useState(null)

  const form = useForm({
    defaultValues: {
      project_size: "",
      complexity: "",
      team_experience: "",
    },
  })

  async function onSubmit(values) {
    try {
      const processedValues = {
        project_size: Number(values.project_size),
        complexity: Number(values.complexity),
        team_experience: Number(values.team_experience),
      }

      const response = await axios.post(
        'http://127.0.0.1:5000/predict/maintenance',
        processedValues,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      )

      const maintenancePrediction = response.data.predicted_maintenance_cost

      // Update predicted cost
      setPredictedCost(maintenancePrediction)

      // Calculate maintenance status
      const status = {
        project_size: (processedValues.project_size / 100000) * 100,
        complexity: (processedValues.complexity / 10) * 100,
        team_experience: (processedValues.team_experience / 20) * 100,
      }
      setMaintenanceStatus(status)

      // Update chart data
      setMaintenanceData([
        { 
          factor: "Project Size", 
          impact: processedValues.project_size / 1000,
          threshold: 50
        },
        { 
          factor: "Complexity", 
          impact: processedValues.complexity * 10,
          threshold: 50
        },
        { 
          factor: "Team Experience", 
          impact: processedValues.team_experience * 5,
          threshold: 50
        },
      ])
    } catch (error) {
      console.error('Error predicting maintenance:', error)
    }
  }

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Equipment Maintenance Prediction</h2>
        <p className="text-muted-foreground">Predict maintenance requirements using Support Vector Regression</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input Parameters</CardTitle>
            <CardDescription>Enter project details for maintenance prediction</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="project_size"
                  rules={{ 
                    required: "Project size is required",
                    min: { value: 1000, message: "Minimum size is 1000 sq ft" },
                    max: { value: 100000, message: "Maximum size is 100000 sq ft" }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Size (sq ft)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="10000" 
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="complexity"
                  rules={{ 
                    required: "Complexity is required",
                    min: { value: 1, message: "Minimum complexity is 1" },
                    max: { value: 10, message: "Maximum complexity is 10" }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Complexity (1-10)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="5" 
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="team_experience"
                  rules={{ 
                    required: "Team experience is required",
                    min: { value: 1, message: "Minimum experience is 1 year" },
                    max: { value: 20, message: "Maximum experience is 20 years" }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team Experience (years)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="5" 
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Predict Maintenance
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Cost Prediction</CardTitle>
              <CardDescription>
                Factor Impact Analysis
                {predictedCost && (
                  <div className="mt-2 font-semibold text-primary">
                    Estimated Maintenance Cost: ${predictedCost.toLocaleString()}
                  </div>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  impact: {
                    label: "Impact Score",
                    color: "hsl(var(--chart-1))",
                  },
                  threshold: {
                    label: "Threshold",
                    color: "hsl(var(--chart-2))",
                  }
                }}
                className="h-[200px]"
              >
                <BarChart data={maintenanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="factor" />
                  <YAxis />
                  <ChartTooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border rounded p-2 shadow-sm">
                            <div className="text-sm font-semibold mb-1">
                              {payload[0].payload.factor}
                            </div>
                            <div className="text-sm">
                              Impact: {payload[0].value.toFixed(1)}
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Legend />
                  <Bar dataKey="impact" fill="hsl(var(--chart-1))" />
                  <Bar dataKey="threshold" fill="hsl(var(--chart-2))" opacity={0.3} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {maintenanceStatus && (
            <Card>
              <CardHeader>
                <CardTitle>Factor Analysis</CardTitle>
                <CardDescription>Impact of each factor on maintenance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Project Size Impact</span>
                      <span className="text-muted-foreground">
                        {maintenanceStatus.project_size.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={maintenanceStatus.project_size} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Complexity Impact</span>
                      <span className="text-muted-foreground">
                        {maintenanceStatus.complexity.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={maintenanceStatus.complexity} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Team Experience Impact</span>
                      <span className="text-muted-foreground">
                        {maintenanceStatus.team_experience.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={maintenanceStatus.team_experience} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

