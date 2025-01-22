import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"

const maintenanceData = [
  { equipment: "Excavator", hours: 120, threshold: 150 },
  { equipment: "Crane", hours: 80, threshold: 100 },
  { equipment: "Bulldozer", hours: 90, threshold: 120 },
  { equipment: "Loader", hours: 60, threshold: 80 },
  { equipment: "Truck", hours: 150, threshold: 200 },
]

export default function EquipmentMaintenance() {
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Equipment Maintenance Prediction</h2>
        <p className="text-muted-foreground">Predict maintenance requirements using Support Vector Regression</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Equipment Usage</CardTitle>
            <CardDescription>Operating hours vs maintenance threshold</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                hours: {
                  label: "Operating Hours",
                  color: "hsl(var(--chart-1))",
                },
                threshold: {
                  label: "Maintenance Threshold",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <BarChart data={maintenanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="equipment" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="hours" fill="var(--color-hours)" />
                <Bar dataKey="threshold" fill="var(--color-threshold)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maintenance Status</CardTitle>
            <CardDescription>Equipment condition and maintenance progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maintenanceData.map((item) => (
                <div key={item.equipment} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.equipment}</span>
                    <span className="text-muted-foreground">
                      {item.hours}/{item.threshold} hours
                    </span>
                  </div>
                  <Progress value={(item.hours / item.threshold) * 100} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

