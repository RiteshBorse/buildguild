import { useForm } from "react-hook-form"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import axios from "axios"
import { useState } from "react"

const initialHistoricalData = [
  { month: "Jan", actual: 100000, predicted: 98000 },
  { month: "Feb", actual: 120000, predicted: 115000 },
  { month: "Mar", actual: 95000, predicted: 97000 },
  { month: "Apr", actual: 140000, predicted: 135000 },
  { month: "May", actual: 160000, predicted: 155000 },
]

export default function CostEstimation() {
  const [chartData, setChartData] = useState(initialHistoricalData)
  const [estimatedCost, setEstimatedCost] = useState(null)

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

      const response = await axios.post('http://127.0.0.1:5000/predict/cost', 
        processedValues,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      )
      const newPrediction = response.data.estimated_cost

      setEstimatedCost(newPrediction)

      const currentDate = new Date()
      const month = currentDate.toLocaleString('default', { month: 'short' })
      
      setChartData(prevData => {
        const newData = prevData.length >= 6 ? prevData.slice(1) : prevData
        return [...newData, {
          month,
          actual: null,
          predicted: newPrediction
        }]
      })
      
    } catch (error) {
      console.error('Error predicting cost:', error)
    }
  }

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Project Cost Estimation</h2>
        <p className="text-muted-foreground">Predict project costs based on historical data using Linear Regression</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input Parameters</CardTitle>
            <CardDescription>Enter project details for cost prediction</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="project_size"
                  rules={{ 
                    required: "Project size is required",
                    min: { value: 0, message: "Size cannot be negative" },
                    pattern: { value: /^\d*\.?\d*$/, message: "Must be a valid number" }
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
                  Calculate Estimate
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost Prediction Analysis</CardTitle>
            <CardDescription>
              Historical vs Predicted Costs
              {estimatedCost && (
                <div className="mt-2 font-semibold text-primary">
                  Latest Estimate: ${estimatedCost.toLocaleString()}
                </div>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                actual: {
                  label: "Actual Cost",
                  color: "hsl(var(--chart-1))",
                },
                predicted: {
                  label: "Predicted Cost",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-64"
            >
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis 
                  tickFormatter={(value) => `$${(value / 1000)}k`}
                />
                <ChartTooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border rounded p-2 shadow-sm">
                          {payload.map((entry, index) => (
                            <div key={index} className="text-sm">
                              <span className="font-semibold">{entry.name}: </span>
                              ${entry.value.toLocaleString()}
                            </div>
                          ))}
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={2}
                  dot={{ strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ strokeWidth: 2 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}