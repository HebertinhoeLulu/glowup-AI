import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, TrendingUp, Lock, Sparkles, Brain, Loader, ChevronRight } from 'lucide-react';
import { AnalysisResult } from '../types';

interface JourneyViewProps {
  analysisResult: AnalysisResult | null;
  onBack: () => void;
}

export default function JourneyView({ analysisResult, onBack }: JourneyViewProps) {
  const [projecting, setProjecting] = useState<boolean>(false);
  const [projectionProgress, setProjectionProgress] = useState<number>(0);
  const [projectionComplete, setProjectionComplete] = useState<boolean>(false);

  // Trigger Score Projection simulation
  const handleStartProjection = () => {
    setProjecting(true);
    setProjectionProgress(0);
    setProjectionComplete(false);

    const interval = setInterval(() => {
      setProjectionProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setProjectionComplete(true);
          }, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 180);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header with Back button */}
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl border-b border-white/5">
        <div className="h-16 px-4 flex items-center gap-3 max-w-lg mx-auto">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center text-on-surface hover:bg-surface-variant/30 rounded-full transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-title-md text-base font-bold text-on-surface truncate">Detalhes Da Análise</h1>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="pt-16 pb-24 px-5 flex flex-col gap-8 max-w-xl mx-auto">
        
        {/* Intro Section */}
        <section className="py-6 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full text-electric-violet" viewBox="0 0 400 200">
              <path 
                className="opacity-30" 
                d="M0 150 Q 50 140, 100 155 T 200 120 T 300 80 T 400 40" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              />
            </svg>
          </div>
          
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-data-cyan animate-pulse"></span>
              <span className="font-label-caps text-[10px] text-data-cyan uppercase tracking-widest font-bold">Jornada Ativa</span>
            </div>
            <h2 className="font-display-xl text-2xl font-bold text-on-surface">Sua Evolução Facial</h2>
            <p className="font-body-md text-xs text-muted-text max-w-xs leading-relaxed">
              Mapeamento biométrico de remodelamento muscular e projeção de resultados com IA.
            </p>
          </div>
        </section>

        {/* Historic Score trendline Sparkline Card */}
        <section className="mb-2">
          <div className="bg-graphite-surface rounded-xl p-6 relative overflow-hidden group border border-white/5">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-electric-violet/5 blur-[50px] rounded-full group-hover:bg-electric-violet/10 transition-all duration-700"></div>
            
            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="font-label-caps text-[10px] text-muted-text uppercase tracking-widest mb-1 font-semibold">Score Atual</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display-xl text-4xl font-extrabold text-on-surface">
                    {analysisResult ? Math.round(analysisResult.score * 10) : 84}
                  </span>
                  <span className="font-label-data text-xs text-data-cyan font-bold">+12% vs Mês 0</span>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-label-caps text-[10px] text-muted-text uppercase tracking-widest mb-1 font-semibold">Status</p>
                <span className="font-body-md text-xs text-on-surface px-3 py-1 bg-surface-variant/50 rounded-full border border-white/5 font-semibold">
                  Otimizando
                </span>
              </div>
            </div>

            {/* Sparkline Graph */}
            <div className="w-full h-40 relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 320 120">
                <defs>
                  <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Horizontal Grid Lines */}
                <line stroke="white" strokeOpacity="0.05" strokeDasharray="4" x1="0" y1="20" x2="320" y2="20" />
                <line stroke="white" strokeOpacity="0.05" strokeDasharray="4" x1="0" y1="60" x2="320" y2="60" />
                <line stroke="white" strokeOpacity="0.05" strokeDasharray="4" x1="0" y1="100" x2="320" y2="100" />
                
                {/* Area Fill */}
                <path d="M0 105 L40 100 L120 80 L200 55 L280 35 L320 20 L320 120 L0 120 Z" fill="url(#chartGradient)" />
                
                {/* Curve line path */}
                <path 
                  d="M0 105 L40 100 L120 80 L200 55 L280 35 L320 20" 
                  fill="none" 
                  stroke="#7C3AED" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                
                {/* Interactive Points */}
                <circle cx="0" cy="105" r="4.5" fill="#131315" stroke="#7C3AED" strokeWidth="2.5" />
                <circle cx="120" cy="80" r="4.5" fill="#131315" stroke="#7C3AED" strokeWidth="2.5" />
                <circle cx="280" cy="35" r="6" fill="#7C3AED" className="animate-pulse" />
                
                {/* Tooltip badge floating at Month 8 */}
                <g transform="translate(280, 22)">
                  <rect x="-15" y="-22" width="30" height="18" rx="4" fill="#7C3AED" />
                  <text x="0" y="-10" fill="white" className="font-label-data text-[9px] font-bold" textAnchor="middle">84</text>
                </g>
              </svg>
              
              <div className="flex justify-between mt-4 text-[9px] font-label-caps text-muted-text font-bold">
                <span>M0 (Início)</span>
                <span>M4</span>
                <span>M8 (Atual)</span>
                <span>M12</span>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Journey Steps */}
        <section className="space-y-4">
          <h3 className="font-title-md text-sm font-bold text-on-surface mb-6">Fases do Programa</h3>
          
          <div className="flex flex-col gap-0">
            {/* Step 1 - Finalizado */}
            <div className="flex gap-4 group">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center border border-outline-variant group-hover:border-electric-violet transition-colors">
                  <Check className="w-4 h-4 text-data-cyan" />
                </div>
                <div className="w-0.5 h-full bg-surface-variant mt-2"></div>
              </div>
              
              <div className="flex-1 pb-8">
                <div className="bg-graphite-surface/50 rounded-xl p-5 border border-white/5">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-title-md text-sm font-bold text-on-surface">Mês 0 — 8: Início</h4>
                    <span className="font-label-data text-[10px] text-muted-text font-semibold uppercase tracking-wider">Finalizado</span>
                  </div>
                  
                  <p className="font-body-md text-xs text-muted-text mb-4">
                    Alinhamento estético de postura de língua, deglutição atípica e relaxamento de tecidos hipercontraídos.
                  </p>
                  
                  {/* Monthly jawline progress images */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative h-24 rounded-lg overflow-hidden bg-graphite-dark border border-white/5">
                      <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGcDnTitFfJfBDtYUAepUH3T41O_ZgGgOGCYFW4aTZ6sFlr4NeLn_97QVBFbE5COTTaYDgq1_Poz2eaP3Dt_J3h2BY2CMOVVV1U4A7W-XRtzRUuhPUNTPEYtvmLMG3oVGjcxLehZ9_cL9-NR0qyMMMJBIjzTfy9whuDOAE6rXChS8A_TvhnpAQWhFtPw-kqeiXt_w89au3ToeNECUlhgy6k9pArSwTmjgKz_UtvyKUATmAQ55AbTXc" 
                        alt="Ricardo Mês 0" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 left-1.5 bg-black/70 px-2 py-0.5 rounded text-[8px] font-mono text-white">Mês 0</span>
                    </div>

                    <div className="relative h-24 rounded-lg overflow-hidden bg-graphite-dark border border-white/5">
                      <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAraOitkogZtX2LKginM8_NgUFiq9FoD-vtVaSxtjgEFkjVB36ojlFjHQg8gJqxKx__wbyU_3Fiwn1vPVq4mHjwo3fxf7cbEJYQiLaaM9Ck1A3V-R-SesfoNGtu6hZE9MvABnGXVu1-PXv7dIZn5Uzrdfw8SoChkjH97BG-KsgW0_Liq4aFeDlg8pY8RLX6npwMUmnOZ1QkCJz4eh8hbyiPipxVAQQqKtYhaRWLSu_0aetuKG5yAR1w" 
                        alt="Ricardo Mês 8" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 left-1.5 bg-black/70 px-2 py-0.5 rounded text-[8px] font-mono text-white">Mês 8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 - Ativo */}
            <div className="flex gap-4 group">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-electric-violet flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.4)]">
                  <TrendingUp className="w-4 h-4 text-pure-white" />
                </div>
                <div className="w-0.5 h-full bg-gradient-to-b from-electric-violet to-surface-variant/30 mt-2"></div>
              </div>

              <div className="flex-1 pb-8">
                <div className="bg-graphite-surface rounded-xl p-5 border border-electric-violet/20 relative">
                  <div className="absolute top-4 right-4 bg-electric-violet/10 border border-electric-violet/20 text-electric-violet text-[8px] font-label-caps px-2 py-0.5 rounded-full font-bold">ATUAL</div>
                  
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-title-md text-sm font-bold text-on-surface">Mês 8 — 14: Resultados</h4>
                    <span className="font-label-data text-[10px] text-data-cyan font-semibold">Em progresso</span>
                  </div>

                  <p className="font-body-md text-xs text-on-surface-variant leading-relaxed mb-4">
                    Consolidação da definição mandibular e redução de assimetrias oculares através de masseter flex e estímulo mastigatório bilateral.
                  </p>

                  <div className="bg-surface-container-high rounded-lg p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-electric-violet/15 flex items-center justify-center border border-electric-violet/20">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-label-data text-xs text-on-surface font-semibold">Próximo Scan: 12 dias</p>
                      <p className="font-label-caps text-[9px] text-muted-text font-semibold uppercase tracking-wider">PREPARAÇÃO PARA FASE 3</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 - Locked */}
            <div className="flex gap-4 opacity-40">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center">
                  <Lock className="w-4 h-4 text-muted-text" />
                </div>
              </div>

              <div className="flex-1">
                <div className="bg-graphite-surface/30 rounded-xl p-5 border border-transparent">
                  <h4 className="font-title-md text-sm font-bold text-on-surface">Mês 14 — 24: Refinamento</h4>
                  <p className="font-body-md text-xs text-muted-text mt-1">
                    Otimização de detalhes finos, manutenção de simetria labial avançada e rigidez de contorno de tecidos moles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trigger Score Projection button */}
        <section className="mt-4">
          <button 
            onClick={handleStartProjection}
            className="w-full bg-electric-violet text-pure-white font-title-md h-14 rounded-full flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-electric-violet/20 hover:shadow-electric-violet/35 group relative overflow-hidden text-sm font-bold cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-pure-white group-hover:rotate-12 transition-transform" />
            <span>Ver Projeção de Score</span>
          </button>
          <p className="text-center font-label-caps text-[10px] text-muted-text mt-4 opacity-60 tracking-wider">Baseado em 4.2M de pontos de dados de fotogrametria</p>
        </section>
      </div>

      {/* Projection Simulation Overlay / Modal */}
      <AnimatePresence>
        {projecting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-graphite-dark/95 backdrop-blur-xl flex flex-col items-center justify-center p-6"
          >
            {!projectionComplete ? (
              <div className="w-full max-w-sm flex flex-col items-center text-center gap-6">
                <div className="w-20 h-20 rounded-full border-2 border-data-cyan flex items-center justify-center mb-4 relative shadow-[0_0_25px_rgba(0,245,255,0.25)]">
                  <div className="absolute inset-0 rounded-full border-t-2 border-data-cyan animate-spin"></div>
                  <Brain className="w-9 h-9 text-data-cyan animate-pulse" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="font-display-xl text-lg font-extrabold text-on-surface">Calculando Potencial AI</h2>
                  <p className="font-body-md text-xs text-muted-text max-w-xs leading-relaxed">
                    Processando simulações de remodelamento ósseo e muscular para os próximos 12 a 24 meses...
                  </p>
                </div>

                <div className="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden border border-white/5 mt-4">
                  <div 
                    className="h-full bg-data-cyan shadow-[0_0_8px_#00F5FF] transition-all duration-150 ease-out" 
                    style={{ width: `${projectionProgress}%` }}
                  />
                </div>
                <span className="font-mono text-xs text-data-cyan font-bold">{projectionProgress}%</span>
              </div>
            ) : (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-sm flex flex-col items-center text-center bg-graphite-surface p-8 rounded-3xl border border-electric-violet/20 relative overflow-hidden shadow-2xl"
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-data-cyan/5 blur-[50px] rounded-full"></div>
                
                <div className="font-label-caps text-data-cyan mb-2 text-xs font-bold tracking-widest">PROJEÇÃO FINAL ESTIMADA</div>
                <div className="font-display-xl text-on-surface text-7xl font-black mb-4 tracking-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">92</div>
                <div className="bg-data-cyan/15 border border-data-cyan/30 text-data-cyan px-4 py-1.5 rounded-full font-label-data text-xs font-bold mb-6">NÍVEL ELITE</div>
                
                <p className="font-body-md text-xs text-on-surface-variant mb-8 leading-relaxed">
                  Seguindo o protocolo recomendado de treino de masseter, Mewing ativo e rotina anti-poros ativa, você atingirá seu pico estético em aproximadamente 7 meses.
                </p>
                
                <button 
                  onClick={() => setProjecting(false)} 
                  className="w-full border border-white/20 text-on-surface hover:bg-white/5 font-title-md h-14 rounded-full text-xs font-bold tracking-wider cursor-pointer transition-colors"
                >
                  Voltar à Jornada
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
