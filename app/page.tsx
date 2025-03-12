"use client";

import { BusinessForm } from "@/components/business-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Ceus Capital</h1>
          <p className="text-muted-foreground mt-2">Business Registration Portal</p>
        </div>
        <BusinessForm />
      </div>
    </main>
  );
}