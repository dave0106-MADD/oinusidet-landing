// ==========================================
// WAITLIST API ENDPOINT
// Handles email submissions from landing page
// ==========================================

import { NextResponse } from "next/server";
import { addToWaitlist, getWaitlist } from "@/lib/db";

// ==========================================
// POST - Add email to waitlist
// Called when user submits email form
// ==========================================
export async function POST(request) {
  try {
    const { email } = await request.json();

    // Add to database
    const result = await addToWaitlist(email);

    if (result.success) {
      return NextResponse.json(
        { success: true, message: result.message },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// ==========================================
// GET - Retrieve all waitlist emails
// Used by admin dashboard
// Requires authentication (add password check in production)
// ==========================================
export async function GET(request) {
  try {
    // TODO: Add authentication check here
    // const auth = request.headers.get('authorization');
    // if (auth !== 'your-secret-key') return unauthorized response

    const result = await getWaitlist();

    if (result.success) {
      return NextResponse.json(
        { success: true, data: result.data },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API GET error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
