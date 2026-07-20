import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home as HomeIcon, Scan, CreditCard, User as UserIcon, Bell, Sparkles, Activity } from 'lucide-react';

import { Tab, AnalysisResult, UserProfile } from './types';
import HomeView from './components/HomeView';
import AnalysisView from './components/AnalysisView';
import JourneyView from './components/JourneyView';
import PlansView from './components/PlansView';
import ProfileView from './components/ProfileView';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [latestAnalysis, setLatestAnalysis] = useState<AnalysisResult | null>(null);

  // User Profile state
  const [profile, setProfile] = useState<UserProfile>({
    name: "Ricardo M.",
    email: "cryptobuy170@gmail.com",
    avatarUrl: "",
    streakDays: 12,
    analysesCount: 4,
    activePlan: "free",
    preferences: {
      targetJawline: true,
      targetSkin: true,
      targetSymmetry: false,
      notifications: true
    }
  });

  const handleStartAnalysis = () => {
    setActiveTab('analise');
  };

  const handleGoToPlans = () => {
    setActiveTab('planos');
  };

  const handleGoToJourney = (result: AnalysisResult) => {
    setLatestAnalysis(result);
    setProfile(prev => ({
      ...prev,
      analysesCount: prev.analysesCount + 1,
      streakDays: prev.streakDays + 1
    }));
    setActiveTab('journey');
  };

  const handleUpgradeSuccess = () => {
    setProfile(prev => ({
      ...prev,
      activePlan: 'pro'
    }));
  };

  return (
    <div className="bg-background font-body-md text-on-background flex flex-col min-h-screen">
      {/* Top Fixed Header - Hidden only inside the Active Journey sub-screen */}
      {activeTab !== 'journey' && (
        <header className="fixed top-0 inset-x-0 z-50 bg-surface/80 backdrop-blur-xl pt-safe border-b border-white/5 shadow-sm">
          <div className="h-16 px-4 flex items-center justify-between max-w-lg mx-auto">
            <div className="flex items-center gap-2.5">
              <div className="w-8.5 h-8.5 rounded-lg bg-electric-violet flex items-center justify-center shadow-[0_0_12px_#7C3AED]">
                <Sparkles className="w-4.5 h-4.5 text-pure-white" />
              </div>
              <span className="font-title-md text-base font-extrabold tracking-wider text-on-surface">GLOWUP AI</span>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => alert("Central de Notificações: Suas fotos de evolução mensal foram processadas!")}
                className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer w-9 h-9 flex items-center justify-center hover:bg-white/5 rounded-full"
              >
                <Bell className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => setActiveTab('perfil')}
                className="w-8.5 h-8.5 rounded-full bg-primary/25 border border-primary/30 flex items-center justify-center text-primary cursor-pointer hover:bg-primary/40 transition-all shadow-sm"
              >
                <UserIcon className="w-4 h-4 text-primary" />
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className={`flex-1 relative w-full ${activeTab !== 'journey' ? 'pt-16 pb-24' : ''} max-w-lg mx-auto bg-background min-h-screen`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full"
          >
            {activeTab === 'home' && (
              <HomeView 
                onStartAnalysis={handleStartAnalysis} 
                onGoToPlans={handleGoToPlans} 
              />
            )}
            {activeTab === 'analise' && (
              <AnalysisView 
                onGoToJourney={handleGoToJourney} 
                onGoToPlans={handleGoToPlans}
                userPlan={profile.activePlan}
              />
            )}
            {activeTab === 'journey' && (
              <JourneyView 
                analysisResult={latestAnalysis} 
                onBack={() => setActiveTab('analise')} 
              />
            )}
            {activeTab === 'planos' && (
              <PlansView 
                currentPlan={profile.activePlan} 
                onUpgradeSuccess={handleUpgradeSuccess} 
              />
            )}
            {activeTab === 'perfil' && (
              <ProfileView 
                profile={profile} 
                onUpdateProfile={setProfile} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Bar (Bottom) - Hidden inside Active Journey details */}
      {activeTab !== 'journey' && (
        <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/80 backdrop-blur-xl border-t border-white/5 shadow-[0_-2px_10px_rgba(0,0,0,0.2)]">
          <div className="flex justify-around items-center h-16 px-2 max-w-lg mx-auto">
            
            {/* Tab 1: Home */}
            <button 
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center justify-center gap-1 w-full transition-all cursor-pointer ${
                activeTab === 'home' ? 'text-electric-violet' : 'text-on-surface-variant opacity-60'
              }`}
            >
              <HomeIcon className="w-5 h-5" />
              <span className="font-label-caps text-[8px] font-bold uppercase tracking-wider">Home</span>
            </button>

            {/* Tab 2: Análise */}
            <button 
              onClick={() => setActiveTab('analise')}
              className={`flex flex-col items-center justify-center gap-1 w-full transition-all cursor-pointer ${
                activeTab === 'analise' ? 'text-electric-violet' : 'text-on-surface-variant opacity-60'
              }`}
            >
              <Scan className="w-5 h-5" />
              <span className="font-label-caps text-[8px] font-bold uppercase tracking-wider">Análise</span>
            </button>

            {/* Tab 3: Planos */}
            <button 
              onClick={() => setActiveTab('planos')}
              className={`flex flex-col items-center justify-center gap-1 w-full transition-all cursor-pointer ${
                activeTab === 'planos' ? 'text-electric-violet' : 'text-on-surface-variant opacity-60'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span className="font-label-caps text-[8px] font-bold uppercase tracking-wider">Planos</span>
            </button>

            {/* Tab 4: Perfil */}
            <button 
              onClick={() => setActiveTab('perfil')}
              className={`flex flex-col items-center justify-center gap-1 w-full transition-all cursor-pointer ${
                activeTab === 'perfil' ? 'text-electric-violet' : 'text-on-surface-variant opacity-60'
              }`}
            >
              <UserIcon className="w-5 h-5" />
              <span className="font-label-caps text-[8px] font-bold uppercase tracking-wider">Perfil</span>
            </button>

          </div>
        </nav>
      )}
    </div>
  );
}
