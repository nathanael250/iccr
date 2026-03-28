'use client'

import { useEffect, useState } from 'react'

import { AdminShell } from '@/components/admin-shell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import {
  getNotificationSettings,
  saveNotificationSettings,
} from '@/lib/admin/service'
import type { NotificationSettings } from '@/lib/admin/types'

export function AdminSettingsPage() {
  const [settings, setSettings] = useState<NotificationSettings | null>(null)

  useEffect(() => {
    getNotificationSettings().then(setSettings)
  }, [])

  if (!settings) return null

  return (
    <AdminShell
      title="Settings"
      description="Manage how admin notifications are delivered and which system actions should trigger them."
    >
      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
          <CardHeader>
            <CardTitle>Notification Channels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: 'inApp', label: 'Dashboard notifications' },
              { key: 'email', label: 'Email notifications' },
              { key: 'sms', label: 'SMS notifications' },
            ].map((channel) => (
              <div
                key={channel.key}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <p className="text-sm font-medium text-slate-900">{channel.label}</p>
                <Switch
                  checked={settings.channels[channel.key as keyof typeof settings.channels]}
                  onCheckedChange={(checked) =>
                    setSettings((current) =>
                      current
                        ? {
                            ...current,
                            channels: {
                              ...current.channels,
                              [channel.key]: checked,
                            },
                          }
                        : current,
                    )
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
          <CardHeader>
            <CardTitle>Notification Triggers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: 'membership', label: 'Member registration' },
              { key: 'partnership', label: 'Partnership registration' },
              { key: 'prayerRequest', label: 'Prayer request' },
              { key: 'giving', label: 'Giving activity' },
              { key: 'projectUpdate', label: 'Project changes' },
              { key: 'eventUpdate', label: 'Event changes' },
              { key: 'mediaUpload', label: 'Media uploads' },
            ].map((trigger) => (
              <div
                key={trigger.key}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <p className="text-sm font-medium text-slate-900">{trigger.label}</p>
                <Switch
                  checked={settings.triggers[trigger.key as keyof typeof settings.triggers]}
                  onCheckedChange={(checked) =>
                    setSettings((current) =>
                      current
                        ? {
                            ...current,
                            triggers: {
                              ...current.triggers,
                              [trigger.key]: checked,
                            },
                          }
                        : current,
                    )
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Button
          className="rounded-2xl"
          onClick={() => saveNotificationSettings(settings)}
        >
          Save Notification Settings
        </Button>
      </div>
    </AdminShell>
  )
}
