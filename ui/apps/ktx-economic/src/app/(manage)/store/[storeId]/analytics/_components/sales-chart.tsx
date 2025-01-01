"use client"

// import { LineChart, type LineChartProps } from "@tremor/react"

// import { cn, formatPrice } from "@/lib/utils"

interface SalesChartProps {
  className: string
  data: {
    name: string
    Total: number
  }[]
}

export function SalesChart({ data, className, ...props }: SalesChartProps) {
  return null;
  // return (
  //   <LineChart
  //     className={cn(className)}
  //     data={data}
  //     index="name"
  //     categories={["Total"]}
  //     colors={["indigo"]}
  //     valueFormatter={(value) => formatPrice(value)}
  //     yAxisWidth={48}
  //     {...props}
  //   />
  // )
}
