import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Here you would typically send the data to your database
    // For now, we'll just return a success response
    console.log("Received business data:", data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing business data:", error);
    return NextResponse.json(
      { error: "Failed to process business data" },
      { status: 500 }
    );
  }
}