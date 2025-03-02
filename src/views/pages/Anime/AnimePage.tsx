"use client";
import { Pagination } from '@mui/material';
import { useUpdates } from '../../../hooks/useUpdates';
import { Anime } from '../../../interfaces/updates.interface';
import { AnimeCard } from '../../components';
import { useState, useEffect } from 'react';
import XomakLoader from '../../../ui/XomakLoader';
import { Search, FilterList, Refresh, TrendingUp, Favorite, Star, NewReleases } from '@mui/icons-material';
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

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-[50px] animate-pulse"></div>
        <XomakLoader />
      </div>
      <p className="mt-8 text-primary-400 animate-pulse text-lg font-medium">Загрузка аниме...</p>
    </div>
  );

  const handlePagination = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    // Scroll to top when changing page
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

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-[50px] animate-pulse"></div>
          <XomakLoader />
        </div>
        <p className="mt-8 text-primary-400 animate-pulse text-lg font-medium">Обновление данных...</p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const categories = [
    
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 min-h-screen relative">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[5%] left-[5%] w-[300px] h-[300px] rounded-full bg-primary-500/5 blur-[80px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-primary-600/5 blur-[100px]" />
      </div>

     
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center relative"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600">
          Аниме Каталог
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Исследуйте нашу обширную коллекцию аниме и найдите свои любимые тайтлы
        </p>
      </motion.div>

 
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-12"
      >
        <div className="relative w-full max-w-3xl mx-auto group">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-primary-400 transition-colors duration-300 group-hover:text-primary-500" />
          </div>
          <input
            type="text"
            placeholder="Поиск аниме..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-16 pr-16 py-5 rounded-2xl
                     bg-dark-800/50 text-white 
                     border-2 border-primary-500/20
                     focus:border-primary-500 focus:outline-none
                     transition-all duration-500
                     placeholder:text-gray-400 text-lg
                     backdrop-blur-xl
                     shadow-[0_0_30px_rgba(108,93,211,0.1)]
                     hover:shadow-[0_0_40px_rgba(108,93,211,0.2)]
                     focus:shadow-[0_0_50px_rgba(108,93,211,0.3)]
                     hover:bg-dark-800/60 focus:bg-dark-800/70"
          />
          {searchQuery && (
            <button 
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 pr-6 flex items-center text-gray-400 hover:text-primary-400 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex flex-wrap justify-center mt-6 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => refetch()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-800/70 hover:bg-primary-500/20 
                     text-primary-400 transition-all duration-300 border border-primary-500/20
                     shadow-sm hover:shadow-lg hover:shadow-primary-500/10"
          >
            <Refresh className="h-5 w-5" />
            <span>Обновить</span>
          </motion.button>
          
        
        </div>
      </motion.div>

   
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-8"
      >
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryChange(category.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300
                        ${activeCategory === category.id 
                          ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' 
                          : 'bg-dark-800/70 text-gray-300 hover:bg-dark-700/70 border border-dark-700/50'
                        }`}
            >
              {category.icon}
              <span>{category.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

     
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-6 text-center"
      >
        {isFiltering ? (
          <div className="bg-dark-800/40 backdrop-blur-sm py-3 px-6 rounded-xl inline-block">
            <p className="text-gray-300">
              Найдено <span className="text-primary-400 font-semibold">{filteredAnime.length}</span> результатов для "{searchQuery}"
            </p>
          </div>
        ) : (
          <div className="bg-dark-800/40 backdrop-blur-sm py-3 px-6 rounded-xl inline-block">
            <p className="text-gray-300">
              Показано <span className="text-primary-400 font-semibold">{filteredAnime.length}</span> аниме • 
              Страница <span className="text-primary-400 font-semibold">{page}</span> из <span className="text-primary-400 font-semibold">{animeList?.pagination.pages}</span>
            </p>
          </div>
        )}
      </motion.div>

   
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
                transition={{ delay: index * 0.05 }}
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <AnimeCard title={title} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary-500/10 blur-[30px]"></div>
              <div className="text-8xl mb-4 relative">😕</div>
            </div>
            <h3 className="text-2xl font-semibold text-primary-400 mb-2">Ничего не найдено</h3>
            <p className="text-gray-400 mb-6 text-center max-w-md">
              Попробуйте изменить параметры поиска или проверьте правильность написания
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearSearch}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl
                       transition-all duration-300 shadow-lg shadow-primary-500/20
                       hover:shadow-xl hover:shadow-primary-500/30"
            >
              Сбросить поиск
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      
  
      {!isFiltering && filteredAnime.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center py-8"
        >
          <div className="bg-dark-800/70 backdrop-blur-md p-4 rounded-xl border border-primary-500/10 
                        shadow-lg shadow-primary-500/5 hover:shadow-xl hover:shadow-primary-500/10
                        transition-all duration-300">
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
