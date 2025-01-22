import { Scatter, ScatterChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const workerData = [
  { experience: 1, productivity: 65, efficiency: 70 },
  { experience: 2, productivity: 70, efficiency: 75 },
  { experience: 3, productivity: 75, efficiency: 80 },
  { experience: 4, productivity: 80, efficiency: 82 },
  { experience: 5, productivity: 85, efficiency: 88 },
  { experience: 6, productivity: 88, efficiency: 90 },
  { experience: 7, productivity: 90, efficiency: 92 },
  { experience: 8, productivity: 92, efficiency: 94 },
  { experience: 9, productivity: 94, efficiency: 95 },
  { experience: 10, productivity: 95, efficiency: 96 },
]

export default function WorkforceAnalysis() {
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Workforce Productivity Analysis</h2>
        <p className="text-muted-foreground">Analyze worker productivity using K-Means Clustering</p>
      </div>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Worker Experience vs Productivity</CardTitle>
          <CardDescription>Correlation between experience and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              productivity: {
                label: "Productivity Score",
                color: "hsl(var(--chart-1))",
              },
              efficiency: {
                label: "Efficiency Score",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[400px]"
          >
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="experience" name="Experience (years)" />
              <YAxis dataKey="productivity" name="Productivity Score" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Scatter name="Workers" data={workerData} fill="var(--color-productivity)" />
            </ScatterChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

