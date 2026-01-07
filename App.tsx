
import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import AllJobsScreen from './screens/AllJobsScreen';
import PostJobScreen from './screens/PostJobScreen';
import ViewedJobsScreen from './screens/ViewedJobsScreen';
import AdminScreen from './screens/AdminScreen';
import { TabType } from './types';
import { Lock, X } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('ALL_JOBS');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Admin Login State
  const [adminId, setAdminId] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // SECURE: Hardcoded credentials for prototype
    if (adminId === 'admin' && adminPass === 'saudi_admin_2025') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setActiveTab('ADMIN_PANEL');
      setAdminId('');
      setAdminPass('');
      setLoginError('');
    } else {
      setLoginError('Invalid Admin Credentials');
    }
  };

  const renderScreen = () => {
    if (activeTab === 'ADMIN_PANEL' && isAdmin) {
      return <AdminScreen onLogout={() => {
        setIsAdmin(false);
        setActiveTab('ALL_JOBS');
      }} />;
    }

    switch (activeTab) {
      case 'ALL_JOBS':
        return <AllJobsScreen />;
      case 'POST_JOB':
        return <PostJobScreen onSuccess={() => setActiveTab('ALL_JOBS')} />;
      case 'VIEWED_JOBS':
        return <ViewedJobsScreen />;
      default:
        return <AllJobsScreen />;
    }
  };

  return (
    <div className="min-h-screen max-w-lg mx-auto bg-gray-50 shadow-2xl relative flex flex-col overflow-hidden">
      <Header onAdminGesture={() => !isAdmin && setShowAdminLogin(true)} />
      
      <main className="flex-1 overflow-y-auto no-scrollbar bg-gray-50">
        {renderScreen()}
      </main>

      {!isAdmin && (
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xs rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-green-100 p-3 rounded-2xl">
                <Lock className="text-green-600" size={24} />
              </div>
              <button onClick={() => setShowAdminLogin(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-1">Admin Access</h3>
            <p className="text-sm text-gray-500 mb-6">Secure portal for staff members only.</p>
            
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <input 
                type="text" 
                placeholder="Admin ID"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 transition-all"
              />
              <input 
                type="password" 
                placeholder="Password"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 transition-all"
              />
              {loginError && <p className="text-xs text-red-500 font-bold ml-1">{loginError}</p>}
              <button 
                type="submit"
                className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl active:scale-95 transition-transform"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
