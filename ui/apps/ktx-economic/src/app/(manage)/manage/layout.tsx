// import { redirect } from "next/navigation"
import { getStoresByUserId } from "@/lib/queries/store"
// import { getCachedUser } from "@/lib/queries/user"
import { SidebarProvider } from "@/components/layout/sidebar-provider"
// import { DashboardHeader } from "../store/[storeId]/_components/dashboard-header"
import { DashboardSidebar } from "../store/[storeId]/_components/dashboard-sidebar"
// import { DashboardSidebarSheet } from "../store/[storeId]/_components/dashboard-sidebar-sheet"
import { StoreSwitcher } from "../store/[storeId]/_components/store-switcher"

export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  // const user = await getCachedUser()

  // if (!user) {
  //   redirect("/signin")
  // }

  const storesPromise = getStoresByUserId({ userId: 'string' })
  // const planMetricsPromise = getUserPlanMetrics({ userId: user.id })

  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[17.5rem_1fr]">
        <DashboardSidebar
          storeId="storeId"
          className="top-0 z-30 hidden flex-col gap-4 border-r border-border/60 lg:sticky lg:block"
        >
          <StoreSwitcher
            userId={'string'}
            storesPromise={storesPromise}
            // planMetricsPromise={planMetricsPromise}
          />
        </DashboardSidebar>
        <div className="flex flex-col">
          {/* <DashboardHeader user={'string'} storeId="storeId">
            <DashboardSidebarSheet className="lg:hidden">
              <DashboardSidebar storeId="storeId">
                <StoreSwitcher
                  userId={'string'}
                  storesPromise={storesPromise}
                  // planMetricsPromise={planMetricsPromise}
                />
              </DashboardSidebar>
            </DashboardSidebarSheet>
          </DashboardHeader> */}
          <main className="flex-1 overflow-hidden px-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
