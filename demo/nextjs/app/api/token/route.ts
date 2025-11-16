// app/api/get-oauth-tokens/route.ts
import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import { createPool } from "mysql2/promise"

export async function GET(req: NextRequest) {
  try {
    const { user } = await auth.api.getSession({
      headers: req.headers
    })

    const { accessToken } = await auth.api.getAccessToken({
      body: {
        providerId: 'google',
        userId: user.id
      }
    });

    const response = await fetch('https://www.googleapis.com/drive/v3/files?pageSize=10', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    const { files, error } = await response.json()

    return NextResponse.json({
      success: error ? false : true
    })
  } catch (error) {
    console.error("Error fetching OAuth tokens:", error)
    return NextResponse.json({
      success: false
    })
  }
}
