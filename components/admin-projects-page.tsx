'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { PencilLine, Plus } from 'lucide-react'

import { AdminShell } from '@/components/admin-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getProjects } from '@/lib/admin/service'
import type { AdminProject } from '@/lib/admin/types'

export function AdminProjectsPage() {
  const [projects, setProjects] = useState<AdminProject[]>([])

  useEffect(() => {
    getProjects().then(setProjects)
  }, [])

  return (
    <AdminShell
      title="Projects"
      description="See all posted projects, review their primary image and summary, then open a project to edit or create a new one."
      actions={
        <Button asChild className="rounded-2xl">
          <Link href="/admin/projects/new">
            <Plus className="h-4 w-4" />
            Add Project
          </Link>
        </Button>
      }
    >
      <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
        <CardContent className="px-0 pb-2">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200">
                <TableHead className="px-6">Project</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="pr-6 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id} className="border-slate-200">
                  <TableCell className="px-6 py-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={project.primaryImage}
                        alt={project.name}
                        className="h-20 w-24 rounded-2xl border border-slate-200 object-cover"
                      />
                      <div className="max-w-md">
                        <p className="font-semibold text-slate-950">{project.name}</p>
                        <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">
                          {project.summary}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-slate-600">{project.location}</TableCell>
                  <TableCell className="py-4">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 text-slate-600">
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="py-4 pr-6 text-right">
                    <Button asChild variant="outline" className="rounded-xl border-slate-200">
                      <Link href={`/admin/projects/${project.id}/edit`}>
                        <PencilLine className="h-4 w-4" />
                        Edit
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminShell>
  )
}
