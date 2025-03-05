"use client";
import { Pagination } from '@mui/material';
import { useUpdates } from '../../../hooks/useUpdates';
import { Anime } from '../../../interfaces/updates.interface';
import { AnimeCard } from '../../components';
import { useState, useEffect } from 'react';
import XomakLoader from '../../../ui/XomakLoader';
import { Search, FilterList, Refresh, TrendingUp, Favorite, Star, NewReleases, LocalFireDepartment } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

export const AnimePage = () => {
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredAnime, setFilteredAnime] = useState<Anime[]>([]);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const {
    data: animeList,
    refetch,
    isLoading,
    isFetching,
  } = useUpdates({
    items_per_page: 30,
    page: page,
  });

  useEffect(() => {
    if (animeList) {
      const filtered = animeList.list.filter(anime => 
        anime.names.ru.toLowerCase().includes(searchQuery.toLowerCase()) ||
        anime.names.en.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAnime(filtered);
      setIsFiltering(searchQuery.length > 0);
    }
  }, [searchQuery, animeList]);

  const handlePagination = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };


  if (isLoading || isFetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary-500/30 blur-[60px] animate-pulse"></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <XomakLoader />
          </motion.div>
        </div>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-primary-400 animate-pulse text-xl font-medium"
        >
          {isLoading ? "Загружаем аниме вселенную..." : "Обновляем данные..."}
        </motion.p>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-32 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mt-6 rounded-full overflow-hidden"
        >
          <motion.div 
            className="h-full bg-white"
            animate={{ 
              x: ["0%", "100%", "0%"],
              width: ["20%", "20%", "20%"]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    );
  }


  const categories = [
    { id: 'all', label: 'Все аниме', icon: <FilterList className="h-5 w-5" /> },
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 min-h-screen relative v">
  
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-primary-600/10 blur-[120px]" />
        <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] rounded-full bg-primary-400/10 blur-[150px]" />
        <div className="absolute bottom-[10%] left-[20%] w-[350px] h-[350px] rounded-full bg-indigo-500/10 blur-[100px]" />
      </div>

      {/* Hero section with stylized text */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-14 text-center relative z-10"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-purple-400 to-primary-600 tracking-tight">
          Аниме Каталог
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300/80 max-w-2xl mx-auto font-light"
        >
          Погрузитесь в мир аниме — находите, изучайте и наслаждайтесь любимыми историями
        </motion.p>
        
        {/* Animated accent line */}
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "80px", opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="h-1 bg-gradient-to-r from-primary-500 to-purple-500 mx-auto mt-6 rounded-full"
        />
      </motion.div>

      {/* Redesigned search section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mb-12"
      >
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Glowing effect behind search */}
          <div className="absolute inset-0 bg-primary-500/5 blur-[40px] rounded-3xl"></div>
          
          {/* Search input with enhanced styling */}
          <div className="relative w-full group z-10">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-primary-400 transition-all duration-300 group-focus-within:text-primary-500 group-hover:text-primary-500" />
            </div>
            <input
              type="text"
              placeholder="Поиск аниме..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-16 pr-16 py-6 rounded-2xl
                       bg-dark-800/40 text-white 
                       border-2 border-primary-500/20
                       focus:border-primary-500/50 focus:outline-none
                       transition-all duration-500
                       placeholder:text-gray-400/70 text-lg
                       backdrop-blur-xl
                       shadow-[0_0_30px_rgba(108,93,211,0.1)]
                       hover:shadow-[0_0_40px_rgba(108,93,211,0.2)]
                       focus:shadow-[0_0_50px_rgba(108,93,211,0.3)]"
            />
            {/* Clear search button */}
            {searchQuery && (
              <motion.button 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-0 pr-6 flex items-center text-gray-400 hover:text-primary-400 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            )}
          </div>
        </div>

        {/* Actions row */}
        <div className="flex flex-wrap justify-center mt-6 gap-4">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(108,93,211,0.25)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => refetch()}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-dark-800/40 hover:bg-primary-500/20 
                     text-primary-300 transition-all duration-300 border border-primary-500/20
                     shadow-sm hover:shadow-lg hover:shadow-primary-500/10 backdrop-blur-md"
          >
            <Refresh className="h-5 w-5" />
            <span className="font-medium">Обновить</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Category filters with enhanced visual style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mb-10"
      >
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryChange(category.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300
                        ${activeCategory === category.id 
                          ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 border-transparent' 
                          : 'bg-dark-800/40 text-gray-300 hover:bg-dark-700/60 border border-dark-700/50 backdrop-blur-md'
                        }`}
            >
              {category.icon}
              <span className="font-medium">{category.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Results stats indicator with glassmorphism style */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mb-8 text-center"
      >
        {isFiltering ? (
          <div className="bg-dark-800/30 backdrop-blur-xl py-3 px-7 rounded-2xl inline-block border border-primary-500/10 shadow-lg shadow-primary-500/5">
            <p className="text-gray-200">
              Найдено <span className="text-primary-400 font-semibold">{filteredAnime.length}</span> результатов для "{searchQuery}"
            </p>
          </div>
        ) : (
          <div className="bg-dark-800/30 backdrop-blur-xl py-3 px-7 rounded-2xl inline-block border border-primary-500/10 shadow-lg shadow-primary-500/5">
            <p className="text-gray-200">
              Показано <span className="text-primary-400 font-semibold">{filteredAnime.length}</span> аниме • 
              Страница <span className="text-primary-400 font-semibold">{page}</span> из <span className="text-primary-400 font-semibold">{animeList?.pagination.pages}</span>
            </p>
          </div>
        )}
      </motion.div>

      {/* Anime Grid or No Results */}
      <AnimatePresence mode="wait">
        {filteredAnime.length > 0 ? (
          <motion.div 
            key="anime-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-6"
          >
            {filteredAnime.map((title: Anime, index) => (
              <motion.div 
                key={title.id} 
                variants={itemVariants}
                transition={{ delay: index * 0.03 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <div className="relative">
                  {/* Glow effect on hover */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="relative">
                    <AnimeCard title={title} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-[50px]"></div>
              <div className="relative">
                <motion.div 
                  animate={{ 
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.1, 1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                  className="text-8xl select-none"
                >
                  😕
                </motion.div>
              </div>
            </div>
            <h3 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600 mb-3">Ничего не найдено</h3>
            <p className="text-gray-300 mb-8 text-center max-w-md">
              Попробуйте изменить параметры поиска или проверьте правильность написания
            </p>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(108,93,211,0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearSearch}
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl
                       transition-all duration-300 shadow-lg shadow-primary-500/30
                       hover:shadow-xl hover:shadow-primary-500/40 font-medium"
            >
              Сбросить поиск
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Pagination with enhanced styling */}
      {!isFiltering && filteredAnime.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex justify-center py-10"
        >
          <div className="bg-dark-800/40 backdrop-blur-xl p-5 rounded-2xl border border-primary-500/15 
                        shadow-lg shadow-primary-500/10 hover:shadow-xl hover:shadow-primary-500/15
                        transition-all duration-500">
            <Pagination
              count={animeList?.pagination.pages}
              page={page}
              onChange={handlePagination}
              size="large"
              showFirstButton
              showLastButton
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#fff',
                  fontSize: '1rem',
                  margin: '0 4px',
                  borderColor: 'rgba(108,93,211,0.3)',
                  '&:hover': {
                    backgroundColor: 'rgba(108,93,211,0.2)',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#6C5DD3',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#5C4DC3',
                    },
                  },
                },
                '& .MuiPaginationItem-ellipsis': {
                  color: 'rgba(255,255,255,0.7)',
                },
                '& .MuiPaginationItem-firstLast': {
                  color: '#6C5DD3',
                },
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Scroll to top button with enhanced animation and style */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 10px 25px rgba(108,93,211,0.5)"
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-4 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white 
                 shadow-lg shadow-primary-500/30 transition-all duration-300 z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </div>
  );
};