import { motion } from 'motion/react';
import { ArrowRight, Bell, User, Sparkles, CheckCircle2, ShieldCheck, Heart, Info } from 'lucide-react';
import RotatingSphere from './RotatingSphere';
import ShaderCanvas from './ShaderCanvas';

interface HomeViewProps {
  onStartAnalysis: () => void;
  onGoToPlans: () => void;
}

export default function HomeView({ onStartAnalysis, onGoToPlans }: HomeViewProps) {
  return (
    <div className="flex flex-col w-full relative">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden px-5 pt-10 pb-16 border-b border-white/5 min-h-[90vh] flex flex-col justify-center">
        {/* Background Ambient Shader - 40% Opacity */}
        <div className="absolute inset-0 w-full h-full opacity-40 pointer-events-none z-0">
          <ShaderCanvas />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Animated 3D Wireframe Icosahedron */}
          <div className="mb-6 w-full h-64 md:h-80 relative flex items-center justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80">
              <RotatingSphere />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-4 max-w-lg"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-violet/10 border border-electric-violet/20 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="font-label-caps text-[10px] text-primary uppercase tracking-widest">IA Facial Homologada</span>
            </div>

            <h1 className="font-display-xl text-3xl md:text-5xl text-on-background max-w-md mx-auto leading-tight font-extrabold tracking-tight">
              Sua Aparência. <br />
              <span className="text-electric-violet drop-shadow-[0_0_15px_rgba(124,58,237,0.3)]">Medida.</span> <br />
              Melhorada.
            </h1>

            <p className="font-body-lg text-sm md:text-base text-on-surface-variant max-w-sm mx-auto leading-relaxed">
              Analise seu rosto em 100+ métricas cientificamente fundamentadas para atingir sua melhor versão.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 z-20"
          >
            <button
              onClick={onStartAnalysis}
              id="start-analysis-btn"
              className="bg-electric-violet text-pure-white font-title-md py-4 px-10 rounded-full shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] active:scale-95 transition-all duration-300 flex items-center gap-2 font-semibold text-sm hover:translate-y-[-2px] cursor-pointer"
            >
              <span>Iniciar Análise</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section className="px-5 py-16 bg-surface-container-lowest/40 relative">
        <div className="flex flex-col gap-8 max-w-xl mx-auto">
          <div className="space-y-2">
            <span className="font-label-caps text-xs text-electric-violet uppercase tracking-widest font-bold">Processo</span>
            <h2 className="font-display-xl text-2xl font-bold text-on-surface">Como Funciona</h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Step 1 */}
            <motion.div
              whileHover={{ y: -4, borderColor: 'rgba(124, 58, 237, 0.2)' }}
              className="bg-graphite-surface p-6 rounded-xl border border-white/5 relative overflow-hidden group transition-all duration-300"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-electric-violet/5 rounded-full blur-2xl group-hover:bg-electric-violet/10 transition-colors"></div>
              <span className="font-label-data text-xs text-data-cyan mb-4 block font-semibold">01</span>
              <h3 className="font-title-md text-base font-semibold text-on-surface mb-2">Capture</h3>
              <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                Envie uma foto frontal com iluminação neutra ou use nossa câmera simulada em tempo real para nossa IA processar.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              whileHover={{ y: -4, borderColor: 'rgba(0, 245, 255, 0.2)' }}
              className="bg-graphite-surface p-6 rounded-xl border border-white/5 relative overflow-hidden group transition-all duration-300"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-deep-blue/5 rounded-full blur-2xl group-hover:bg-deep-blue/10 transition-colors"></div>
              <span className="font-label-data text-xs text-data-cyan mb-4 block font-semibold">02</span>
              <h3 className="font-title-md text-base font-semibold text-on-surface mb-2">Análise</h3>
              <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                Mapeamos 100+ pontos de referência faciais, simetria de proporção áurea, ângulo goníaco e textura da pele de forma instantânea.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              whileHover={{ y: -4, borderColor: 'rgba(124, 58, 237, 0.2)' }}
              className="bg-graphite-surface p-6 rounded-xl border border-white/5 relative overflow-hidden group transition-all duration-300"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-electric-violet/5 rounded-full blur-2xl group-hover:bg-electric-violet/10 transition-colors"></div>
              <span className="font-label-data text-xs text-data-cyan mb-4 block font-semibold">03</span>
              <h3 className="font-title-md text-base font-semibold text-on-surface mb-2">Evolução</h3>
              <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                Acompanhe o remodelamento em uma linha do tempo ativa com planos personalizados de skincare, exercícios para a mandíbula e grooming.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Resultados Reais Section */}
      <section className="px-5 py-16 bg-surface-container-low/30 border-t border-white/5">
        <div className="flex flex-col gap-10 max-w-xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="font-display-xl text-2xl font-bold text-on-surface">Resultados Reais</h2>
            <p className="font-body-md text-xs text-muted-text">Transformações baseadas em dados e consistência de treino facial.</p>
          </div>

          <div className="flex flex-col gap-8">
            {/* Case study: Ricardo M */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden aspect-[4/3] bg-graphite-dark relative border border-white/5">
                <div className="relative h-full">
                  <img
                    className="w-full h-full object-cover"
                    alt="Ricardo M. Antes"
                    referrerPolicy="no-referrer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBykk6yfKtv9jHgifP2_LHSMAmSiugekxCgZCxXAk0BacaeAXmkgPMb-qPsUOQvCJ-5Dxom5W6zESwNe_ogzhJLzXj_NSuqCNsvfPnDh_cBOwK2kUGXZGgJRAf6h78uidnkxein9gMWNmQjxHOoIaMrtPjV88eU0EYpJOtgiN_nV5bltEYTTOLQJ71egVZFiMh6iCffAE0ytLyV6At1abh63qwlwGZUbDLxBndSgXNtyjPIP95M-sn2"
                  />
                  <div className="absolute bottom-2 left-2 bg-graphite-dark/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                    <span className="font-label-caps text-[9px] text-pure-white tracking-widest font-bold">ANTES</span>
                  </div>
                </div>
                <div className="relative h-full">
                  <img
                    className="w-full h-full object-cover"
                    alt="Ricardo M. Depois"
                    referrerPolicy="no-referrer"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCW1aZG27jlSt_UqqyUKcToTGU7tTC34_tJLulzsInEcsCE-ht6TvswKvvIuLEzR-eo1dt-hMCN6Ba9gGKQ2aeGKHwc0wOMmNEPxuXUAnZCIMuC2ST_q2By6z4CbDWlWnf0hqeBUe_ffJL907SRmE_NdwTM-lo_OLUos5UEMOOtCeTLmbAbBTWhbgVoQW9vnUkEGyDPJNjyKHAwiwEbyQuwVIVn9C1fPrUfRpqQJsAkZ-O84MSvCPvA"
                  />
                  <div className="absolute bottom-2 right-2 bg-electric-violet px-2.5 py-0.5 rounded-full shadow-[0_0_8px_#7C3AED]">
                    <span className="font-label-caps text-[9px] text-pure-white tracking-widest font-bold">DEPOIS</span>
                  </div>
                </div>
              </div>

              {/* Ricardo Stats info card */}
              <div className="flex justify-between items-center bg-graphite-surface p-4 rounded-xl border border-white/5">
                <div>
                  <p className="font-title-md text-sm font-semibold text-on-surface">Ricardo M.</p>
                  <p className="font-label-data text-xs text-muted-text">+14% na simetria maxilofacial</p>
                </div>
                <div className="text-right">
                  <div className="text-data-cyan font-label-data text-base font-bold">8.4</div>
                  <div className="text-[9px] font-label-caps text-muted-text uppercase tracking-widest font-semibold">Score AI</div>
                </div>
              </div>
            </div>

            {/* Metrics Elite Preview */}
            <div className="bg-gradient-to-br from-electric-violet/20 to-deep-blue/20 p-6 rounded-2xl border border-electric-violet/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-data-cyan/5 rounded-full blur-xl"></div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-electric-violet/20 border border-electric-violet/30 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-title-md text-sm font-semibold text-on-surface">Métricas de Elite</h4>
                  <p className="font-label-data text-xs text-on-surface-variant/80">Precisão de sub-milímetros</p>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs text-on-surface-variant">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="opacity-80">Ângulo de Mandíbula</span>
                  <span className="text-data-cyan font-semibold">124.5°</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="opacity-80">Simetria Cantal</span>
                  <span className="text-data-cyan font-semibold">98.2%</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="opacity-80">Proporção Nasal</span>
                  <span className="text-data-cyan font-semibold">1.618 (Áurea)</span>
                </div>
              </div>
            </div>

            {/* Premium Call to Action */}
            <div className="bg-gradient-to-r from-deep-blue/10 to-electric-violet/10 rounded-2xl p-6 border border-electric-violet/20 text-center space-y-4">
              <h4 className="text-base font-bold text-on-surface">Pronto para liberar seu potencial?</h4>
              <p className="text-xs text-on-surface-variant max-w-xs mx-auto">
                Desbloqueie o acompanhamento diário e diagnósticos ilimitados para começar sua evolução facial hoje.
              </p>
              <button
                onClick={onGoToPlans}
                className="w-full bg-surface-container-high hover:bg-surface-variant text-primary font-bold text-xs py-3 rounded-xl border border-electric-violet/20 transition-all cursor-pointer"
              >
                Ver Planos Pro
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
