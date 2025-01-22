"use client"

import React from 'react'
import Sidebar from './Sidebar'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import CostEstimation from './Analysis/cost-estimation'
import DelayPrediction from './Analysis/delay-prediction'
import MaterialDemand from './Analysis/material-demand'
import WorkforceAnalysis from './Analysis/workforce-analysis'
import SafetyRisk from './Analysis/safety-risk'
import EquipmentMaintenance from './Analysis/equipment-maintenance'

export default function Analysis() {
  return (
    <div className="w-full min-h-screen pt-20 px-4 md:px-8 pb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <aside className="w-full md:w-auto">
          <Sidebar />
        </aside>

        <main className="flex-1">
          <Tabs defaultValue="cost" className="w-full">
            <TabsList className="w-full justify-start bg-muted/40 overflow-x-auto flex gap-8">
              <TabsTrigger value="cost">Cost Estimation</TabsTrigger>
              <TabsTrigger value="delay">Project Delays</TabsTrigger>
              <TabsTrigger value="material">Material Demand</TabsTrigger>
              <TabsTrigger value="workforce">Workforce Analysis</TabsTrigger>
              <TabsTrigger value="safety">Safety Risk</TabsTrigger>
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
            </TabsList>
            
            <div className="mt-4">
              <TabsContent value="cost">
                <Card>
                  <CardContent className="p-6">
                    <CostEstimation />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="delay">
                <Card>
                  <CardContent className="p-6">
                    <DelayPrediction />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="material">
                <Card>
                  <CardContent className="p-6">
                    <MaterialDemand />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="workforce">
                <Card>
                  <CardContent className="p-6">
                    <WorkforceAnalysis />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="safety">
                <Card>
                  <CardContent className="p-6">
                    <SafetyRisk />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="equipment">
                <Card>
                  <CardContent className="p-6">
                    <EquipmentMaintenance />
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </main>
      </div>
    </div>
  )
}