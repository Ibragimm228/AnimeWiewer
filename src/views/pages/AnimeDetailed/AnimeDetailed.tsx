import { useParams } from 'react-router-dom';
import { useTitle } from '../../../hooks/useTitle';
import { AnimePlayer } from '../../components';
import { useState, useEffect } from 'react';
import XomakLoader from '../../../ui/XomakLoader';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CalendarToday, Category, PlayArrow, Info, Schedule, AccessTime, ArrowUpward } from '@mui/icons-material';

export const AnimeDetailed = () => {
  const { title_code } = useParams();
  const [episode, setEpisode] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('description');
  const { data: title, isLoading } = useTitle({ code: title_code });
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);

  const updateEpisode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEpisode(Number(e.target.value));
  };

  const handleEpisodeClick = (ep: number) => {
    setEpisode(ep);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-primary-500/10 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-primary-600/10 blur-[100px]" />
        <div className="absolute top-[50%] right-[20%] w-[300px] h-[300px] rounded-full bg-indigo-600/10 blur-[100px]" />
      </div>
      <div className="relative z-10">
        <div className="absolute inset-0 rounded-full bg-primary-500/30 blur-[50px] animate-pulse"></div>
        <div className="animate-pulse-slow">
          <XomakLoader />
        </div>
      </div>
      <p className="absolute mt-48 text-primary-400 animate-pulse text-lg font-medium">
        <span className="inline-block mr-2">Загрузка аниме</span>
        <span className="inline-flex">
          <span className="animate-bounce mr-0.5">.</span>
          <span className="animate-bounce animation-delay-100 mr-0.5">.</span>
          <span className="animate-bounce animation-delay-200">.</span>
        </span>
      </p>
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

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
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
    <div className="relative min-h-screen bg-gradient-to-br from-dark-900 via-dark-900 to-dark-800 pb-24">
      {/* Героическая секция с фоновым размытым изображением */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden -mt-28 mb-8">
        <div className="absolute inset-0 bg-dark-900/70 z-10" />
        {title && (
          <div className="absolute inset-0 z-0">
            <img 
              src={`https://static-libria.weekstorm.one${title?.posters.original.url}`}
              className="w-full h-full object-cover blur-sm scale-110" 
              alt="background" 
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent z-10" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[30%] left-[10%] w-[600px] h-[600px] rounded-full bg-primary-500/10 blur-[150px]" />
          <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[150px]" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-20 -mt-48 md:-mt-64">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-8 lg:gap-16">
            {/* Постер и информация */}
            <motion.div 
              variants={fadeInUp}
              className="md:w-1/3 lg:w-1/4 z-10"
            >
              <div className="sticky top-28">
                <div className="relative group rounded-3xl overflow-hidden shadow-2xl shadow-primary-900/30">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-dark-900/10 opacity-60 z-10" />
                  <img
                    className="w-full rounded-3xl relative z-0 transition-transform duration-700 group-hover:scale-110"
                    src={`https://static-libria.weekstorm.one${title?.posters.original.url}`}
                    alt={title?.names.ru}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-600/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-20" />
                  
                  {/* Бейджи с рейтингом */}
                  <div className="absolute top-4 right-4 bg-dark-800/90 backdrop-blur-xl px-3 py-1.5 rounded-full flex items-center gap-1 z-30 shadow-lg shadow-dark-900/50 border border-dark-700/50">
                    <Star className="text-yellow-400 w-4 h-4" />
                    <span className="text-white font-medium text-sm">9.2</span>
                  </div>
                  
                  {/* Кнопка просмотра */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-30">
                    <button className="w-full py-3 px-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary-600/40 transition-all duration-300 font-medium">
                      <PlayArrow />
                      <span>Смотреть</span>
                    </button>
                  </div>
                </div>
                
                {/* Информация о типе и сезоне */}
                <motion.div 
                  variants={fadeInScale}
                  className="mt-6 space-y-4 bg-dark-800/60 backdrop-blur-xl rounded-2xl p-6 border border-dark-700/60 shadow-xl"
                >
                  {title?.type && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary-500/10 text-primary-400">
                        <Category className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Тип</p>
                        <p className="text-white font-medium">{title.type.full_string}</p>
                      </div>
                    </div>
                  )}
                  
                  {title?.season && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary-500/10 text-primary-400">
                        <CalendarToday className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Сезон</p>
                        <p className="text-white font-medium">{title.season.string}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary-500/10 text-primary-400">
                      <Schedule className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Статус</p>
                      <p className="text-white font-medium">Онгоинг</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary-500/10 text-primary-400">
                      <AccessTime className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Длительность</p>
                      <p className="text-white font-medium">24 мин.</p>
                    </div>
                  </div>
                  
                  {/* Жанры */}
                  {title?.genres && title.genres.length > 0 && (
                    <div className="pt-4 border-t border-dark-700/40">
                      <p className="text-gray-400 text-sm mb-3">Жанры</p>
                      <div className="flex flex-wrap gap-2">
                        {title.genres.slice(0, 5).map(genre => (
                          <span
                            key={genre}
                            className="px-3 py-1.5 bg-dark-700/80 rounded-full text-xs font-medium text-primary-300
                                      hover:bg-primary-500 hover:text-white transition-all duration-300 cursor-pointer
                                      border border-primary-500/20"
                          >
                            {genre}
                          </span>
                        ))}
                        {title.genres.length > 5 && (
                          <span className="px-3 py-1.5 bg-dark-700/80 rounded-full text-xs font-medium text-primary-300 border border-primary-500/20">
                            +{title.genres.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
            
            {/* Основное содержимое */}
            <motion.div 
              variants={fadeInUp}
              className="md:w-2/3 lg:w-3/4 space-y-8 z-10"
            >
              {/* Заголовок */}
              <div className="space-y-2">
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-primary-500 to-indigo-500"
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

              {/* Табы */}
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
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-indigo-500"
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
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-indigo-500"
                      />
                    )}
                  </button>
                </div>
              </div>

              {/* Контент табов */}
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
                    {/* Описание */}
                    <div className="bg-dark-800/60 backdrop-blur-xl rounded-3xl p-8 border border-dark-700/60 shadow-xl">
                      <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-500">Описание</h3>
                      <p className="text-gray-300 leading-relaxed">{title?.description}</p>
                    </div>
                    
                    {/* Информация и рейтинг */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-dark-800/60 backdrop-blur-xl rounded-3xl p-6 border border-dark-700/60 shadow-xl">
                        <h3 className="text-lg font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-500">Информация</h3>
                        <ul className="space-y-3">
                          <li className="flex justify-between items-center py-2 border-b border-dark-700/30">
                            <span className="text-gray-400">Статус:</span>
                            <span className="px-3 py-1 bg-primary-500/10 rounded-lg text-white">Онгоинг</span>
                          </li>
                          <li className="flex justify-between items-center py-2 border-b border-dark-700/30">
                            <span className="text-gray-400">Эпизоды:</span>
                            <span className="px-3 py-1 bg-primary-500/10 rounded-lg text-white">12 / 24</span>
                          </li>
                          <li className="flex justify-between items-center py-2">
                            <span className="text-gray-400">Длительность:</span>
                            <span className="px-3 py-1 bg-primary-500/10 rounded-lg text-white">24 мин.</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-dark-800/60 backdrop-blur-xl rounded-3xl p-6 border border-dark-700/60 shadow-xl">
                        <h3 className="text-lg font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-500">Рейтинг</h3>
                        <div className="flex items-center justify-center">
                          <div className="relative">
                            <div className="absolute inset-0 bg-primary-500/20 blur-lg rounded-full"></div>
                            <div className="relative bg-dark-800/80 px-6 py-4 rounded-2xl border border-primary-500/30 flex items-center gap-3">
                              <Star className="text-yellow-400 w-8 h-8" />
                              <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">9.2</span>
                              <span className="text-gray-400 ml-1">/10</span>
                            </div>
                          </div>
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
                    {/* Плеер */}
                    <div className="bg-dark-800/60 backdrop-blur-xl rounded-3xl p-8 border border-dark-700/60 shadow-xl overflow-hidden">
                      <AnimePlayer
                        episode={episode}
                        episodes={title?.player.list}
                        onChangeEpisode={updateEpisode}
                      />
                    </div>
                    
                    {/* Список эпизодов */}
                    <div className="mt-8 bg-dark-800/60 backdrop-blur-xl rounded-3xl p-6 border border-dark-700/60 shadow-xl">
                      <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-500">Список эпизодов</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {title?.player.list.map((ep) => (
                          <button
                            key={ep.episode}
                            onClick={() => handleEpisodeClick(ep.episode)}
                            className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                              episode === ep.episode
                                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                                : 'bg-dark-700/50 hover:bg-dark-700/80 text-gray-300 hover:text-white border border-dark-600/50 hover:border-primary-500/30'
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
      </div>
      
      {/* Кнопка прокрутки вверх с анимацией появления */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 p-4 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white 
                     shadow-lg shadow-primary-500/40 hover:from-primary-600 hover:to-primary-700 hover:shadow-xl 
                     hover:shadow-primary-500/50 transition-all duration-300 z-20"
          >
            <ArrowUpward className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};