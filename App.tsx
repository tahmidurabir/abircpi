import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Terminal as TerminalIcon, 
  Moon, 
  Sun, 
  Code, 
  Zap, 
  User, 
  Mail,
  ExternalLink,
  ChevronRight,
  Monitor,
  Cpu,
  Database,
  Palette,
  X,
  Send,
  FileText,
  BarChart3,
  ArrowUpRight,
  Hand,
  MessageCircle,
  Clock,
  ShieldCheck,
  TrendingUp,
  Lightbulb,
  Infinity as InfinityIcon,
  Menu,
  Briefcase
} from 'lucide-react';
import { PROJECTS, SKILLS, TIMELINE } from './constants';
import { Project, Theme } from './types';
import { getTerminalResponse } from './geminiService';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer
} from 'recharts';

// --- Components ---

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/8801819255933"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] flex items-center justify-center p-4 bg-[#25D366] rounded-full shadow-2xl hover:scale-110 transition-transform interactive"
      initial={{ scale: 0 }}
      animate={{ 
        scale: 1,
        rotate: [0, -10, 10, -10, 10, 0],
      }}
      transition={{ 
        rotate: { repeat: Infinity, duration: 2, delay: 1 },
        scale: { type: 'spring', stiffness: 260, damping: 20 }
      }}
    >
      <motion.div
        className="absolute inset-0 bg-[#25D366] rounded-full"
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
      <MessageCircle size={32} className="text-white relative z-10" fill="currentColor" />
    </motion.a>
  );
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(target.tagName) || target.closest('.interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-orange-500 pointer-events-none z-[9999]"
        animate={{ 
          x: position.x - 16, 
          y: position.y - 16,
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? 'rgba(251, 146, 60, 0.15)' : 'transparent'
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
      />
      <div 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-orange-400 rounded-full pointer-events-none z-[9999]"
        style={{ transform: `translate(${position.x - 3}px, ${position.y - 3}px)` }}
      />
    </>
  );
};

const Terminal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ cmd: string; res: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    setLoading(true);
    setInput('');

    let res = "";
    if (cmd === 'clear') {
      setHistory([]);
      setLoading(false);
      return;
    } else if (cmd === 'help') {
      res = "Available commands: automation, n8n, journey, ask [question], clear, help";
    } else if (cmd === 'automation') {
      res = "Automating the boring stuff using n8n and PostgreSQL. JSON is my first language.";
    } else if (cmd.startsWith('ask ')) {
      res = await getTerminalResponse(cmd.replace('ask ', ''));
    } else {
      res = "System error: Code 404. Type 'help' for available manual commands.";
    }

    setHistory(prev => [...prev, { cmd: input, res }]);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <div className="w-full max-w-2xl h-[450px] bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden flex flex-col shadow-2xl shadow-orange-500/20">
        <div className="bg-zinc-800 p-2 px-4 flex justify-between items-center border-b border-zinc-700">
          <div className="flex items-center gap-2 text-zinc-400 font-mono text-sm">
            <TerminalIcon size={16} />
            <span>Tahmidur_Automation_Terminal_v2.0</span>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto font-mono text-sm text-orange-400">
          <div className="mb-4 text-zinc-500">Welcome to the automation hub. Try typing 'help'.</div>
          {history.map((item, i) => (
            <div key={i} className="mb-3">
              <div className="flex gap-2">
                <span className="text-purple-400">tahmidur@automation:~$</span>
                <span className="text-white">{item.cmd}</span>
              </div>
              <div className="mt-1 text-zinc-300 ml-4">{item.res}</div>
            </div>
          ))}
          {loading && <div className="animate-pulse text-zinc-500">Processing workflow...</div>}
        </div>
        <form onSubmit={handleCommand} className="p-4 bg-zinc-950/50 border-t border-zinc-700 flex gap-2">
          <span className="text-purple-400 font-mono">~$</span>
          <input 
            autoFocus
            className="flex-1 bg-transparent border-none outline-none font-mono text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </div>
    </motion.div>
  );
};

