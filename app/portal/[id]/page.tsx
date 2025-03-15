"use client"

import { PortalDashboard } from "@/components/portal-dashboard"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function PortalPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-6">
        <PortalDashboard portalId={id} />
      </main>
      <SiteFooter />
    </div>
  )
}