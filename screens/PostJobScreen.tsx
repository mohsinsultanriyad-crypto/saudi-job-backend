
import React, { useState } from 'react';
import { User, Phone, MapPin, Briefcase, FileText, Mail, Send, CheckCircle2 } from 'lucide-react';
import { postGlobalJob } from '../services/api';

interface PostJobScreenProps {
  onSuccess: () => void;
}

const PostJobScreen: React.FC<PostJobScreenProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    city: '',
    jobRole: '',
    description: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const cities = ['Riyadh', 'Jeddah', 'Dammam', 'Makkah', 'Madinah', 'Khobar', 'Dhahran', 'Abha', 'Tabuk', 'Other'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newJob = {
      ...formData,
      id: Math.random().toString(36).substring(2, 9),
      postedAt: Date.now()
    };

    await postGlobalJob(newJob);
    
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-50">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Success!</h2>
        <p className="text-gray-500">Your job post is now live for all users across the Kingdom.</p>
        <p className="text-xs text-gray-400 mt-8">Returning to global listings...</p>
      </div>
    );
  }

  return (
    <div className="pb-24 px-6 py-6 animate-in slide-in-from-right-4 duration-300">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-gray-900">Post a Job</h2>
        <p className="text-gray-500 text-sm mt-1">Hire the best talent across the Kingdom</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Full Name</label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
              <input 
                required
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Ahmed Bin Abdullah"
                className="w-full bg-white border border-gray-100 rounded-xl pl-12 pr-4 py-4 shadow-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Phone Number</label>
              <div className="relative">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input 
                  required
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="05xxxxxxx"
                  className="w-full bg-white border border-gray-100 rounded-xl pl-12 pr-4 py-4 shadow-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Email (For Deletion)</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input 
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@email.com"
                  className="w-full bg-white border border-gray-100 rounded-xl pl-12 pr-4 py-4 shadow-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">City</label>
            <div className="relative">
              <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
              <select 
                required
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full bg-white border border-gray-100 rounded-xl pl-12 pr-4 py-4 shadow-sm focus:ring-2 focus:ring-green-500 outline-none transition-all appearance-none"
              >
                <option value="">Select a city</option>
                {cities.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Job Role</label>
            <div className="relative">
              <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
              <input 
                required
                name="jobRole"
                value={formData.jobRole}
                onChange={handleChange}
                placeholder="e.g. Sales Manager"
                className="w-full bg-white border border-gray-100 rounded-xl pl-12 pr-4 py-4 shadow-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1.5 ml-1">Job Description</label>
            <div className="relative">
              <FileText size={18} className="absolute left-4 top-4 text-gray-300" />
              <textarea 
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the role requirements..."
                rows={5}
                className="w-full bg-white border border-gray-100 rounded-xl pl-12 pr-4 py-4 shadow-sm focus:ring-2 focus:ring-green-500 outline-none transition-all resize-none"
              />
            </div>
          </div>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white font-extrabold py-5 rounded-2xl shadow-xl shadow-green-100 flex items-center justify-center space-x-2 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <Send size={20} />
              <span>PUBLISH GLOBALLY</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PostJobScreen;
