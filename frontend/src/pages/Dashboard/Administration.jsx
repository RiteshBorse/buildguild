import React from 'react'
import Sidebar from './Sidebar'

const Administration = () => {
  return (
    <div className='w-full h-screen pt-[100px] px-8 py-10'>
        <Sidebar/>
        {/* <Tabs defaultValue="administration" className="w-full mx-auto">
        <TabsList className="flex justify-center gap-2 bg-gray-100 flex-col">
          <TabsTrigger value="administration">Administration</TabsTrigger>
          <TabsTrigger value="engineering">Engineering</TabsTrigger>
          <TabsTrigger value="material">Material</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
        </TabsList>

        <TabsContent value="administration">
          <div className="flex items-center justify-start px-3 gap-2 shadow-sm py-4 border border-gray-200 rounded-sm">
            <User2 className="w-6 h-6 flex-shrink-0" />
            <p className="text-lg">Administration</p>
          </div>
        </TabsContent>

        <TabsContent value="engineering">
          <div className="flex items-center justify-start px-3 gap-2 shadow-sm py-4 border border-gray-200 rounded-sm">
            <Workflow className="w-6 h-6 flex-shrink-0" />
            <p className="text-lg">Engineering</p>
          </div>
        </TabsContent>

        <TabsContent value="material">
          <div className="flex items-center justify-start px-3 gap-2 shadow-sm py-4 border border-gray-200 rounded-sm">
            <Package className="w-6 h-6 flex-shrink-0" />
            <p className="text-lg">Material</p>
          </div>
        </TabsContent>

        <TabsContent value="financials">
          <div className="flex items-center justify-start px-3 gap-2 shadow-sm py-4 border border-gray-200 rounded-sm">
            <FaMoneyBill className="w-6 h-6 flex-shrink-0" />
            <p className="text-lg">Financials</p>
          </div>
        </TabsContent>
      </Tabs> */}
    </div>
  )
}

export default Administration