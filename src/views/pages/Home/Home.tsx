"use client";
import { useSchedule } from '../../../hooks/useSchedule';
import { useUpdates } from '../../../hooks/useUpdates';
import XomakLoader from '../../../ui/XomakLoader';
import { Slider } from '../../components/';
import { TitlesSchedule } from '../../components/';
import { motion } from 'framer-motion';
import { Update, CalendarMonth, Explore, ArrowForward } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

export const Home = () => {
  const { data: updates, isLoading: updatesLoading } = useUpdates({ limit: 10 });
  const { data: schedule, isLoading: scheduleLoading } = useSchedule();

  useEffect(() => {
 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (updatesLoading || scheduleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-dark-900 to-dark-800 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-primary-500/5 blur-[120px]" />
          <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-primary-600/5 blur-[100px]" />
        </div>
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-[50px] animate-pulse"></div>
          <div className="animate-pulse-slow">
            <XomakLoader />
          </div>
        </div>
        <p className="absolute mt-48 text-primary-400 animate-pulse text-lg font-medium">Загрузка данных...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
     
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-[5%] w-[600px] h-[600px] rounded-full bg-primary-500/5 blur-[150px]" />
        <div className="absolute bottom-0 right-[5%] w-[500px] h-[500px] rounded-full bg-primary-600/5 blur-[130px]" />
        <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] rounded-full bg-primary-400/5 blur-[100px]" />
      </div>

      
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-16 mb-16"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 space-y-6"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600">
                  Аниме
                </span> для истинных ценителей
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl">
                Исследуйте огромную коллекцию аниме, следите за новинками и наслаждайтесь просмотром в высоком качестве
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <NavLink to="/anime">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-white font-medium
                             shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40
                             transition-all duration-300 flex items-center gap-2"
                  >
                    <Explore />
                    <span>Смотреть аниме</span>
                  </motion.button>
                </NavLink>
                <motion.a
                  href="https://t.me/FrontendMania"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-dark-800/70 backdrop-blur-md rounded-xl text-white font-medium
                           border border-primary-500/20 hover:bg-dark-700/70 hover:border-primary-500/30
                           transition-all duration-300"
                >
                  Узнать больше
                </motion.a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:w-1/2 relative"
            >   
            </motion.div>
          </div>
        </div>
      </motion.section>

     
      {updates && (
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative py-16"
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Update className="text-primary-500 w-8 h-8" />
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
                  Последние обновления
                </h2>
              </div>
              <NavLink to="/anime" className="hidden sm:flex items-center gap-2 text-primary-400 hover:text-primary-500 transition-colors duration-300">
                <span>Смотреть все</span>
                <ArrowForward className="w-5 h-5" />
              </NavLink>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-dark-800/40 backdrop-blur-md rounded-3xl p-8 border border-dark-700/50 shadow-lg
                       hover:shadow-xl hover:border-primary-500/20 transition-all duration-500"
            >
              <Slider animeList={updates.list} />
            </motion.div>
            
            <div className="flex sm:hidden justify-center mt-6">
              <NavLink to="/anime" className="flex items-center gap-2 text-primary-400 hover:text-primary-500 transition-colors duration-300 px-4 py-2 rounded-lg bg-dark-800/50 border border-dark-700/50">
                <span>Смотреть все</span>
                <ArrowForward className="w-5 h-5" />
              </NavLink>
            </div>
          </div>
        </motion.section>
      )}
      
 
      {schedule && (
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative py-16"
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <CalendarMonth className="text-primary-500 w-8 h-8" />
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600">
                Расписание выхода серий
              </h2>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-dark-800/40 backdrop-blur-md rounded-3xl p-8 border border-dark-700/50 shadow-lg
                       hover:shadow-xl hover:border-primary-500/20 transition-all duration-500"
            >
              <TitlesSchedule schedule={schedule} />
            </motion.div>
          </div>
        </motion.section>
      )}
      
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative py-20"
      >
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary-500/20 to-primary-600/20 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-dark-800/60 backdrop-blur-md" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Готовы начать свое аниме-приключение?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Присоединяйтесь к нашему сообществу и откройте для себя удивительный мир аниме прямо сейчас!
              </p>
              <motion.a
                href="https://t.me/FrontendMania"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-white font-medium
                         shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40
                         transition-all duration-300"
              >
                Начать бесплатно
              </motion.a>
            </div>
          </div>
        </div>
      </motion.section>

      
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-3 rounded-full bg-primary-500 text-white shadow-lg shadow-primary-500/30
                 hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300
                 z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </div>
  );
};
