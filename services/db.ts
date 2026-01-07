
import { Job, StorageData } from '../types';

const STORAGE_KEY = 'saudi_job_data';

const DEFAULT_DATA: StorageData = {
  jobs: [
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
    },
    {
      id: '3',
      fullName: 'Abdullah Fahad',
      phoneNumber: '0533334444',
      city: 'Dammam',
      jobRole: 'Sales Manager',
      description: 'Seeking an experienced sales manager with a strong background in real estate sector.',
      email: 'abdullah@example.com',
      postedAt: Date.now() - 259200000
    }
  ],
  viewedJobIds: []
};

export const getDB = (): StorageData => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA));
    return DEFAULT_DATA;
  }
  return JSON.parse(data);
};

export const saveDB = (data: StorageData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const addJob = (job: Job) => {
  const db = getDB();
  db.jobs.unshift(job);
  saveDB(db);
};

export const deleteJob = (id: string, email: string): boolean => {
  const db = getDB();
  const job = db.jobs.find(j => j.id === id);
  if (job && job.email.toLowerCase() === email.toLowerCase()) {
    db.jobs = db.jobs.filter(j => j.id !== id);
    saveDB(db);
    return true;
  }
  return false;
};

export const markAsViewed = (id: string) => {
  const db = getDB();
  if (!db.viewedJobIds.includes(id)) {
    db.viewedJobIds.push(id);
    saveDB(db);
  }
};
