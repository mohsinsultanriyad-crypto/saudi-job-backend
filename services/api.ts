
import { Job, LocalData } from '../types';

/**
 * GLOBAL BACKEND SIMULATION
 */
const GLOBAL_JOBS_KEY = 'saudi_job_global_db';
const LOCAL_STORAGE_KEY = 'saudi_job_local_device';

const DEFAULT_GLOBAL_JOBS: Job[] = [
  {
    id: '1',
    fullName: 'Ahmed Mohammed',
    phoneNumber: '0501234567',
    city: 'Riyadh',
    jobRole: 'Software Engineer',
    description: 'Looking for a senior React developer to join our growing fintech team in the heart of Riyadh.',
    email: 'ahmed@example.com',
    postedAt: Date.now() - 86400000
  },
  {
    id: '2',
    fullName: 'Sarah Khalid',
    phoneNumber: '0559876543',
    city: 'Jeddah',
    jobRole: 'Graphic Designer',
    description: 'Creative designer needed for an advertising agency. Must be proficient in Adobe Creative Cloud.',
    email: 'sarah@example.com',
    postedAt: Date.now() - 172800000
  }
];

export const getGlobalJobs = async (): Promise<Job[]> => {
  await new Promise(r => setTimeout(r, 300));
  const data = localStorage.getItem(GLOBAL_JOBS_KEY);
  if (!data) {
    // Initialize if empty
    localStorage.setItem(GLOBAL_JOBS_KEY, JSON.stringify(DEFAULT_GLOBAL_JOBS));
    return DEFAULT_GLOBAL_JOBS;
  }
  return JSON.parse(data);
};

export const postGlobalJob = async (job: Job): Promise<void> => {
  const jobs = await getGlobalJobs();
  const updated = [job, ...jobs];
  localStorage.setItem(GLOBAL_JOBS_KEY, JSON.stringify(updated));
};

export const deleteGlobalJob = async (id: string, email?: string, isAdmin: boolean = false): Promise<boolean> => {
  const jobs = await getGlobalJobs();
  const jobExists = jobs.some(j => j.id === id);
  
  if (!jobExists) {
    console.error("Job not found in database:", id);
    return false;
  }

  // Admin bypass or email check
  if (isAdmin || (email && jobs.find(j => j.id === id)?.email.toLowerCase() === email.toLowerCase())) {
    const updated = jobs.filter(j => j.id !== id);
    localStorage.setItem(GLOBAL_JOBS_KEY, JSON.stringify(updated));
    console.log(`Job ${id} deleted successfully. Admin: ${isAdmin}`);
    return true;
  }
  
  console.warn("Delete permission denied for job:", id);
  return false;
};

export const getLocalData = (): LocalData => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : { viewedJobIds: [] };
};

export const saveLocalData = (data: LocalData) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

export const markAsViewedLocal = (id: string) => {
  const data = getLocalData();
  if (!data.viewedJobIds.includes(id)) {
    data.viewedJobIds.push(id);
    saveLocalData(data);
  }
};
