import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { HeaderComponent } from '../../components/HeaderComponent/HeaderComponent';
import { fetchProfileSchedules } from '../../redux/profile/operations';
import './ProfileSchedulesPage.css';

export const ProfileSchedulesPage = () => {
  const dispatch = useDispatch();
  const { schedules, isLoadingSchedules, errorSchedules } = useSelector((state) => state.profile);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProfileSchedules());
  }, [dispatch]);

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
    // TODO: відкрити модал/сторінку перенесення заняття
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
          <ul className="profile-schedules-list">
            {schedules.length === 0 ? (
              <li className="profile-schedules-empty">Немає запланованих занять.</li>
            ) : (
              schedules.map((s) => (
                <li key={s.sheduleId} className="profile-schedules-item">
                  <div className="profile-schedules-item__main">
                    <span className="profile-schedules-item__time">{s.startTime}</span>
                    <span className="profile-schedules-item__day">{s.dayOfWeek}</span>
                    <span className="profile-schedules-item__name">{s.danceTypeName}</span>
                    <span className="profile-schedules-item__room">{s.room}</span>
                    <span className="profile-schedules-item__trainer">{s.trainerName}</span>
                  </div>
                  <div className="profile-schedules-item__actions" ref={openMenuId === s.sheduleId ? menuRef : null}>
                    <button
                      type="button"
                      className="profile-schedules-item__menu-btn"
                      aria-label="Відкрити меню"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId((id) => (id === s.sheduleId ? null : s.sheduleId));
                      }}
                    >
                      <span className="profile-schedules-item__menu-dot" />
                      <span className="profile-schedules-item__menu-dot" />
                      <span className="profile-schedules-item__menu-dot" />
                    </button>
                    <div className={`profile-schedules-item__dropdown ${openMenuId === s.sheduleId ? 'is-open' : ''}`}>
                      <button
                        type="button"
                        className="profile-schedules-item__dropdown-item"
                        onClick={() => handleReschedule(s)}
                      >
                        Перенести заняття
                      </button>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};
