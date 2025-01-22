import { useForm } from "react-hook-form"
import { AlertTriangle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SafetyRisk() {
  const form = useForm({
    defaultValues: {
      worker_experience: "",
      equipment_age: "",
      site_conditions: "",
      safety_violations: "",
    },
  })

  async function onSubmit(values) {
    // Convert numeric strings to numbers
    const processedValues = {
      ...values,
      worker_experience: Number(values.worker_experience),
      equipment_age: Number(values.equipment_age),
      safety_violations: Number(values.safety_violations),
    }
    console.log(processedValues)
  }

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Safety Risk Assessment</h2>
        <p className="text-muted-foreground">Predict potential safety risks using Logistic Regression</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment Parameters</CardTitle>
            <CardDescription>Enter site conditions for risk analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="worker_experience"
                  rules={{ 
                    required: "Worker experience is required",
                    min: { value: 0, message: "Experience cannot be negative" },
                    pattern: { value: /^\d*\.?\d*$/, message: "Must be a valid number" }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Average Worker Experience (years)</FormLabel>
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
                  name="equipment_age"
                  rules={{ 
                    required: "Equipment age is required",
                    min: { value: 0, message: "Age cannot be negative" },
                    pattern: { value: /^\d*\.?\d*$/, message: "Must be a valid number" }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Equipment Age (years)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="3" 
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
                  name="site_conditions"
                  rules={{ required: "Site conditions must be selected" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Site Conditions</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select conditions" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="hazardous">Hazardous</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="safety_violations"
                  rules={{ 
                    required: "Number of safety violations is required",
                    min: { value: 0, message: "Cannot be negative" },
                    pattern: { value: /^\d+$/, message: "Must be a whole number" }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recent Safety Violations</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Assess Risk
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Risk Status</CardTitle>
            <CardDescription>Overall safety risk assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Card className="bg-green-50 dark:bg-green-900/10">
                <CardContent className="flex items-center gap-4 p-4">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="font-medium">Low Risk Areas</p>
                    <p className="text-sm text-muted-foreground">Equipment maintenance</p>
                    <p className="text-sm text-muted-foreground">Worker training</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-yellow-50 dark:bg-yellow-900/10">
                <CardContent className="flex items-center gap-4 p-4">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  <div>
                    <p className="font-medium">Medium Risk Areas</p>
                    <p className="text-sm text-muted-foreground">Site conditions</p>
                    <p className="text-sm text-muted-foreground">Material handling</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}