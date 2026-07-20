import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Award, Flame, BarChart2, ShieldAlert, Sparkles, Settings, Bell, Palette, Globe, CheckCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
}

export default function ProfileView({ profile, onUpdateProfile }: ProfileViewProps) {
  const [name, setName] = useState<string>(profile.name);
  const [saved, setSaved] = useState<boolean>(false);

  const handleSaveName = (e: FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      name
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const togglePreference = (key: 'targetJawline' | 'targetSkin' | 'targetSymmetry' | 'notifications') => {
    if (key === 'notifications') {
      onUpdateProfile({
        ...profile,
        preferences: {
          ...profile.preferences,
          notifications: !profile.preferences.notifications
        }
      });
    } else {
      onUpdateProfile({
        ...profile,
        preferences: {
          ...profile.preferences,
          [key]: !profile.preferences[key as keyof typeof profile.preferences]
        }
      });
    }
  };

  return (
    <div className="flex flex-col w-full px-5 py-6 gap-6 max-w-xl mx-auto">
      
      {/* Profile Header Block */}
      <div className="bg-graphite-surface p-6 rounded-2xl border border-white/5 relative overflow-hidden flex flex-col items-center text-center">
        <div className="absolute top-0 right-0 w-24 h-24 bg-electric-violet/5 blur-xl rounded-full"></div>
        
        {/* Glowing Profile Avatar Ring */}
        <div className="w-20 h-20 rounded-full bg-electric-violet/10 border-2 border-electric-violet/30 flex items-center justify-center mb-4 relative shadow-[0_0_15px_rgba(124,58,237,0.2)]">
          <User className="w-10 h-10 text-primary" />
          <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-data-cyan flex items-center justify-center border-2 border-graphite-surface shadow">
            <Award className="w-3.5 h-3.5 text-graphite-dark" />
          </div>
        </div>

        <form onSubmit={handleSaveName} className="space-y-1 w-full max-w-xs">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu Nome"
            className="bg-transparent text-center font-display-xl text-base font-extrabold text-on-surface focus:outline-none focus:border-b focus:border-electric-violet/50 w-full py-1"
          />
          <p className="text-xs text-muted-text font-medium flex items-center justify-center gap-1">
            <Mail className="w-3.5 h-3.5" />
            <span>{profile.email}</span>
          </p>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="px-4 py-1.5 bg-surface-container hover:bg-surface-variant text-primary font-bold text-[10px] rounded-full border border-white/5 tracking-wider uppercase cursor-pointer"
            >
              {saved ? 'Nome Salvo!' : 'Editar Nome'}
            </button>
          </div>
        </form>
      </div>

      {/* Stats Streak Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Streak Block */}
        <div className="bg-graphite-surface p-4 rounded-xl border border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div>
            <p className="text-xs text-muted-text font-semibold">Ofensiva</p>
            <p className="text-sm font-mono font-bold text-on-surface">{profile.streakDays} dias</p>
          </div>
        </div>

        {/* Analyses Executed */}
        <div className="bg-graphite-surface p-4 rounded-xl border border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-data-cyan/10 flex items-center justify-center text-data-cyan">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-text font-semibold">Escaneamentos</p>
            <p className="text-sm font-mono font-bold text-on-surface">{profile.analysesCount} sessões</p>
          </div>
        </div>
      </div>

      {/* Active Subscription badge */}
      <div className="bg-gradient-to-br from-electric-violet/15 to-deep-blue/15 p-5 rounded-2xl border border-electric-violet/20 flex justify-between items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-electric-violet/10 blur-[40px] rounded-full"></div>
        <div>
          <span className="font-label-caps text-[9px] text-primary uppercase tracking-widest font-bold block mb-1">Assinatura Ativa</span>
          <p className="text-sm font-bold text-on-surface capitalize">
            {profile.activePlan === 'pro' ? 'Pro Evolution' : 'Essencial Grátis'}
          </p>
        </div>
        <div className="bg-electric-violet/20 text-electric-violet border border-electric-violet/30 px-3.5 py-1.5 rounded-full text-[10px] font-bold">
          {profile.activePlan === 'pro' ? 'ILIMITADO' : 'MÉDIDO'}
        </div>
      </div>

      {/* Objective preferences */}
      <div className="space-y-3">
        <h3 className="font-title-md text-xs font-bold text-on-surface uppercase tracking-wider">Seus Objetivos Faciais</h3>
        
        <div className="bg-graphite-surface rounded-2xl border border-white/5 divide-y divide-white/5 text-xs">
          {/* Objective 1 */}
          <button 
            onClick={() => togglePreference('targetJawline')}
            className="w-full p-4 flex justify-between items-center text-left cursor-pointer hover:bg-white/5 transition-all"
          >
            <div>
              <p className="font-semibold text-on-surface">Definição de Mandíbula</p>
              <p className="text-[10px] text-muted-text mt-0.5">Rotinas focadas no fortalecimento do músculo masseter.</p>
            </div>
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
              profile.preferences.targetJawline ? 'bg-data-cyan border-data-cyan text-graphite-dark' : 'border-outline-variant'
            }`}>
              {profile.preferences.targetJawline && <CheckCircle className="w-4 h-4 fill-current text-white" />}
            </div>
          </button>

          {/* Objective 2 */}
          <button 
            onClick={() => togglePreference('targetSkin')}
            className="w-full p-4 flex justify-between items-center text-left cursor-pointer hover:bg-white/5 transition-all"
          >
            <div>
              <p className="font-semibold text-on-surface">Textura e Viço da Pele</p>
              <p className="text-[10px] text-muted-text mt-0.5">Foco em cuidados contra acne, hidratação profunda e redução de poros.</p>
            </div>
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
              profile.preferences.targetSkin ? 'bg-data-cyan border-data-cyan text-graphite-dark' : 'border-outline-variant'
            }`}>
              {profile.preferences.targetSkin && <CheckCircle className="w-4 h-4 fill-current text-white" />}
            </div>
          </button>

          {/* Objective 3 */}
          <button 
            onClick={() => togglePreference('targetSymmetry')}
            className="w-full p-4 flex justify-between items-center text-left cursor-pointer hover:bg-white/5 transition-all"
          >
            <div>
              <p className="font-semibold text-on-surface">Simetria Cantal e Ocular</p>
              <p className="text-[10px] text-muted-text mt-0.5">Exercícios para alinhar proporções de terço médio ocular.</p>
            </div>
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
              profile.preferences.targetSymmetry ? 'bg-data-cyan border-data-cyan text-graphite-dark' : 'border-outline-variant'
            }`}>
              {profile.preferences.targetSymmetry && <CheckCircle className="w-4 h-4 fill-current text-white" />}
            </div>
          </button>
        </div>
      </div>

      {/* General Settings */}
      <div className="space-y-3">
        <h3 className="font-title-md text-xs font-bold text-on-surface uppercase tracking-wider">Ajustes de Sistema</h3>
        
        <div className="bg-graphite-surface rounded-2xl border border-white/5 divide-y divide-white/5 text-xs">
          <button 
            onClick={() => togglePreference('notifications')}
            className="w-full p-4 flex justify-between items-center text-left cursor-pointer hover:bg-white/5 transition-all"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-primary" />
              <div>
                <p className="font-semibold text-on-surface">Notificações Push</p>
                <p className="text-[10px] text-muted-text mt-0.5">Lembretes diários de skincare e treino masseter.</p>
              </div>
            </div>
            <div className={`w-10 h-5 rounded-full transition-all relative cursor-pointer flex items-center ${
              profile.preferences.notifications ? 'bg-electric-violet' : 'bg-surface-variant'
            }`}>
              <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all shadow-sm ${
                profile.preferences.notifications ? 'right-0.5' : 'left-0.5'
              }`} />
            </div>
          </button>
        </div>
      </div>

      {/* Credits block */}
      <p className="text-center text-[10px] text-muted-text font-mono opacity-50 py-4 uppercase tracking-widest font-bold">
        GLOWUP AI v1.2.4 • Desenvolvido com IA
      </p>
    </div>
  );
}
