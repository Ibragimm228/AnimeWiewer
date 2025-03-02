import { NavLink } from 'react-router-dom';
import Telegramm from '../../../ui/TelegrammButton';
import GitHub from '../../../ui/GitHub';
import Navigation from '../../../ui/Navigation';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-dark-800/50 to-dark-900/80 backdrop-blur-sm mt-auto border-t border-dark-700/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <NavLink 
              to="/" 
              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600"
            >
              FrontendMania
            </NavLink>
            <p className="text-dark-200 leading-relaxed">
              Удобный способ смотреть аниме онлайн бесплатно. Большая коллекция аниме с русской озвучкой и субтитрами.
            </p>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">
              Навигация
            </h3>
            <ul className="space-y-3">
              <Navigation />
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">
              Социальные сети
            </h3>
            <div className="flex gap-6">
              <Telegramm />
              <GitHub />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-700/20 text-center">
          <p className="text-dark-300 text-sm">
            © {new Date().getFullYear()} AniQuick. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};
