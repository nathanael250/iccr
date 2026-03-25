export type Project = {
  slug: string
  name: string
  status: string
  category: string
  image: string
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
    slug: 'education-initiative',
    name: 'Education Initiative',
    status: 'Ongoing',
    category: 'Education',
    image: '/image.png',
    location: 'Kigali and surrounding communities',
    summary:
      'Providing quality education support, school materials, and encouragement to underprivileged children in our community.',
    impact: 'Supporting over 500 students with access to education.',
    overview:
      'The Education Initiative helps children from vulnerable families stay in school by reducing the practical barriers that often interrupt learning.',
    details:
      'Through church-based support, mentorship, and material assistance, this project works to create a more stable educational journey for children who need it most.',
    highlights: ['School materials and supplies', 'Family support and follow-up', 'Mentorship and encouragement'],
    objectives: ['Improve school access', 'Strengthen attendance and retention', 'Support holistic child development'],
    goal: 30000,
    raised: 18000,
    goalSuffix: '/year',
  },
  {
    slug: 'community-health-program',
    name: 'Community Health Program',
    status: 'Active',
    category: 'Healthcare',
    image: '/pexels-andrew-degarde-148550826-29422234.jpg',
    location: 'Remote and underserved areas of Rwanda',
    summary:
      'Mobile health clinics and wellness support for communities with limited access to regular healthcare services.',
    impact: 'Providing healthcare support to 2,000+ community members annually.',
    overview:
      'The Community Health Program focuses on practical health access, awareness, and outreach for people living far from consistent medical support.',
    details:
      'The ministry combines health education, screenings, basic care support, and community engagement to improve wellbeing and encourage early response to health needs.',
    highlights: ['Mobile clinics and checkups', 'Health awareness sessions', 'Community wellness outreach'],
    objectives: ['Improve health access', 'Promote prevention and early care', 'Strengthen community wellbeing'],
    goal: 80000,
    raised: 46000,
  },
  {
    slug: 'water-and-sanitation',
    name: 'Water & Sanitation',
    status: 'Ongoing',
    category: 'Community Care',
    image: '/image.png',
    location: 'Underserved villages in Rwanda',
    summary:
      'Installing water wells and improving sanitation facilities for communities facing daily water access challenges.',
    impact: 'Bringing clean water access to 15+ communities.',
    overview:
      'This project responds to the everyday need for clean water and safer sanitation conditions in underserved areas.',
    details:
      'By improving water access and sanitation infrastructure, the ministry helps protect health, reduce hardship, and create a stronger environment for families and children.',
    highlights: ['Water access improvement', 'Sanitation facility support', 'Community hygiene awareness'],
    objectives: ['Expand clean water access', 'Improve community sanitation', 'Reduce water-related health risks'],
    goal: 50000,
    raised: 32000,
  },
  {
    slug: 'vocational-training',
    name: 'Vocational Training',
    status: 'Expanding',
    category: 'Livelihoods',
    image: '/pexels-andrew-degarde-148550826-29422234.jpg',
    location: 'Youth and families across Rwanda',
    summary:
      'Skills training in agriculture, tailoring, and practical trades for economic empowerment and self-reliance.',
    impact: 'Empowering 300+ youth with marketable skills.',
    overview:
      'The Vocational Training project equips people with practical skills that can open pathways to income generation and long-term stability.',
    details:
      'The program emphasizes hands-on learning, character formation, and sustainable skill development that can create real opportunities for young people and families.',
    highlights: ['Hands-on vocational instruction', 'Practical trade development', 'Economic empowerment support'],
    objectives: ['Build employable skills', 'Encourage self-reliance', 'Support long-term family stability'],
    goal: 45000,
    raised: 21000,
  },
  {
    slug: 'orphan-care-center',
    name: 'Orphan Care Center',
    status: 'Active',
    category: 'Community Care',
    image: '/image.png',
    location: 'Support for vulnerable children in Rwanda',
    summary:
      'A care-focused initiative providing shelter, education support, and compassionate attention for vulnerable children.',
    impact: 'Caring for 75+ orphaned and vulnerable children.',
    overview:
      'The Orphan Care Center project exists to provide safety, dignity, spiritual care, and practical support for children facing deep vulnerability.',
    details:
      'The project combines shelter support, educational care, emotional encouragement, and a loving faith-based environment designed to protect and nurture every child.',
    highlights: ['Safe care environment', 'Education and daily support', 'Spiritual and emotional care'],
    objectives: ['Protect vulnerable children', 'Strengthen daily care', 'Create a stable future for each child'],
    goal: 120000,
    raised: 78000,
  },
  {
    slug: 'women-empowerment',
    name: 'Women Empowerment',
    status: 'Growing',
    category: 'Livelihoods',
    image: '/pexels-andrew-degarde-148550826-29422234.jpg',
    location: 'Women entrepreneurs in Rwanda',
    summary:
      'Business support, training, and empowerment opportunities for women building sustainable livelihoods.',
    impact: 'Supporting 200+ women in starting sustainable businesses.',
    overview:
      'The Women Empowerment project helps women strengthen their economic capacity through learning, encouragement, and practical business support.',
    details:
      'By combining training, community support, and small-scale opportunity development, the project encourages confidence, resilience, and sustainable progress.',
    highlights: ['Business training and mentoring', 'Practical empowerment support', 'Community-based growth opportunities'],
    objectives: ['Encourage entrepreneurship', 'Strengthen family livelihoods', 'Promote sustainable progress'],
    goal: 35000,
    raised: 17000,
  },
]

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}