const SkillMatrix = () => {
  const radarData = useMemo(() => {
    return [
      { subject: 'n8n', A: 98 },
      { subject: 'PostgreSQL', A: 92 },
      { subject: 'JSON', A: 95 },
      { subject: 'Workflows', A: 96 },
      { subject: 'AI Integration', A: 90 },
      { subject: 'JS/TS', A: 85 }
    ];
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
          <PolarGrid stroke="#3f3f46" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 12 }} />
          <Radar
            name="Skills"
            dataKey="A"
            stroke="#fb923c"
            fill="#fb923c"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

const ProjectModal = ({ project, isOpen, onClose }: { project: Project | null; isOpen: boolean; onClose: () => void }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-5xl bg-zinc-900 border border-zinc-700 rounded-3xl overflow-hidden max-h-[90vh] flex flex-col sm:flex-row shadow-2xl shadow-orange-500/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full sm:w-1/2 overflow-hidden h-64 sm:h-auto">
              <img src={project.imageUrl} className="w-full h-full object-cover" alt={project.title} />
            </div>
            <div className="flex-1 p-6 sm:p-10 overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-extrabold mb-2 text-gradient">{project.title}</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs border border-zinc-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-6 text-zinc-300 leading-relaxed">
                <p>{project.longDescription}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-zinc-800/50 rounded-2xl border border-zinc-700">
                    <span className="text-xs text-orange-500 block mb-1 uppercase tracking-widest">Type</span>
                    <span className="font-medium">Automation Suite</span>
                  </div>
                  <div className="p-4 bg-zinc-800/50 rounded-2xl border border-zinc-700">
                    <span className="text-xs text-purple-500 block mb-1 uppercase tracking-widest">Stack</span>
                    <span className="font-medium">n8n + SQL</span>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button className="flex-1 py-3 btn-gradient text-white rounded-xl flex items-center justify-center gap-2 font-semibold transition-transform hover:scale-105">
                    <ExternalLink size={18} /> View Architecture
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [nameClickCount, setNameClickCount] = useState(0);

  const handleNameClick = () => {
    setNameClickCount(prev => prev + 1);
    if (nameClickCount + 1 >= 5) {
      setIsTerminalOpen(true);
      setNameClickCount(0);
    }
  };

  return (
    <div className="bg-[#030303] min-h-screen text-zinc-100 selection:bg-orange-500/40 relative transition-colors duration-1000 overflow-x-hidden">
      <CustomCursor />
      <WhatsAppButton />
      
      {/* Immersive Background Decorations */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle Noise */}
        <div className="absolute inset-0 bg-noise" />
        
        {/* Main Glow Orb */}
        <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[5%] w-[30vw] h-[30vw] bg-orange-600/5 blur-[100px] rounded-full" />

        {/* Floating Wireframe Cube Decor */}
        <div className="absolute top-[15%] right-[15%] opacity-40 scale-75 md:scale-100">
           <div className="wireframe-cube">
             <div className="cube-face face-front" />
             <div className="cube-face face-back" />
             <div className="cube-face face-left" />
             <div className="cube-face face-right" />
             <div className="cube-face face-top" />
             <div className="cube-face face-bottom" />
           </div>
        </div>

        {/* Secondary Wireframe Cube Decor */}
        <div className="absolute bottom-[20%] left-[10%] opacity-20 scale-50">
           <div className="wireframe-cube" style={{ animationDirection: 'reverse', animationDuration: '30s' }}>
             <div className="cube-face face-front" />
             <div className="cube-face face-back" />
             <div className="cube-face face-left" />
             <div className="cube-face face-right" />
             <div className="cube-face face-top" />
             <div className="cube-face face-bottom" />
           </div>
        </div>
      </div>

      <header className="fixed top-0 left-0 w-full z-50 border-b border-white/5 backdrop-blur-xl bg-black/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            onClick={handleNameClick}
            className="text-xl font-bold tracking-tighter flex items-center gap-2 cursor-pointer select-none interactive"
          >
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-orange-500 rounded-lg shadow-lg shadow-orange-500/20" />
            <span className="text-gradient">Tahmidur_Rahman</span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsTerminalOpen(true)}
              className="p-2 hover:bg-white/5 rounded-full text-white hover:text-orange-400 transition-all interactive"
              title="Open Terminal"
            >
              <TerminalIcon size={20} />
            </button>
            <a href="https://wa.me/8801819255933" target="_blank" className="hidden sm:block px-5 py-2.5 bg-zinc-900 text-white font-semibold rounded-full text-sm hover:bg-zinc-800 border border-white/10 transition-colors interactive no-underline">
              Hire me
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="hero" className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 space-y-8"
          >
            <div className="space-y-2">
              <h1 className="text-6xl md:text-8xl font-bold flex items-center gap-4 text-white">
                Hi! <motion.span animate={{ rotate: [0, 20, 0, 20, 0] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block">👋</motion.span>
              </h1>
              <h2 className="text-4xl md:text-6xl font-bold text-white">
                <span className="text-gradient">Tahmidur Rahman</span> is a
              </h2>
            </div>

            <div className="space-y-6">
              <div className="relative group">
                <div className="flex items-center gap-4">
                   <div className="w-8 h-8 flex items-center justify-center text-orange-400">
                      <Zap size={32} strokeWidth={2.5} className="animate-pulse" />
                   </div>
                   <div className="h-[2px] w-48 bg-gradient-to-r from-purple-500/50 to-orange-500/50 relative">
                      <div className="absolute right-0 top-0 -translate-y-full text-[10px] uppercase font-bold text-orange-400 tracking-widest mb-1">
                        Professional
                      </div>
                   </div>
                </div>
                <h3 className="text-5xl md:text-7xl font-bold text-gradient mt-4 leading-tight">
                  Automation Specialist
                </h3>
              </div>

              <p className="text-lg md:text-xl text-white max-w-lg leading-relaxed">
                Expert in <strong>n8n</strong>, <strong>PostgreSQL</strong>, and complex <strong>JSON</strong> workflows. Crafting smart automations that scale businesses with vibe coding precision.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-6">
                <a href="https://wa.me/8801819255933" target="_blank" className="px-10 py-5 btn-gradient text-white font-bold rounded-full flex items-center gap-3 shadow-xl shadow-orange-600/30 transition-all hover:scale-105 interactive no-underline">
                  Let's Automate <ArrowUpRight size={22} />
                </a>
                <a href="#why-automation" className="px-10 py-5 bg-transparent border-2 border-zinc-800 text-white font-bold rounded-full flex items-center gap-3 hover:bg-zinc-800 transition-all hover:scale-105 hover:border-orange-500/50 interactive no-underline">
                  View capabilities
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-full md:w-1/2 relative flex justify-center items-center"
          >
            <div className="absolute inset-0 z-0 overflow-visible pointer-events-none">
               <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-2 border-orange-500/5 rounded-[4rem] opacity-30" 
               />
            </div>

            <div className="relative z-10 w-[400px] h-[500px] md:w-[500px] md:h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-orange-500/20 rounded-[3rem] -rotate-3 blur-sm" />
              <div className="absolute top-[-20px] left-[-20px] w-full h-full bg-zinc-900 rounded-[3rem] border border-orange-500/10 -z-10" />

              <div className="absolute inset-0 rounded-[3rem] overflow-hidden border border-white/10 group shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
                  alt="Tahmidur Rahman" 
                  className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
              </div>

              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -right-6 glass p-4 rounded-2xl border border-orange-500/20 flex items-center gap-3 shadow-2xl"
              >
                <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Hand className="text-white" size={20} />
                </div>
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Available</div>
                  <div className="text-xs font-bold text-white">Custom Workflows</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* The Journey Section with Gradient Borders */}
        <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-20 text-center text-gradient">The Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-800 hidden md:block" />
            <div className="space-y-16">
              {TIMELINE.map((event, i) => (
                <div key={event.id} className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-1 w-full md:text-right">
                    {i % 2 === 0 ? (
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="border-gradient p-6 transition-all"
                      >
                        <h3 className="text-xl font-bold text-white">{event.title}</h3>
                        <p className="text-zinc-400 text-sm mt-2">{event.description}</p>
                      </motion.div>
                    ) : null}
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-orange-600 border-4 border-zinc-950 z-10 flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/20">
                    {event.icon === 'zap' ? <Zap size={20} className="text-white" /> : 
                     event.icon === 'code' ? <Code size={20} className="text-white" /> : 
                     <Briefcase size={20} className="text-white" />}
                  </div>
                  <div className="flex-1 w-full">
                    {i % 2 !== 0 ? (
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="border-gradient p-6 transition-all"
                      >
                        <h3 className="text-xl font-bold text-white">{event.title}</h3>
                        <p className="text-zinc-400 text-sm mt-2">{event.description}</p>
                      </motion.div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Automation Section with Gradient Borders */}
        <section id="why-automation" className="py-32 px-6 max-w-7xl mx-auto overflow-hidden relative">
          <div className="text-center mb-24 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-4"
            >
              The Power of Modern Workflow
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-gradient leading-tight">
              Why You Need <br className="hidden md:block" /> Automation Today
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {[
              { icon: <Clock size={32} />, title: "Time Multiplication", desc: "Turn 40-hour tasks into 4-second workflows.", color: "from-orange-500 to-orange-600" },
              { icon: <ShieldCheck size={32} />, title: "Error Elimination", desc: "Workflows execute with 100% precision.", color: "from-purple-500 to-purple-600" },
              { icon: <TrendingUp size={32} />, title: "Infinite Scalability", desc: "Scale without adding headcount.", color: "from-blue-500 to-blue-600" },
              { icon: <Lightbulb size={32} />, title: "Strategic Focus", desc: "Free your team from the 'boring stuff.'", color: "from-green-500 to-green-600" }
            ].map((benefit, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group border-gradient p-10 transition-all duration-500 relative overflow-hidden rounded-[2.5rem]"
              >
                <div className="space-y-6 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-orange-500">
                    {benefit.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{benefit.title}</h3>
                  <p className="text-zinc-400">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <h2 className="text-4xl md:text-5xl font-black text-gradient">The Matrix</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: <Monitor size={24} />, title: "n8n Specialist" },
                  { icon: <Database size={24} />, title: "SQL Architect" },
                  { icon: <Code size={24} />, title: "JSON Wizard" },
                  { icon: <Cpu size={24} />, title: "Workflow Design" },
                ].map((item, i) => (
                  <div key={i} className="p-6 border-gradient interactive transition-all">
                    <div className="text-orange-500 mb-2">{item.icon}</div>
                    <h3 className="font-bold text-white">{item.title}</h3>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-gradient p-10 rounded-[3rem]">
              <SkillMatrix />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 max-w-5xl mx-auto text-center">
          <div className="border-gradient p-10 md:p-24 rounded-[4rem] space-y-8 relative overflow-hidden">
             <h2 className="text-4xl md:text-7xl font-black text-gradient">Ready to <br /> Scale?</h2>
             <a href="https://wa.me/8801819255933" target="_blank" className="inline-flex px-12 py-6 btn-gradient text-white font-bold rounded-full items-center gap-3 no-underline text-xl">
               Message on WhatsApp <MessageCircle size={24} />
             </a>
          </div>
        </section>
      </main>

      <footer className="py-20 px-6 border-t border-white/5 text-center text-zinc-400 text-sm">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-center gap-8 text-white">
            <a href="https://github.com/tahmidurabir" target="_blank"><Github size={24} className="hover:text-orange-400" /></a>
            <a href="https://www.linkedin.com/in/tahmidurpro/" target="_blank"><Linkedin size={24} className="hover:text-orange-400" /></a>
            <a href="https://github.com/tahmidurabir" target="_blank"><Twitter size={24} className="hover:text-orange-400" /></a>
          </div>
          <p>Tahmidur Rahman. Built for Automation.</p>
        </div>
      </footer>

      <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      <ProjectModal project={activeProject} isOpen={!!activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}