import { useForm } from "react-hook-form"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
const historicalData = [
  { month: "Jan", actual: 100000, predicted: 98000 },
  { month: "Feb", actual: 120000, predicted: 115000 },
  { month: "Mar", actual: 95000, predicted: 97000 },
  { month: "Apr", actual: 140000, predicted: 135000 },
  { month: "May", actual: 160000, predicted: 155000 },
  { month: "Jun", actual: 180000, predicted: 175000 },
]

export default function CostEstimation() {
  const form = useForm({
    defaultValues: {
      project_size: "",
      material_cost: "",
      labor_hours: "",
      site_location: "",
    },
  })

  async function onSubmit(values) {
    // Convert string values to numbers
    const processedValues = {
      ...values,
      project_size: Number(values.project_size),
      material_cost: Number(values.material_cost),
      labor_hours: Number(values.labor_hours),
    }
    console.log(processedValues)
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
                  name="material_cost"
                  rules={{ 
                    required: "Material cost is required",
                    min: { value: 0, message: "Cost cannot be negative" },
                    pattern: { value: /^\d*\.?\d*$/, message: "Must be a valid number" }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material Cost ($)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="50000" 
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
                  name="labor_hours"
                  rules={{ 
                    required: "Labor hours are required",
                    min: { value: 0, message: "Hours cannot be negative" },
                    pattern: { value: /^\d*\.?\d*$/, message: "Must be a valid number" }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Labor Hours</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="2000" 
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
                  name="site_location"
                  rules={{ required: "Site location is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Site Location</FormLabel>
                      <FormControl>
                        <Input placeholder="New York" {...field} />
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
            <CardDescription>Historical vs Predicted Costs</CardDescription>
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
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="actual" stroke="var(--color-actual)" />
                <Line type="monotone" dataKey="predicted" stroke="var(--color-predicted)" strokeDasharray="5 5" />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}