"use client";
import { useState } from 'react';
import { AnimeCard } from '..';
import { Anime } from '../../../interfaces/updates.interface';
import { ScheduleType } from '../../../types/schedule.type';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarToday, AccessTime } from '@mui/icons-material';

interface ScheduleProps {
  schedule: ScheduleType;
}

const DAYS = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье'
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const TitlesSchedule = ({ schedule }: ScheduleProps) => {
  const [activeDay, setActiveDay] = useState(new Date().getDay() || 7);
  const currentDayIndex = activeDay === 7 ? 0 : activeDay;

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-dark-800 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-dark-800 to-transparent pointer-events-none z-10" />
        
        <div className="overflow-x-auto pb-4 -mx-2 px-2 scrollbar-none">
          <div className="flex gap-3">
            {DAYS.map((day, index) => (
              <motion.button
                key={day}
                onClick={() => setActiveDay(index + 1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-3 rounded-xl font-medium whitespace-nowrap transition-all duration-300
                  ${
                    index + 1 === activeDay
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                      : 'glass-effect hover:bg-dark-700/70 text-gray-300 hover:text-white'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  {index + 1 === activeDay ? (
                    <CalendarToday className="w-4 h-4" />
                  ) : (
                    <AccessTime className="w-4 h-4" />
                  )}
                  <span>{day}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeDay}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {schedule[currentDayIndex].list.length > 0 ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            >
              {schedule[currentDayIndex].list.map((title: Anime) => (
                <motion.div key={title.id} variants={item}>
                  <AnimeCard title={title} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 animate-pulse-soft" />
              <div className="relative glass-card p-12 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-20 h-20 mx-auto mb-6 text-primary-500/50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
                <h3 className="text-2xl font-bold mb-2 heading-gradient">Нет запланированных релизов</h3>
                <p className="text-lg text-gray-400">На этот день пока нет запланированных релизов аниме</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
