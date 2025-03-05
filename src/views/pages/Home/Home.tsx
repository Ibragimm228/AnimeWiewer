"use client";
import { useSchedule } from '../../../hooks/useSchedule';
import { useUpdates } from '../../../hooks/useUpdates';
import XomakLoader from '../../../ui/XomakLoader';
import { Slider } from '../../components/';
import { TitlesSchedule } from '../../components/';
import { motion, Variants } from 'framer-motion';
import { Update, CalendarMonth, Explore, ArrowForward, Tv, Star, Notifications } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';


const fadeInUp: Variants = {
  initial: { 
    opacity: 0, 
    y: 40 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const scaleIn: Variants = {
  initial: { 
    scale: 0.9,
    opacity: 0 
  },
  animate: { 
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }
  }
};

const trailerVideos = [
  {
    url: "/770945562.mp4",
    title: "Demon Slayer Trailer",
    thumbnail: "/770945562.mp4"
  },
  {
    url: "/8367355.mp4",
    title: "Jujutsu Kaisen Trailer",
    thumbnail: "/8367355.mp4"
  },
  {
    url: "/8713748.mp4",
    title: "Attack on Titan Trailer",
    thumbnail: "/8713748.mp4"
  }
];

export const Home = () => {
  const { data: updates, isLoading: updatesLoading } = useUpdates({ limit: 10 });
  const { data: schedule, isLoading: scheduleLoading } = useSchedule();
  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [updatesRef, updatesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [scheduleRef, scheduleInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

 
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 600);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

 

  
  const handleVideoEnd = () => {
    setCurrentVideoIndex(prevIndex => 
      prevIndex === trailerVideos.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (updatesLoading || scheduleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-dark-900 to-dark-800 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] rounded-full bg-primary-500/10 blur-[150px]" />
          <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] rounded-full bg-accent-600/10 blur-[150px]" />
        </div>
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary-500/30 blur-[80px] animate-pulse-soft"></div>
          <div className="animate-bounce-soft">
            <XomakLoader />
          </div>
        </div>
        <p className="absolute mt-52 text-primary-400 animate-pulse-soft text-xl font-medium tracking-wide">
          Загрузка мира аниме<span className="animate-ellipsis">...</span>
        </p>
      </div>
    );
  }

  const handleNotifyClick = () => {
    toast.success('Уведомления включены!', {
      icon: '🔔',
      style: {
        background: 'rgba(15, 23, 42, 0.9)',
        color: '#fff',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        borderRadius: '12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      duration: 4000,
    });
  };

  const features = [
    { 
      icon: <Tv className="w-6 h-6" />, 
      title: "HD качество", 
      description: "Все аниме в высоком разрешении для отличного просмотра" 
    },
    { 
      icon: <Notifications className="w-6 h-6" />, 
      title: "Обновления", 
      description: "Обновления выходят почти каждую неделю" 
    },
    { 
      icon: <Star className="w-6 h-6" />, 
      title: "Хомяк", 
      description: "Загрузочный экран с хомяком, ради него вот реально стоит" 
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
      {/* Фоновые элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-[5%] w-[800px] h-[800px] rounded-full bg-primary-500/8 blur-[180px]" />
        <div className="absolute bottom-0 right-[5%] w-[700px] h-[700px] rounded-full bg-accent-600/8 blur-[150px]" />
        <div className="absolute top-[40%] right-[20%] w-[500px] h-[500px] rounded-full bg-primary-700/5 blur-[120px]" />
        
        {/* Фоновая сетка */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Декоративные линии */}
        <div class="absolute h-px w-1/3 left-0 top-[20%] bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
        <div class="absolute h-px w-1/3 right-0 top-[60%] bg-gradient-to-r from-transparent via-accent-500/50 to-transparent"></div>
      </div>

      {/* Основной контент */}
      <motion.section
        ref={heroRef}
        initial="initial"
        animate={heroInView ? "animate" : "initial"}
        variants={staggerContainer}
        className="relative py-28 mb-16 overflow-hidden"
      >
        <div className="container px-6 md:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <motion.div 
              variants={fadeInUp}
              className="lg:w-1/2 space-y-8 z-10"
            >
              <motion.div variants={scaleIn} className="inline-block mb-4">
                <span className="px-4 py-2 rounded-full bg-primary-500/20 backdrop-blur-md border border-primary-500/30 text-primary-400 text-sm font-medium">
                  Новый сезон уже доступен
                </span>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                <span className="relative">
                  <span className="">
                    Аниме
                  </span>
                  <motion.span 
                    initial={{ width: 0 }} 
                    animate={{ width: '100%' }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                  />
                </span>{" "}
                для истинных ценителей
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-xl text-gray-300 max-w-2xl leading-relaxed"
              >
                Исследуйте огромную коллекцию аниме, следите за новинками и наслаждайтесь просмотром в высоком качестве на любом устройстве 
              </motion.p>
              
              <motion.div 
                variants={fadeInUp}
                className="flex flex-wrap gap-5 pt-6"
              >
                <NavLink to="/anime">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-custom bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white rounded-xl px-8 py-4 flex items-center gap-2 font-semibold shadow-lg shadow-primary-500/25 transition-all"
                  >
                    <Explore className="w-5 h-5" />
                    <span>Смотреть аниме</span>
                  </motion.button>
                </NavLink>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNotifyClick}
                  className="btn-custom bg-dark-800/80 backdrop-blur-md hover:bg-dark-700/80 border border-gray-700/50 text-gray-200 rounded-xl px-8 py-4 flex items-center gap-2 font-semibold transition-all"
                >
                  <Notifications className="w-5 h-5 text-primary-400" />
                  <span>Включить уведомления</span>
                </motion.button>
              </motion.div>
              
              <motion.div 
                variants={fadeInUp}
                className="flex items-center gap-6 mt-12 pl-2"
              >
                <div className="text-gray-300">
                  <span className="text-white font-semibold">9.000.000.000. +</span> активных пользователей
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              variants={scaleIn}
              className="hidden lg:block lg:w-5/12 relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary-500/20 to-accent-500/20 rounded-2xl blur-lg"></div>
              <div className="relative bg-gradient-to-tr from-dark-800 to-dark-900 border border-gray-700/30 rounded-2xl p-1 shadow-2xl shadow-primary-900/20 backdrop-blur-sm">
                <div className="aspect-video rounded-xl overflow-hidden relative bg-dark-800">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    key={currentVideoIndex}
                    className="absolute inset-0"
                  >
                    <video
                      src={trailerVideos[currentVideoIndex].url}
                      poster={trailerVideos[currentVideoIndex].thumbnail}
                      title={trailerVideos[currentVideoIndex].title}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      onEnded={handleVideoEnd}
                      playsInline
                    />
                  </motion.div>
                  
                  {/* Индикаторы видео */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                    {trailerVideos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentVideoIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentVideoIndex 
                            ? 'bg-primary-500 w-6' 
                            : 'bg-gray-400/50 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                  
                  {/* Кнопки управления */}
                  <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => setCurrentVideoIndex(prev => prev === 0 ? trailerVideos.length - 1 : prev - 1)}
                      className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setCurrentVideoIndex(prev => prev === trailerVideos.length - 1 ? 0 : prev + 1)}
                      className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Волнистая разделительная линия */}
        <div className="absolute bottom-0 left-0 w-full h-16 overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-full">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.72C57.71,59.42,158.75,88.95,228.87,101.86Z" fill="rgba(17, 24, 39, 0.8)"></path>
          </svg>
        </div>
      </motion.section>
      
      {/* Секция с функциями сайта */}
      <motion.section
        ref={featuresRef}
        initial="initial"
        animate={featuresInView ? "animate" : "initial"}
        variants={staggerContainer}
        className="relative py-16"
      >
        <div className="container px-6 md:px-8">
          <motion.div 
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400">
              Почему выбирают мою платформу
            </h2>
            <p className="text-gray-400 text-lg">
              Удобный интерфейс и мощные функции для лучшего просмотра аниме
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-dark-800/60 backdrop-blur-lg border border-gray-700/30 rounded-xl p-8 h-full transition-all duration-300 hover:shadow-xl hover:shadow-primary-900/10 overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-bl-full"></div>
                  
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500/20 to-accent-500/20 backdrop-blur-sm flex items-center justify-center mb-6 text-primary-400">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {updates && (
        <motion.section 
          ref={updatesRef}
          initial="initial"
          animate={updatesInView ? "animate" : "initial"}
          variants={staggerContainer}
          className="relative py-16"
        >
          <div className="container px-6 md:px-8">
            <motion.div 
              variants={fadeInUp}
              className="flex items-center justify-between mb-10"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-500/20 backdrop-blur-sm flex items-center justify-center text-primary-500">
                  <Update className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
                  Последние обновления
                </h2>
              </div>
              
              <NavLink to="/anime" className="hidden sm:flex items-center gap-2 text-primary-400 hover:text-primary-500 transition-colors duration-300">
                <span className="font-medium">Смотреть все</span>
                <ArrowForward className="w-5 h-5" />
              </NavLink>
            </motion.div>
            
            <motion.div 
              variants={scaleIn}
              className="relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-2xl blur-lg"></div>
              <div className="relative bg-dark-800/60 backdrop-blur-xl border border-gray-700/30 rounded-xl p-8 shadow-xl shadow-primary-900/5 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 blur-3xl rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/5 blur-3xl rounded-full"></div>
                
                <Slider animeList={updates.list} />
              </div>
            </motion.div>
            
            <div className="flex sm:hidden justify-center mt-8">
              <NavLink to="/anime" className="btn-custom bg-dark-800/60 backdrop-blur-md hover:bg-dark-700/60 border border-gray-700/50 text-gray-200 rounded-xl px-6 py-3 flex items-center gap-2 font-medium transition-all">
                <span>Смотреть все</span>
                <ArrowForward className="w-5 h-5" />
              </NavLink>
            </div>
          </div>
        </motion.section>
      )}
      
      {schedule && (
        <motion.section 
          ref={scheduleRef}
          initial="initial"
          animate={scheduleInView ? "animate" : "initial"}
          variants={staggerContainer}
          className="relative py-16"
        >
          <div className="container px-6 md:px-8">
            <motion.div 
              variants={fadeInUp}
              className="flex items-center gap-4 mb-10"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-500/20 backdrop-blur-sm flex items-center justify-center text-primary-500">
                <CalendarMonth className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
                Расписание выхода серий
              </h2>
            </motion.div>
            
            <motion.div 
              variants={scaleIn}
              className="relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-accent-500/10 to-primary-500/10 rounded-2xl blur-lg"></div>
              <div className="relative bg-dark-800/60 backdrop-blur-xl border border-gray-700/30 rounded-xl p-8 shadow-xl shadow-primary-900/5 overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500/5 blur-3xl rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-500/5 blur-3xl rounded-full"></div>
                
                <TitlesSchedule schedule={schedule} />
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}
      
      <motion.section 
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="relative py-24"
      >
        <div className="container px-6 md:px-8">
          <motion.div 
            variants={scaleIn}
            className="relative"
          >
            <div className="absolute -inset-3 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-3xl blur-xl"></div>
            <div className="relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-dark-900/95 to-dark-800/95 backdrop-blur-xl"></div>
              <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center py-16 px-8">
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-8"
                >
                  <Star className="w-10 h-10 text-white" />
                </motion.div>
                
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-400">
                  Готовы начать свое аниме-приключение?
                </h2>
                
                <p className="text-xl text-gray-300 mb-10 max-w-2xl">
                  Присоединяйтесь к нашему сообществу и откройте для себя удивительный мир аниме прямо сейчас!
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-custom bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-400 hover:to-accent-400 text-white rounded-xl px-10 py-4 flex items-center gap-3 font-semibold text-lg shadow-lg shadow-primary-500/30 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                  <span>Начать бесплатно</span>
                </motion.button>
                
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-10 text-gray-400">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Без рекламы</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Отмена в любое время</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Загрузка на устройство</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
  
      <style jsx>{`
        .heading-gradient {
          background: linear-gradient(to right, rgb(var(--color-primary-400)), rgb(var(--color-accent-400)));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        .animate-pulse-soft {
          animation: pulse-soft 3s infinite;
        }
        
        .animate-bounce-soft {
          animation: bounce-soft 2s infinite;
        }
        
        .animate-ellipsis::after {
          content: '';
          animation: ellipsis 1.5s infinite;
        }
        
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes bounce-soft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes ellipsis {
          0% { content: '.'; }
          33% { content: '..'; }
          66% { content: '...'; }
        }
        
        .btn-custom {
          position: relative;
          overflow: hidden;
        }
        
        .btn-custom::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 5px;
          height: 5px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 0;
          border-radius: 100%;
          transform: scale(1, 1) translate(-50%);
          transform-origin: 50% 50%;
        }
        
        .btn-custom:hover::after {
          animation: ripple 1s ease-out;
        }
        
        @keyframes ripple {
          0% {
            transform: scale(0, 0);
            opacity: 1;
          }
          20% {
            transform: scale(25, 25);
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: scale(40, 40);
          }
        }
      `}</style>
    </div>
  );
};