/**
 * Type definition for a project's detail data
 * Used by ProjectTitle and ProjectInfo components
 */
export interface ProjectData {
  /** Project campaign / display name */
  title: string;
  /** Current status of the project */
  status: 'Active' | 'Planning' | 'Completed' | 'On Hold';
  /** Partner organization name */
  partner: string;
  /** Total acreage covered by the project */
  acreage: number;
  /** Geographic location description */
  location: string;
  /** Watershed name */
  watershed: string;
  /** Project start date */
  startDate: string;
  /** Type of land project */
  projectType: string;
  /** Funding source */
  fundingSource: string;
}

/**
 * Static mock project data for development
 * Maps project titles to their detail data
 */
export const mockProjects: Record<string, ProjectData> = {
  'Tez Naz Iah / Chinle Creek': {
    title: 'Tez Naz Iah / Chinle Creek',
    status: 'Active',
    partner: 'Navajo Nation',
    acreage: 12500,
    location: 'Chinle, AZ',
    watershed: 'Chinle Creek Watershed',
    startDate: '2024-03-15',
    projectType: 'Riparian Restoration',
    fundingSource: 'Federal Grant',
  },
  'Manaus City Center': {
    title: 'Manaus City Center',
    status: 'Active',
    partner: 'Amazon Conservation',
    acreage: 8200,
    location: 'Manaus, Brazil',
    watershed: 'Rio Negro Basin',
    startDate: '2023-09-01',
    projectType: 'Urban Conservation',
    fundingSource: 'International Fund',
  },
  'Wildlife Observation Point': {
    title: 'Wildlife Observation Point',
    status: 'Planning',
    partner: 'Wildlife Conservation Society',
    acreage: 15000,
    location: 'Amazon Basin, Brazil',
    watershed: 'Solimões Watershed',
    startDate: '2025-01-10',
    projectType: 'Wildlife Corridor',
    fundingSource: 'NGO Partnership',
  },
  'Rare Orchid Location': {
    title: 'Rare Orchid Location',
    status: 'Active',
    partner: 'Botanical Research Institute',
    acreage: 3400,
    location: 'Northern Amazon, Brazil',
    watershed: 'Upper Amazon Basin',
    startDate: '2024-06-20',
    projectType: 'Habitat Preservation',
    fundingSource: 'Research Grant',
  },
  'Butterfly Research Site': {
    title: 'Butterfly Research Site',
    status: 'Completed',
    partner: 'Entomological Society',
    acreage: 5600,
    location: 'Central Amazon, Brazil',
    watershed: 'Negro River System',
    startDate: '2022-11-05',
    projectType: 'Biodiversity Study',
    fundingSource: 'University Grant',
  },
};

/**
 * Get project data by title, returns a default if not found
 */
export const getProjectData = (title: string): ProjectData => {
  return mockProjects[title] ?? {
    title,
    status: 'Planning',
    partner: 'Unknown',
    acreage: 0,
    location: 'Unknown',
    watershed: 'Unknown',
    startDate: 'N/A',
    projectType: 'Unknown',
    fundingSource: 'Unknown',
  };
};
