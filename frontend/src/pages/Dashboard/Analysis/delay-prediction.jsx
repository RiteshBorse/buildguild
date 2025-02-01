import { useForm } from "react-hook-form"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import axios from "axios"
import { useState } from "react"

// Initial chart data 
const initialDelayData = [
  { factor: "Project Size", impact: 0, threshold: 50000 },
  { factor: "Complexity", impact: 0, threshold: 5 },
  { factor: "Team Experience", impact: 0, threshold: 10 },
]

export default function DelayPrediction() {
  const [delayData, setDelayData] = useState(initialDelayData)
  const [delayRisk, setDelayRisk] = useState(null)
  const [riskDetails, setRiskDetails] = useState(null)

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
        'http://127.0.0.1:5000/predict/delay',
        processedValues,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      )

      const riskPrediction = response.data.delay_risk

      // Update delay risk state
      setDelayRisk(riskPrediction)

      // Calculate risk factors and their relative impact
      const riskFactors = {
        project_size: processedValues.project_size > 50000 ? "High" : "Low",
        complexity: processedValues.complexity > 5 ? "High" : "Low",
        team_experience: processedValues.team_experience < 10 ? "High" : "Low"
      }

      setRiskDetails(riskFactors)

      // Update chart data with normalized impact scores
      setDelayData([
        { 
          factor: "Project Size", 
          impact: (processedValues.project_size / 1000), 
          threshold: 50
        },
        { 
          factor: "Complexity", 
          impact: processedValues.complexity * 10,
          threshold: 50
        },
        { 
          factor: "Team Experience", 
          impact: (20 - processedValues.team_experience) * 5, // Inverse relationship
          threshold: 50
        },
      ])
      
    } catch (error) {
      console.error('Error predicting delay:', error)
    }
  }

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Project Delay Prediction</h2>
        <p className="text-muted-foreground">Predict potential project delays using Random Forest Classification</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input Parameters</CardTitle>
            <CardDescription>Enter project details for delay prediction</CardDescription>
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
                  Predict Delays
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delay Risk Analysis</CardTitle>
            <CardDescription>
              Factor Impact Analysis
              {delayRisk !== null && (
                <div className={`mt-2 font-semibold ${delayRisk === 1 ? "text-red-500" : "text-green-500"}`}>
                  Overall Delay Risk: {delayRisk === 1 ? "High" : "Low"}
                </div>
              )}
              {riskDetails && (
                <div className="mt-2 space-y-1 text-sm">
                  <div>Project Size Risk: 
                    <span className={riskDetails.project_size === "High" ? "text-red-500" : "text-green-500"}>
                      {" "}{riskDetails.project_size}
                    </span>
                  </div>
                  <div>Complexity Risk: 
                    <span className={riskDetails.complexity === "High" ? "text-red-500" : "text-green-500"}>
                      {" "}{riskDetails.complexity}
                    </span>
                  </div>
                  <div>Team Experience Risk: 
                    <span className={riskDetails.team_experience === "High" ? "text-red-500" : "text-green-500"}>
                      {" "}{riskDetails.team_experience}
                    </span>
                  </div>
                </div>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                impact: {
                  label: "Risk Impact Score",
                  color: "hsl(var(--chart-1))",
                },
                threshold: {
                  label: "Risk Threshold",
                  color: "hsl(var(--chart-2))",
                }
              }}
              className="h-64"
            >
              <BarChart data={delayData}>
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
                            Risk Impact: {payload[0].value.toFixed(1)}
                          </div>
                          <div className="text-sm">
                            Threshold: {payload[0].payload.threshold}
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
      </div>
    </div>
  )
}