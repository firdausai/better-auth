"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export function GoogleDriveCard() {
  const [responseState, setResponseState] = useState<{ status: boolean | null, isLoading: boolean }>({
    status: null,
    isLoading: false
  })

  return (
    <Card>
      <CardHeader>Google Drive</CardHeader>
      <CardContent className="flex gap-3">
        <Button
          size="sm"
          className="cursor-pointer"
          onClick={async () => {
            await client.linkSocial({
              provider: 'google',
              scopes: ['https://www.googleapis.com/auth/drive.file'],
              callbackURL: '/dashboard'
            });
          }}
        >
          1. Add google drive scope
        </Button>
        <div>
          <Button
            size="sm"
            className="cursor-pointer"
            onClick={async () => {
              setResponseState(prev => {
                return {
                  ...prev, isLoading: true
                }
              })

              const response = await fetch("/api/token")

              const { success } = await response.json()

              if (success) {
                setResponseState(prev => {
                  return {
                    status: true, isLoading: false
                  }
                })
              } else {
                setResponseState(prev => {
                  return {
                    status: false, isLoading: false
                  }
                })
              }
            }}
          >
            2. Call google drive api (list file)
          </Button>
          {responseState.isLoading ? (
            <p className="text-sm">Loading...</p>
          ) : (
            <p className="text-sm">Status: {responseState.status === null ? String(responseState.status) : responseState.status ? "Success" : "Failed"}</p>
          )}
        </div>
      </CardContent>
    </Card >
  )
}
