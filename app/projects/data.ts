export type Project = {
  slug: string
  name: string
  status: string
  category: string
  image: string
  images?: string[]
  location: string
  summary: string
  impact: string
  overview: string
  details: string
  highlights: string[]
  objectives: string[]
  goal?: number
  raised?: number
  goalSuffix?: string
}

export const projects: Project[] = [
  {
    slug: 'kingdom-impact-center',
    name: 'Kingdom Impact Center',
    status: 'In Planning',
    category: 'Infrastructure',
    image: '/kingdom-impact-center-1.jpg',
    images: [
      '/kingdom-impact-center-1.jpg',
      '/kingdom-impact-center-2.jpg',
      '/kingdom-impact-center-3.jpg',
      '/kingdom-impact-center-4.jpg',
      '/kingdom-impact-center-5.jpg',
      '/kingdom-impact-center-6.jpg',
      '/kingdom-impact-center-7.jpg',
      '/kingdom-impact-center-8.jpg',
      '/kingdom-impact-center-9.jpg',
    ],
    location: 'Kigali or Nyamata, Rwanda',
    summary:
      'A mega faith, hospitality, and community hub bringing together a modern main church auditorium, five-star accommodation, a signature restaurant, and conference facilities in one landmark development.',
    impact:
      'Planned to serve 2,000 to 4,000+ worshippers, create 200+ jobs, support conferences and retreats, and strengthen faith-based tourism and community impact in Rwanda.',
    overview:
      'Impact For Christ Church is proposing the Kingdom Impact Center as a transformative mega project on 10,000 square meters of land in either Kigali or Nyamata. The project is designed to become a spiritual home, a center for worship and discipleship, and a sustainable hospitality platform that serves both ministry and national development goals.',
    details:
      'The proposal includes a modern iconic main church auditorium, integrated hotel-style rooms and suites, a signature restaurant, conference and banquet facilities, administrative and children’s ministry spaces, parking, green areas, solar integration, and water management. It is aligned with Rwanda Vision 2050 and is intended to host worship services, conferences, weddings, retreats, and international guests while generating long-term support for ministry through high-end hospitality.',
    highlights: [
      'Modern main church auditorium for large worship gatherings',
      'Integrated five-star hotel-style accommodation',
      'Signature restaurant and conference facilities',
      'Parking, green spaces, solar power, and supporting infrastructure',
      'Mixed-use campus designed for ministry impact and sustainable operations',
    ],
    objectives: [
      'Provide a world-class worship space for 2,000 to 4,000+ worshippers',
      'Host national and international conferences, crusades, and leadership summits',
      'Develop 80 to 150 five-star rooms and suites with modern amenities',
      'Generate sustainable income to support ministry and future expansion',
      'Create jobs and contribute to Rwanda tourism and the MICE sector',
    ],
    goal: 45000000,
    goalSuffix: ' estimated upper range',
  },
]

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}
