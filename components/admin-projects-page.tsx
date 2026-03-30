'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { PencilLine, Plus, Trash2 } from 'lucide-react'

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
import { deleteProject, getProjects } from '@/lib/admin/service'
import type { AdminProject } from '@/lib/admin/types'

export function AdminProjectsPage() {
  const [projects, setProjects] = useState<AdminProject[]>([])

  useEffect(() => {
    getProjects().then(setProjects)
  }, [])

  const handleDelete = async (projectId: string) => {
    if (!window.confirm('Delete this project?')) return

    await deleteProject(projectId)
    setProjects((current) => current.filter((project) => project.id !== projectId))
  }

  return (
    <AdminShell
      title="Projects"
      description="See all posted projects, review their primary image and summary, then open a project to edit or create a new one."
      actions={
        <Button
          asChild
          className="rounded-xl gap-1.5 bg-secondary text-sm font-semibold text-white shadow-sm transition-all hover:bg-secondary/90"
        >
          <Link href="/admin/projects/new">
            <Plus className="h-4 w-4" />
            Add Project
          </Link>
        </Button>
      }
    >
      <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-100 overflow-hidden">
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow className=" bg-[#5a5c5e] hover:bg-[#5a5c5e]">
                <TableHead className="w-12 px-4">
                  <input type="checkbox" className="h-4 w-4 rounded border-white/30 bg-white/10" />
                </TableHead>
                <TableHead className="px-4 text-[13px] font-semibold text-white/80">Project Name</TableHead>
                <TableHead className="text-[13px] font-semibold text-white/80">Location</TableHead>
                <TableHead className="text-[13px] font-semibold text-white/80">Status</TableHead>
                <TableHead className="text-[13px] font-semibold text-white/80">Updated</TableHead>
                <TableHead className="pr-6 text-right text-[13px] font-semibold text-white/80">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id} className="border-slate-100 transition-colors hover:bg-slate-50/70">
                  <TableCell className="px-4 py-3">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={project.primaryImage}
                        alt={project.name}
                        className="h-10 w-10 rounded-full border border-slate-200 object-cover"
                      />
                      <div className="max-w-md min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-950">{project.name}</p>
                        <p className="mt-0.5 line-clamp-1 text-xs leading-5 text-slate-500">
                          {project.summary}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-sm text-slate-600">{project.location}</TableCell>
                  <TableCell className="py-3">
                    <Badge
                      className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                      style={{ background: 'rgba(2,95,171,0.1)', color: '#025FAB' }}
                    >
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 text-sm text-slate-600">
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="py-3 pr-6 text-right">
                    <div className="flex justify-end gap-2">
                      <Button asChild size="icon" className="h-8 w-8 rounded-sm bg-secondary text-white hover:bg-secondary/90">
                        <Link href={`/admin/projects/${project.id}/edit`}>
                          <PencilLine className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 rounded-sm border-rose-200 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
                        onClick={() => handleDelete(project.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
