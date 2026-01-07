
import React, { useState, useEffect } from 'react';
import { Job } from '../types';
import { getGlobalJobs, getLocalData } from '../services/api';
import JobCard from '../components/JobCard';
import JobDetailsModal from '../components/JobDetailsModal';
import { Eye } from 'lucide-react';

const ViewedJobsScreen: React.FC = () => {
  const [viewedJobs, setViewedJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  const loadViewedJobs = async () => {
    setLoading(true);
    const globalJobs = await getGlobalJobs();
    const local = getLocalData();
    const filtered = globalJobs.filter(job => local.viewedJobIds.includes(job.id));
    setViewedJobs(filtered);
    setLoading(false);
  };

  useEffect(() => {
    loadViewedJobs();
  }, []);

  return (
    <div className="pb-24 px-6 py-6 animate-in slide-in-from-left-4 duration-300">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-gray-900">Viewed History</h2>
        <p className="text-gray-500 text-sm mt-1">Jobs stored on this device</p>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading your history...</div>
        ) : viewedJobs.length > 0 ? (
          viewedJobs.map(job => (
            <JobCard 
              key={job.id} 
              job={job} 
              onClick={() => setSelectedJob(job)} 
            />
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="text-gray-300" size={32} />
            </div>
            <p className="text-gray-400 font-medium px-10">You haven't opened any job posts on this device yet.</p>
          </div>
        )}
      </div>

      {selectedJob && (
        <JobDetailsModal 
          job={selectedJob} 
          onClose={() => setSelectedJob(null)}
          onDeleted={loadViewedJobs}
        />
      )}
    </div>
  );
};

export default ViewedJobsScreen;
