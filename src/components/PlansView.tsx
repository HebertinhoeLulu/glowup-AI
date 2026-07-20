import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, X, ShieldAlert, Users, CreditCard, ChevronRight } from 'lucide-react';

interface PlansViewProps {
  currentPlan: 'free' | 'pro';
  onUpgradeSuccess: () => void;
}

export default function PlansView({ currentPlan, onUpgradeSuccess }: PlansViewProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [subscribing, setSubscribing] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  // Simulated subscription logic
  const handleSubscribe = () => {
    setSubscribing(true);
    
    setTimeout(() => {
      setSubscribing(false);
      setSuccessMessage(true);
      onUpgradeSuccess();
      
      setTimeout(() => {
        setSuccessMessage(false);
      }, 5000);
    }, 2000);
  };

  return (
    <div className="flex flex-col w-full px-5 py-6 gap-8">
      
      {/* Alert on dynamic upgrade success */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 inset-x-4 z-50 bg-gradient-to-r from-deep-blue to-electric-violet p-4 rounded-xl shadow-lg border border-white/20 text-center text-xs font-bold text-white flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-data-cyan animate-pulse" />
            <span>Assinatura Pro Evolution ativada com sucesso via Stripe! Todas as métricas de elite e projeções estão desbloqueadas.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-3xl bg-graphite-surface p-8 mt-2 border border-white/5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-electric-violet/10 blur-[50px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-deep-blue/5 blur-[65px] rounded-full"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-violet/10 border border-electric-violet/20">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="font-label-caps text-[9px] text-primary uppercase tracking-widest font-bold">Evolução Máxima</span>
          </div>
          <h1 className="font-display-xl text-xl md:text-3xl font-extrabold text-on-surface leading-tight">Libere seu potencial estético</h1>
          <p className="font-body-md text-xs text-on-surface-variant max-w-[280px] leading-relaxed">
            Tecnologia militar de análise facial agora disponível para sua jornada pessoal.
          </p>
        </div>
      </section>

      {/* Pricing Billing Period Toggle */}
      <div className="flex justify-center">
        <div className="bg-surface-container-high p-1 rounded-full flex items-center gap-1 border border-white/5">
          <button 
            onClick={() => setBillingPeriod('monthly')}
            className={`px-6 py-2 rounded-full font-label-caps text-[9px] tracking-widest font-bold transition-all cursor-pointer ${
              billingPeriod === 'monthly' ? 'bg-electric-violet text-on-primary' : 'text-on-surface-variant'
            }`}
          >
            MENSAL
          </button>
          <button 
            onClick={() => setBillingPeriod('annual')}
            className={`px-6 py-2 rounded-full font-label-caps text-[9px] tracking-widest font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              billingPeriod === 'annual' ? 'bg-electric-violet text-on-primary' : 'text-on-surface-variant'
            }`}
          >
            <span>ANUAL</span>
            <span className="bg-data-cyan/20 text-data-cyan px-2 py-0.5 rounded text-[8px] font-bold">-20%</span>
          </button>
        </div>
      </div>

      {/* Subscription Cards Grid */}
      <div className="flex flex-col gap-6">
        {/* Free Tier Card */}
        <div className="bg-graphite-surface rounded-2xl p-6 border border-white/5 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-title-md text-base font-bold text-on-surface">Essencial</h3>
              <p className="font-label-data text-[10px] text-muted-text uppercase tracking-widest font-semibold">Básico</p>
            </div>
            <div className="text-right">
              <span className="font-display-xl text-2xl font-black text-on-surface">Grátis</span>
            </div>
          </div>

          <ul className="flex flex-col gap-3.5 mb-8 text-xs">
            <li className="flex items-center gap-3 text-on-surface-variant">
              <Check className="w-4 h-4 text-data-cyan shrink-0" />
              <span>Análise Facial Básica (3/mês)</span>
            </li>
            <li className="flex items-center gap-3 text-on-surface-variant/40 line-through">
              <X className="w-4 h-4 text-error shrink-0" />
              <span>Consultoria FaceGPT 4.0</span>
            </li>
            <li className="flex items-center gap-3 text-on-surface-variant/40 line-through">
              <X className="w-4 h-4 text-error shrink-0" />
              <span>Roadmap de Alto Impacto</span>
            </li>
          </ul>

          <button 
            disabled={currentPlan === 'free'}
            className="w-full py-4 rounded-xl border border-outline-variant text-on-surface font-title-md text-xs font-bold transition-all disabled:opacity-60 disabled:bg-white/5 cursor-pointer"
          >
            {currentPlan === 'free' ? 'Plano Atual' : 'Plano Básico'}
          </button>
        </div>

        {/* Pro Tier Card */}
        <div className="bg-surface-container-highest rounded-2xl p-6 border border-electric-violet/30 relative overflow-hidden ring-2 ring-electric-violet/20">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-electric-violet/20 blur-[40px] rounded-full"></div>
          
          <div className="absolute top-4 right-4 bg-electric-violet text-on-primary px-3 py-1 rounded-full font-label-caps text-[9px] tracking-widest font-bold animate-pulse">
            RECOMENDADO
          </div>

          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-title-md text-base font-bold text-on-surface">Pro Evolution</h3>
              <p className="font-label-data text-[10px] text-electric-violet uppercase tracking-widest font-semibold">Acesso Ilimitado</p>
            </div>
            <div className="text-right">
              <div className="flex flex-col">
                <span className="font-display-xl text-3xl font-black text-on-surface leading-none">
                  {billingPeriod === 'monthly' ? 'R$49' : 'R$39'}
                </span>
                <span className="font-label-data text-[10px] text-muted-text">/mês</span>
              </div>
            </div>
          </div>

          <ul className="flex flex-col gap-3.5 mb-8 text-xs">
            <li className="flex items-center gap-3 text-on-surface">
              <Check className="w-4 h-4 text-electric-violet shrink-0" />
              <span className="font-semibold text-primary">FaceGPT: IA em Tempo Real</span>
            </li>
            <li className="flex items-center gap-3 text-on-surface">
              <Check className="w-4 h-4 text-electric-violet shrink-0" />
              <span>Simulações de Procedimentos 3D</span>
            </li>
            <li className="flex items-center gap-3 text-on-surface">
              <Check className="w-4 h-4 text-electric-violet shrink-0" />
              <span>Roadmap de Alto Impacto</span>
            </li>
            <li className="flex items-center gap-3 text-on-surface">
              <Check className="w-4 h-4 text-electric-violet shrink-0" />
              <span>Histórico de Evolução 4D</span>
            </li>
          </ul>

          <button 
            onClick={handleSubscribe}
            disabled={subscribing || currentPlan === 'pro'}
            className="w-full py-4 rounded-xl bg-electric-violet text-pure-white font-title-md text-xs font-bold shadow-[0_0_20px_rgba(124,58,237,0.4)] active:scale-95 hover:shadow-electric-violet/50 transition-all overflow-hidden relative flex items-center justify-center gap-2 cursor-pointer disabled:opacity-80"
          >
            {subscribing ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Conectando ao Stripe...</span>
              </>
            ) : currentPlan === 'pro' ? (
              'Assinatura Pro Ativa'
            ) : (
              'Assinar Agora'
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite]"></div>
          </button>
        </div>
      </div>

      {/* Detailed Comparison Table */}
      <div className="mt-6">
        <h2 className="font-title-md text-sm font-bold text-on-surface mb-4 px-2">Comparativo Detalhado</h2>
        <div className="bg-graphite-surface rounded-2xl overflow-hidden border border-white/5">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-surface-container border-b border-white/5">
                <th className="p-4 font-label-caps text-muted-text font-semibold uppercase tracking-widest">Recurso</th>
                <th className="p-4 font-label-caps text-muted-text text-center font-semibold uppercase tracking-widest">Free</th>
                <th className="p-4 font-label-caps text-electric-violet text-center font-bold uppercase tracking-widest">Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="p-4 text-on-surface-variant font-medium">Análises Diárias</td>
                <td className="p-4 text-center font-label-data text-on-surface">1</td>
                <td className="p-4 text-center font-label-data text-data-cyan font-bold">∞</td>
              </tr>
              <tr>
                <td className="p-4 text-on-surface-variant font-medium">FaceGPT 4.0</td>
                <td className="p-4 text-center"><X className="w-4 h-4 text-error mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-data-cyan mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 text-on-surface-variant font-medium">Simulação 3D</td>
                <td className="p-4 text-center"><X className="w-4 h-4 text-error mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-data-cyan mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 text-on-surface-variant font-medium">Suporte VIP</td>
                <td className="p-4 text-center"><X className="w-4 h-4 text-error mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-data-cyan mx-auto" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-col items-center gap-4 pb-12">
        <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
          <CreditCard className="w-4 h-4 text-primary" />
          <span className="font-label-caps text-muted-text tracking-wider uppercase font-semibold">Pagamento Seguro via Stripe</span>
        </div>
        
        {/* User Avatars using actual preset URLs */}
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full border-2 border-background bg-surface-container-high flex items-center justify-center overflow-hidden">
            <img 
              className="w-full h-full object-cover" 
              alt="Avatar 1" 
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8IMUMW3KRWdjNDMZ8ahQBNa7WqtFeYgLGLY55pIQwdMFHVMMr2P-5DVth6wem7sJ0SIipV21ncvJrUpqdkgD4IiuPerK4gqmOlX2sNdme1aY-Vam4ItuF5FZ-fOd8gp0V3aKcJHE41GtsOIclr34hmP4tWdpHRCUnVMjyRzQr9X974byEUQQ-a6mPBmSAkQNYQ1rBbeUwYfNjm1NbafT-6GtdFztP8ckSrQqRmEqFh4_QSuE0_VfI" 
            />
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-background bg-surface-container-high flex items-center justify-center overflow-hidden">
            <img 
              className="w-full h-full object-cover" 
              alt="Avatar 2" 
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDceercbOvqI0cG47eg8g-dKk90cPRohPav6_g89Zb8XtOxTB9Esq_yq_mCrPfTcmv_hX1epA1yu9QyWgNms8I-U-BaQu9v0di9Zaaaad5QimLPF0N8fREWQ5tlkMl-6vPA-v0sKi9WHjPCPzrWZJK30Qe8vF5xgbGLZbWL1fBvSRFFxHGdj692MjPyPMNFNAYS3y9575_IhFghnzqKBt8FvLwqrO6S9OGyQzm1xatLtBQLzzHx7ygX" 
            />
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-background bg-surface-container-high flex items-center justify-center text-[10px] font-mono font-bold text-on-surface">
            +2k
          </div>
        </div>
        <p className="font-label-caps text-muted-text text-[9px] tracking-wider uppercase font-semibold">Junte-se a milhares de usuários Pro</p>
      </div>
    </div>
  );
}
