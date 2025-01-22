import { useForm } from "react-hook-form"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const delayData = [
  { factor: "Weather", impact: 30 },
  { factor: "Equipment", impact: 25 },
  { factor: "Labor", impact: 20 },
  { factor: "Materials", impact: 15 },
  { factor: "Planning", impact: 10 },
]

export default function DelayPrediction() {
  const form = useForm({
    defaultValues: {
      number_of_workers: "",
      weather_conditions: "",
      equipment_availability: "",
      project_complexity: "",
    },
  })

  async function onSubmit(values) {
    // Convert number_of_workers to number
    const processedValues = {
      ...values,
      number_of_workers: Number(values.number_of_workers),
    }
    console.log(processedValues)
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
            <CardTitle>Delay Risk Factors</CardTitle>
            <CardDescription>Enter project conditions for delay analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="number_of_workers"
                  rules={{ required: "Number of workers is required", min: { value: 1, message: "Must be at least 1" } }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Workers</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="50" 
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
                  name="weather_conditions"
                  rules={{ required: "Weather conditions are required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weather Conditions</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select weather conditions" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="favorable">Favorable</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="severe">Severe</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="equipment_availability"
                  rules={{ required: "Equipment availability is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Equipment Availability</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select availability" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="project_complexity"
                  rules={{ required: "Project complexity is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Complexity</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select complexity" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
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
            <CardTitle>Delay Impact Analysis</CardTitle>
            <CardDescription>Factor contribution to project delays</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                impact: {
                  label: "Impact Score",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-64"
            >
              <BarChart data={delayData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="factor" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="impact" fill="var(--color-impact)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}