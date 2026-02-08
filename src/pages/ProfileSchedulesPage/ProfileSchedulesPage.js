import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { HeaderComponent } from '../../components/HeaderComponent/HeaderComponent';
import { fetchProfileSchedules } from '../../redux/profile/operations';
import '../../components/ShedulesComponent/SheduleComponent.css';
import './ProfileSchedulesPage.css';

const dayNames = {
  Monday: 'Понеділок',
  Tuesday: 'Вівторок',
  Wednesday: 'Середа',
  Thursday: 'Четвер',
  Friday: "П'ятниця",
  Saturday: 'Субота',
  Sunday: 'Неділя',
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00',
];

function matchTime(scheduleStart, slot) {
  const t = String(scheduleStart).substring(0, 5);
  return t === slot || scheduleStart === slot;
}

export const ProfileSchedulesPage = () => {
  const dispatch = useDispatch();
  const { schedules, isLoadingSchedules, errorSchedules } = useSelector((state) => state.profile);
  const [activeDay, setActiveDay] = useState('Monday');
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProfileSchedules());
  }, [dispatch]);

  useEffect(() => {
    const dayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = dayOrder[new Date().getDay()];
    setActiveDay(today);
  }, []);

  useEffect(() => {
    if (openMenuId === null) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openMenuId]);

  const handleReschedule = (s) => {
    setOpenMenuId(null);
    console.log('Перенести заняття', s);
  };

  return (
    <div className="profile-schedules-page">
      <HeaderComponent />
      <div className="profile-schedules-container">
        <NavLink to="/profile" className="profile-schedules-back">
          ← Назад до профілю
        </NavLink>
        <h1 className="profile-schedules-title">Мій розклад</h1>
        {isLoadingSchedules && <p className="profile-schedules-loading">Завантаження...</p>}
        {errorSchedules && <p className="profile-schedules-error">Помилка: {errorSchedules}</p>}
        {!isLoadingSchedules && !errorSchedules && (
          <div className="schedule-dashboard profile-schedules-dashboard">
            <div className="days-nav">
              {days.map((day) => {
                const hasBookings = schedules.some((s) => s.dayOfWeek === day);
                return (
                  <button
                    key={day}
                    type="button"
                    className={`day-tab ${activeDay === day ? 'active' : ''} ${hasBookings ? 'has-bookings' : ''}`}
                    onClick={() => setActiveDay(day)}
                  >
                    <span className="day-tab__short">{dayNames[day].substring(0, 3)}</span>
                    <span className="day-tab__full">{dayNames[day]}</span>
                    {hasBookings && <span className="day-tab__indicator" aria-hidden />}
                  </button>
                );
              })}
            </div>
            <div className="blocks-grid">
              {timeSlots.map((time) => {
                const session = schedules.find(
                  (s) => s.dayOfWeek === activeDay && matchTime(s.startTime, time)
                );
                const isBooked = !!session;
                return (
                  <div
                    key={time}
                    className={`time-block ${isBooked ? 'booked' : 'empty'}`}
                  >
                    <span className="time-label">{time}</span>
                    {session && (
                      <>
                        <span className="room-label">{session.room}</span>
                        <span className="profile-schedule-dance">{session.danceTypeName}</span>
                        <div
                          className="profile-schedule-menu"
                          ref={openMenuId === session.sheduleId ? menuRef : null}
                        >
                          <button
                            type="button"
                            className="profile-schedule-menu__btn"
                            aria-label="Меню"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId((id) => (id === session.sheduleId ? null : session.sheduleId));
                            }}
                          >
                            <span className="profile-schedule-menu__dot" />
                            <span className="profile-schedule-menu__dot" />
                            <span className="profile-schedule-menu__dot" />
                          </button>
                          <div
                            className={`profile-schedule-menu__dropdown ${openMenuId === session.sheduleId ? 'is-open' : ''}`}
                          >
                            <button
                              type="button"
                              className="profile-schedule-menu__item"
                              onClick={() => handleReschedule(session)}
                            >
                              Перенести заняття
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
