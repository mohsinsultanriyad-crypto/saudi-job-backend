
export interface Job {
  id: string;
  fullName: string;
  phoneNumber: string;
  city: string;
  jobRole: string;
  description: string;
  email: string;
  postedAt: number;
}

export type TabType = 'ALL_JOBS' | 'POST_JOB' | 'VIEWED_JOBS' | 'ADMIN_PANEL';

export interface LocalData {
  viewedJobIds: string[];
}

// Added StorageData interface to resolve the import error in services/db.ts
export interface StorageData {
  jobs: Job[];
  viewedJobIds: string[];
}
