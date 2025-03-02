import { NavLink } from 'react-router-dom';
import { Anime } from '../../../interfaces/updates.interface';

interface AnimeCardProps {
  title: Anime;
}

export const AnimeCard = ({ title }: AnimeCardProps) => {
  return (
    <NavLink
      to={`/release/${title.code}`}
      className="group relative block overflow-hidden rounded-2xl bg-dark-800/80 shadow-lg transition-all duration-300
                hover:shadow-2xl hover:shadow-primary-500/20 hover:scale-[1.03] animate-fade-in
                border border-dark-700/30 backdrop-blur-sm"
    >
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={`https://static-libria.weekstorm.one/${title.posters.medium.url}`}
          alt={title.names.ru}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent opacity-40
                      transition-opacity duration-300 group-hover:opacity-90" />
      
      <div className="absolute top-3 right-3 flex gap-2">
        {title.season && (
          <span className="px-3 py-1.5 rounded-lg bg-dark-800/90 backdrop-blur-sm text-xs font-medium text-primary-400
                        border border-primary-500/20 shadow-lg shadow-primary-500/10">
            {title.season.string}
          </span>
        )}
      </div>
      
      <div className="absolute inset-0 p-5 flex flex-col justify-end transform translate-y-[calc(100%-5rem)]
                      transition-transform duration-300 group-hover:translate-y-0">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-white line-clamp-2 drop-shadow-lg">
            {title.names.ru}
          </h2>
          
          <div className="overflow-hidden transition-[height,opacity] duration-300 group-hover:h-auto h-0">
            <p className="text-sm text-dark-100 line-clamp-4 leading-relaxed">
              {title.description}
            </p>
            
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {title.genres && title.genres.map((genre, index) => (
                <span key={index} 
                      className="px-3 py-1.5 rounded-lg bg-dark-800/80 backdrop-blur-sm text-xs
                               text-dark-200 border border-dark-700/30">
                  {genre}
                </span>
              )).slice(0, 3)}
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};
