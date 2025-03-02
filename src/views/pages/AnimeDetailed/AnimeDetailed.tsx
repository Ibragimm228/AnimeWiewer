import { useParams } from 'react-router-dom';
import { useTitle } from '../../../hooks/useTitle';
import { AnimePlayer } from '../../components';
import { useState, useEffect } from 'react';
import XomakLoader from '../../../ui/XomakLoader';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CalendarToday, Category, PlayArrow, Info } from '@mui/icons-material';

export const AnimeDetailed = () => {
  const { title_code } = useParams();
  const [episode, setEpisode] = useState<string>('1');
  const [activeTab, setActiveTab] = useState<string>('description');
  const { data: title, isLoading } = useTitle({ code: title_code });

  const updateEpisode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEpisode(e.target.value);
  };

  useEffect(() => {
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (isLoading) return (
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
      <p className="absolute mt-48 text-primary-400 animate-pulse text-lg font-medium">Загрузка аниме...</p>
    </div>
  );

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 relative">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-[5%] w-[500px] h-[500px] rounded-full bg-primary-500/5 blur-[120px]" />
        <div className="absolute bottom-0 right-[5%] w-[400px] h-[400px] rounded-full bg-primary-600/5 blur-[100px]" />
      </div>

      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-900/80 to-transparent h-[50vh] pointer-events-none -mt-28" />
        
        <div className="flex flex-col md:flex-row md:items-start gap-8 lg:gap-16">
          
          <motion.div 
            variants={fadeInUp}
            className="md:w-1/3 lg:w-1/4 z-10"
          >
            <div className="sticky top-28">
              <div className="relative group rounded-3xl overflow-hidden shadow-2xl shadow-dark-900/80">
                <div className="absolute inset-0 bg-gradient-to-t from-primary-500/10 to-dark-900/10 opacity-60 z-10" />
                <img
                  className="w-full rounded-3xl relative z-0 transition-transform duration-700 group-hover:scale-110"
                  src={`https://static-libria.weekstorm.one${title?.posters.original.url}`}
                  alt={title?.names.ru}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-20" />
                
                
                <div className="absolute top-4 right-4 bg-dark-800/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 z-30">
                  <Star className="text-yellow-400 w-4 h-4" />
                  <span className="text-white font-medium text-sm">9.2</span>
                </div>
                
              
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-30">
                  <button className="w-full py-3 px-6 bg-primary-500 hover:bg-primary-600 text-white rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary-500/30 transition-all duration-300">
                    <PlayArrow />
                    <span className="font-medium">Смотреть</span>
                  </button>
                </div>
              </div>
              
              
              <motion.div 
                variants={fadeInUp}
                className="mt-6 space-y-4 bg-dark-800/40 backdrop-blur-md rounded-2xl p-5 border border-dark-700/50"
              >
                {title?.type && (
                  <div className="flex items-center gap-3">
                    <Category className="text-primary-400 w-5 h-5" />
                    <div>
                      <p className="text-gray-400 text-sm">Тип</p>
                      <p className="text-white">{title.type.full_string}</p>
                    </div>
                  </div>
                )}
                
                {title?.season && (
                  <div className="flex items-center gap-3">
                    <CalendarToday className="text-primary-400 w-5 h-5" />
                    <div>
                      <p className="text-gray-400 text-sm">Сезон</p>
                      <p className="text-white">{title.season.string}</p>
                    </div>
                  </div>
                )}
                
                {title?.genres && title.genres.length > 0 && (
                  <div className="pt-3 border-t border-dark-700/30">
                    <p className="text-gray-400 text-sm mb-3">Жанры</p>
                    <div className="flex flex-wrap gap-2">
                      {title.genres.slice(0, 5).map(genre => (
                        <span
                          key={genre}
                          className="px-3 py-1.5 bg-dark-800/80 rounded-full text-xs font-medium text-primary-300
                                  hover:bg-primary-500/20 hover:text-white transition-all duration-300 cursor-pointer"
                        >
                          {genre}
                        </span>
                      ))}
                      {title.genres.length > 5 && (
                        <span className="px-3 py-1.5 bg-dark-800/80 rounded-full text-xs font-medium text-primary-300">
                          +{title.genres.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
          
         
          <motion.div 
            variants={fadeInUp}
            className="md:w-2/3 lg:w-3/4 space-y-8 z-10"
          >
           
            <div className="space-y-2">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600"
              >
                {title?.names.ru}
              </motion.h1>
              {title?.names.en && (
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-2xl md:text-3xl text-primary-300/80"
                >
                  {title.names.en}
                </motion.h2>
              )}
            </div>

         
            <div className="border-b border-dark-700/50">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`pb-4 px-1 relative ${
                    activeTab === 'description'
                      ? 'text-primary-400 font-medium'
                      : 'text-gray-400 hover:text-gray-300'
                  } transition-colors duration-300 flex items-center gap-2`}
                >
                  <Info className="w-5 h-5" />
                  <span>Описание</span>
                  {activeTab === 'description' && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600"
                    />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('episodes')}
                  className={`pb-4 px-1 relative ${
                    activeTab === 'episodes'
                      ? 'text-primary-400 font-medium'
                      : 'text-gray-400 hover:text-gray-300'
                  } transition-colors duration-300 flex items-center gap-2`}
                >
                  <PlayArrow className="w-5 h-5" />
                  <span>Эпизоды</span>
                  {activeTab === 'episodes' && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600"
                    />
                  )}
                </button>
              </div>
            </div>

           
            <AnimatePresence mode="wait">
              {activeTab === 'description' && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
               
                  <div className="bg-dark-800/40 backdrop-blur-md rounded-3xl p-8 border border-dark-700/50 shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 text-primary-400">Описание</h3>
                    <p className="text-gray-300 leading-relaxed">{title?.description}</p>
                  </div>
                  
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-dark-800/40 backdrop-blur-md rounded-3xl p-6 border border-dark-700/50 shadow-lg">
                      <h3 className="text-lg font-semibold mb-4 text-primary-400">Информация</h3>
                      <ul className="space-y-3">
                        <li className="flex justify-between">
                          <span className="text-gray-400">Статус:</span>
                          <span className="text-white">Онгоинг</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-400">Эпизоды:</span>
                          <span className="text-white">12 / 24</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-400">Длительность:</span>
                          <span className="text-white">24 мин.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-dark-800/40 backdrop-blur-md rounded-3xl p-6 border border-dark-700/50 shadow-lg">
                      <h3 className="text-lg font-semibold mb-4 text-primary-400">Рейтинг</h3>
                      <div className="flex items-center justify-center">
                        <div className="flex items-center gap-2">
                          <Star className="text-yellow-400 w-8 h-8" />
                          <span className="text-4xl font-bold text-white">9.2</span>
                        </div>
                        <span className="text-gray-400 ml-2">/10</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'episodes' && (
                <motion.div
                  key="episodes"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  
                  <div className="bg-dark-800/40 backdrop-blur-md rounded-3xl p-8 border border-dark-700/50 shadow-lg">
                    <AnimePlayer
                      episode={episode}
                      episodes={title?.player.list}
                      onChangeEpisode={updateEpisode}
                    />
                  </div>
                  
                 
                  <div className="mt-8 bg-dark-800/40 backdrop-blur-md rounded-3xl p-6 border border-dark-700/50 shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 text-primary-400">Список эпизодов</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {title?.player.list.map((ep) => (
                        <button
                          key={ep.episode}
                          onClick={() => setEpisode(ep.episode)}
                          className={`px-4 py-3 rounded-xl text-center transition-all duration-300 ${
                            episode === ep.episode
                              ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                              : 'bg-dark-800/80 text-gray-300 hover:bg-dark-700 hover:text-white'
                          }`}
                        >
                          Эпизод {ep.episode}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
      
     
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
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
