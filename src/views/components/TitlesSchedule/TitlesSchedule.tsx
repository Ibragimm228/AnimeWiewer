"use client";
import { useState } from 'react';
import { AnimeCard } from '..';
import { Anime } from '../../../interfaces/updates.interface';
import { ScheduleType } from '../../../types/schedule.type';

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

export const TitlesSchedule = ({ schedule }: ScheduleProps) => {
  const [activeDay, setActiveDay] = useState(new Date().getDay() || 7);
  const currentDayIndex = activeDay === 7 ? 0 : activeDay;

  return (
    <div className="space-y-6">
      <div className="flex overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
        <div className="flex gap-2">
          {DAYS.map((day, index) => (
            <button
              key={day}
              onClick={() => setActiveDay(index + 1)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all
                ${
                  index + 1 === activeDay
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-700/50 text-dark-200 hover:bg-dark-600/50'
                }
              `}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        {schedule[currentDayIndex].list.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 animate-fade-in">
            {schedule[currentDayIndex].list.map((title: Anime) => (
              <AnimeCard key={title.id} title={title} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-dark-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 mx-auto mb-4 opacity-50"
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
            <p className="text-lg">Нет запланированных релизов на этот день</p>
          </div>
        )}
      </div>
    </div>
  );
};
