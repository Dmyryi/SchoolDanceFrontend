import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { HeaderComponent } from '../../components/HeaderComponent/HeaderComponent';
import { fetchProfileSchedules, rescheduleVisit } from '../../redux/profile/operations';
import { fetchShedulesByTrainer } from '../../redux/schoolShelf/schoolOperation';
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

function matchTime(scheduleStart, timeSlot) {
  const t = String(scheduleStart).substring(0, 5);
  return t === timeSlot || scheduleStart === timeSlot;
}

/** Порівняння дня тижня: бекенд може повертати "Friday" або "friday" */
function sameDay(dayA, dayB) {
  if (!dayA || !dayB) return false;
  return String(dayA).trim().toLowerCase() === String(dayB).trim().toLowerCase();
}

/** Наступна дата для dayOfWeek + startTime у форматі ISO (як у записі на заняття) */
function getNextActualDate(dayOfWeek, startTime) {
  const dayIndex = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 };
  const targetDay = dayIndex[dayOfWeek] ?? 1;
  const startStr = String(startTime);
  const [h, m, s = 0] = startStr.split(':').map(Number);
  const d = new Date();
  const currentDay = d.getDay();
  let daysToAdd = (targetDay - currentDay + 7) % 7;
  if (daysToAdd === 0 && (d.getHours() > h || (d.getHours() === h && d.getMinutes() >= m))) daysToAdd = 7;
  d.setDate(d.getDate() + daysToAdd);
  d.setHours(h, m, s || 0, 0);
  return d.toISOString();
}

