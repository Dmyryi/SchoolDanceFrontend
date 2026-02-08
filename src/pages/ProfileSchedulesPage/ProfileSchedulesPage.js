import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { HeaderComponent } from '../../components/HeaderComponent/HeaderComponent';
import { fetchProfileSchedules } from '../../redux/profile/operations';
import './ProfileSchedulesPage.css';

export const ProfileSchedulesPage = () => {
  const dispatch = useDispatch();
  const { schedules, isLoadingSchedules, errorSchedules } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchProfileSchedules());
  }, [dispatch]);

  return (
    <div className="profile-schedules-page">
      <HeaderComponent />
      <div className="profile-schedules-container">
        <NavLink to="/profile" className="profile-schedules-back">
          ← Назад до профілю
        </NavLink>
        <h1 className="profile-schedules-title">My Schedules</h1>
        {isLoadingSchedules && <p className="profile-schedules-loading">Завантаження...</p>}
        {errorSchedules && <p className="profile-schedules-error">Помилка: {errorSchedules}</p>}
        {!isLoadingSchedules && !errorSchedules && (
          <ul className="profile-schedules-list">
            {schedules.length === 0 ? (
              <li className="profile-schedules-empty">Немає запланованих занять.</li>
            ) : (
              schedules.map((s) => (
                <li key={s.sheduleId} className="profile-schedules-item">
                  <span className="profile-schedules-item__name">{s.danceTypeName}</span>
                  <span className="profile-schedules-item__day">{s.dayOfWeek}</span>
                  <span className="profile-schedules-item__time">{s.startTime}</span>
                  <span className="profile-schedules-item__room">{s.room}</span>
                  <span className="profile-schedules-item__trainer">{s.trainerName}</span>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};
