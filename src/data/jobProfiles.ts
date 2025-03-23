// Job profiles data
export interface JobProfile {
  id: string;
  title: string;
  description: string;
  department: string;
}

export const jobProfiles: JobProfile[] = [
  {
    id: "creative-design",
    title: "Graphic Designer",
    description: "Design innovative visual content for our global e-commerce platform",
    department: "Design"
  },
  {
    id: "product-manager",
    title: "Product Manager",
    description: "Lead product development initiatives for our international marketplace",
    department: "Product"
  },
  {
    id: "software-engineer",
    title: "Software Developer",
    description: "Build and maintain scalable applications for our global platform",
    department: "Engineering"
  },
  {
    id: "marketing-specialist",
    title: "Marketing Coordinator",
    description: "Create and execute marketing strategies across international markets",
    department: "Marketing"
  },
  {
    id: "customer-support",
    title: "Customer Service Agent",
    description: "Provide excellent support to our global customer base",
    department: "Customer Service"
  }
];

// Get job profile by ID
export const getJobProfileById = (id: string): JobProfile | undefined => {
  return jobProfiles.find(profile => profile.id === id);
};

// Get default job profile
export const getDefaultJobProfile = (): JobProfile => {
  return jobProfiles[0];
};