export const ProfileSchedulesPage = () => {
  const dispatch = useDispatch();
  const { schedules, isLoadingSchedules, errorSchedules, isRescheduling, errorReschedule } = useSelector((state) => state.profile);
  const [activeDay, setActiveDay] = useState('Monday');
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  // Модалка "Перенести заняття": який візит переносимо + слоти тренера (завантажуються окремо)
  const [rescheduleSession, setRescheduleSession] = useState(null);
  const [rescheduleTrainerSlots, setRescheduleTrainerSlots] = useState(null);
  const [rescheduleSelectedDay, setRescheduleSelectedDay] = useState('Monday');
  const [rescheduleSelectedSlot, setRescheduleSelectedSlot] = useState(null);

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

  // Відкрили модалку → завантажуємо розклад саме цього тренера; зберігаємо в стейт, щоб не плутати з іншим тренером
  useEffect(() => {
    if (!rescheduleSession?.trainerId) {
      setRescheduleTrainerSlots(null);
      return;
    }
    setRescheduleTrainerSlots(null);
    dispatch(fetchShedulesByTrainer(rescheduleSession.trainerId))
      .unwrap()
      .then((payload) => setRescheduleTrainerSlots(Array.isArray(payload) ? payload : []))
      .catch(() => setRescheduleTrainerSlots([]));
  }, [dispatch, rescheduleSession?.trainerId]);

  const handleRescheduleClick = (session) => {
    setOpenMenuId(null);
    if (!session.visitId) return;
    setRescheduleSession(session);
    const dayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    setRescheduleSelectedDay(dayOrder[new Date().getDay()]);
    setRescheduleSelectedSlot(null);
  };

  const closeRescheduleModal = () => {
    setRescheduleSession(null);
    setRescheduleTrainerSlots(null);
    setRescheduleSelectedDay('Monday');
    setRescheduleSelectedSlot(null);
  };

  // Слоти для перенесення: той самий тренер (вже по trainerId) + обраний день; по виду танцю — якщо API віддає danceId, фільтруємо по ньому
  const slotsForRescheduleDay = (rescheduleTrainerSlots || []).filter((s) => {
    if (!sameDay(s.dayOfWeek, rescheduleSelectedDay)) return false;
    const slotDanceId = s.danceId ?? s.danceTypeId;
    const sessionDanceId = rescheduleSession?.danceTypeId;
    if (!slotDanceId) return true; // API не повернув danceId — показуємо слот (фільтр тільки по тренеру + день)
    if (!sessionDanceId) return true;
    return slotDanceId === sessionDanceId;
  });

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    if (!rescheduleSession?.visitId || !rescheduleSelectedSlot) return;
    const newDate = getNextActualDate(rescheduleSelectedDay, rescheduleSelectedSlot.startTime);
    const newSheduleId = rescheduleSelectedSlot.sheduleId ?? rescheduleSelectedSlot.scheduleId ?? rescheduleSelectedSlot.id;
    if (!newSheduleId) return;
    dispatch(rescheduleVisit({
      visitId: rescheduleSession.visitId,
      newSheduleId,
      newDate,
    }))
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          closeRescheduleModal();
          dispatch(fetchProfileSchedules());
        }
      });
  };

  return (
    <div className="profile-schedules-page">
      <HeaderComponent />
      {rescheduleSession && (
        <div
          className="reschedule-overlay"
          onClick={closeRescheduleModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="reschedule-title"
        >
          <div className="reschedule-modal reschedule-modal--with-grid" onClick={(e) => e.stopPropagation()}>
            <h2 id="reschedule-title" className="reschedule-modal__title">Перенести заняття</h2>
            <p className="reschedule-modal__subtitle">
              {rescheduleSession.danceTypeName} · оберіть день і час
            </p>
            <form onSubmit={handleRescheduleSubmit} className="reschedule-form">
              <div className="reschedule-form__group">
                <span className="reschedule-form__label">День</span>
                <div className="reschedule-days">
                  {days.map((day) => (
                    <button
                      key={day}
                      type="button"
                      className={`day-tab ${rescheduleSelectedDay === day ? 'active' : ''}`}
                      onClick={() => { setRescheduleSelectedDay(day); setRescheduleSelectedSlot(null); }}
                    >
                      <span className="day-tab__short">{dayNames[day].substring(0, 3)}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="reschedule-form__group">
                <span className="reschedule-form__label">Час (слот)</span>
                {rescheduleTrainerSlots === null ? (
                  <p className="reschedule-form__muted">Завантаження слотів тренера…</p>
                ) : (
                  <div className="reschedule-slots-grid">
                    {timeSlots.map((time) => {
                      const slot = slotsForRescheduleDay.find((s) => matchTime(s.startTime, time));
                      const isSelected = rescheduleSelectedSlot && (rescheduleSelectedSlot.sheduleId ?? rescheduleSelectedSlot.scheduleId) === (slot?.sheduleId ?? slot?.scheduleId) && matchTime(rescheduleSelectedSlot?.startTime, time);
                      return (
                        <button
                          key={time}
                          type="button"
                          className={`reschedule-slot-btn ${slot ? 'available' : 'empty'} ${isSelected ? 'selected' : ''}`}
                          disabled={!slot}
                          onClick={() => slot && setRescheduleSelectedSlot(slot)}
                        >
                          {time}
                          {slot && <span className="reschedule-slot-room">{slot.room}</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              {errorReschedule && (
                <p className="reschedule-form__error">{errorReschedule}</p>
              )}
              <div className="reschedule-form__actions">
                <button type="button" className="reschedule-form__btn reschedule-form__btn--cancel" onClick={closeRescheduleModal}>
                  Скасувати
                </button>
                <button type="submit" className="reschedule-form__btn reschedule-form__btn--submit" disabled={isRescheduling || !rescheduleSelectedSlot}>
                  {isRescheduling ? 'Збереження…' : 'Перенести'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
                const menuKey = session?.visitId ?? session?.sheduleId;
                const showReschedule = session?.visitId != null;
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
                        {showReschedule && (
                          <div
                            className="profile-schedule-menu"
                            ref={openMenuId === menuKey ? menuRef : null}
                          >
                            <button
                              type="button"
                              className="profile-schedule-menu__btn"
                              aria-label="Меню"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenMenuId((id) => (id === menuKey ? null : menuKey));
                              }}
                            >
                              <span className="profile-schedule-menu__dot" />
                              <span className="profile-schedule-menu__dot" />
                              <span className="profile-schedule-menu__dot" />
                            </button>
                            <div
                              className={`profile-schedule-menu__dropdown ${openMenuId === menuKey ? 'is-open' : ''}`}
                            >
                              <button
                                type="button"
                                className="profile-schedule-menu__item"
                                onClick={() => handleRescheduleClick(session)}
                              >
                                Перенести заняття
                              </button>
                            </div>
                          </div>
                        )}
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
