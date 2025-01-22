import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const materialData = [
  { month: "Jan", cement: 1000, steel: 800, bricks: 5000 },
  { month: "Feb", cement: 1200, steel: 900, bricks: 5500 },
  { month: "Mar", cement: 900, steel: 750, bricks: 4800 },
  { month: "Apr", cement: 1100, steel: 850, bricks: 5200 },
  { month: "May", cement: 1300, steel: 950, bricks: 5800 },
  { month: "Jun", cement: 1400, steel: 1000, bricks: 6000 },
]

export default function MaterialDemand() {
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Material Demand Forecasting</h2>
        <p className="text-muted-foreground">
          Predict future demand for construction materials using Time Series Forecasting
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Material Usage Trends</CardTitle>
                <CardDescription>Historical and predicted material consumption</CardDescription>
              </div>
              <Select defaultValue="6months">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">Last 3 months</SelectItem>
                  <SelectItem value="6months">Last 6 months</SelectItem>
                  <SelectItem value="1year">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                cement: {
                  label: "Cement (tons)",
                  color: "hsl(var(--chart-1))",
                },
                steel: {
                  label: "Steel (tons)",
                  color: "hsl(var(--chart-2))",
                },
                bricks: {
                  label: "Bricks (units)",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[400px]"
            >
              <LineChart data={materialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="cement" stroke="var(--color-cement)" />
                <Line type="monotone" dataKey="steel" stroke="var(--color-steel)" />
                <Line type="monotone" dataKey="bricks" stroke="var(--color-bricks)" />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

