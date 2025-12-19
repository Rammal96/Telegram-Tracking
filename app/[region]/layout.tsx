import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { region: string } }): Promise<Metadata> {
  const region = params?.region?.toLowerCase() || ''
  
  const REGION_NAMES: Record<string, string> = {
    'turkey': 'Turkey',
    'russia': 'Russia',
    'india': 'India',
    'china': 'China',
    'vietnam': 'Vietnam',
    'indonesia': 'Indonesia',
    'germany': 'Germany',
    'france': 'France',
    'arabic': 'Arabic',
    'nigeria': 'Nigeria',
    'tagalog': 'Tagalog',
    'portugal': 'Portugal',
    'spain': 'Spain',
    'malay': 'Malay'
  }

  const regionName = REGION_NAMES[region] || region

  return {
    title: 'New Maestro Tweet',
    description: 'View the latest Maestro tweet',
    openGraph: {
      title: 'New Maestro Tweet',
      description: 'View the latest Maestro tweet',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: 'New Maestro Tweet',
      description: 'View the latest Maestro tweet',
    },
  }
}

export default function RegionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

