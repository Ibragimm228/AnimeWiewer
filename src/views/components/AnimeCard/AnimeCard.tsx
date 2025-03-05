import { NavLink } from 'react-router-dom';
import { Anime } from '../../../interfaces/updates.interface';
import { motion } from 'framer-motion';
import { PlayCircle, Star } from '@mui/icons-material';

interface AnimeCardProps {
  title: Anime;
}

export const AnimeCard = ({ title }: AnimeCardProps) => {
  return (
    <NavLink
      to={`/release/${title.code}`}
      className="group relative block overflow-hidden rounded-2xl bg-dark-800/80 shadow-lg transition-all duration-500
                hover:shadow-xl hover:shadow-primary-500/20 hover:scale-[1.02] animate-fade-in
                border border-dark-700/30 backdrop-blur-sm"
    >
      <div className="aspect-[2/3] overflow-hidden">
        <motion.img
          src={`https://static-libria.weekstorm.one/${title.posters.medium.url}`}
          alt={title.names.ru}
          className="h-full w-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent opacity-0
                      transition-opacity duration-500 group-hover:opacity-90" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="p-3 rounded-full bg-primary-500/20 backdrop-blur-sm border border-primary-500/30
                        transform transition-transform duration-300 group-hover:scale-110">
            <PlayCircle className="w-12 h-12 text-white" />
          </div>
        </motion.div>
      </div>
      
      <div className="absolute top-3 right-3 flex gap-2">
        {title.season && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="px-3 py-1.5 rounded-lg glass-effect text-xs font-medium text-primary-400
                      border-primary-500/20 shadow-lg shadow-primary-500/10"
          >
            {title.season.string}
          </motion.span>
        )}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg glass-effect text-xs font-medium text-accent-400
                    border-accent-500/20 shadow-lg shadow-accent-500/10"
        >
          <Star className="w-4 h-4" />
          <span>4.8</span>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ y: 100 }}
        whileHover={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-dark-900 via-dark-900/95 to-transparent"
      >
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-white line-clamp-2 drop-shadow-lg">
            {title.names.ru}
          </h2>
          
          <div className="overflow-hidden">
            <p className="text-sm text-gray-300 line-clamp-3 leading-relaxed">
              {title.description}
            </p>
            
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {title.genres && title.genres.map((genre, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="px-3 py-1.5 rounded-lg glass-effect text-xs text-gray-300
                           hover:text-primary-400 hover:border-primary-500/30 transition-colors duration-300"
                >
                  {genre}
                </motion.span>
              )).slice(0, 3)}
            </div>
          </div>
        </div>
      </motion.div>
    </NavLink>
  );
};
