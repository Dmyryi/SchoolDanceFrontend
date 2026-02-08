import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectUser } from '../../redux/auth/selector';
import './ProfileComponent.css';

const DefaultAvatarIcon = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="profile-avatar-placeholder">
    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ProfileComponent = ({ onUpdateProfile }) => {
  const user = useSelector(selectUser);

  const noUser = !user || (Array.isArray(user) && user.length === 0);
  if (noUser) {
    return (
      <div className="profile-component profile-component--loading">
        <p>Завантаження профілю...</p>
      </div>
    );
  }

  const hasImg = user.userImg && user.userImg.trim() !== '';
  const roleLabels = { 0: 'Користувач', 1: 'Тренер', 2: 'Студент' };
  const roleLabel = roleLabels[user.role] ?? `Роль ${user.role}`;

  return (
    <div className="profile-component">
      <header className="profile-header">
        <h1 className="profile-header__name">{user.name || '—'}</h1>
      </header>
      <div className="profile-layout">
        <aside className="profile-sidebar">
          <div className="profile-sidebar__avatar-wrap">
            {hasImg ? (
              <img
                src={user.userImg}
                alt=""
                className="profile-sidebar__avatar"
              />
            ) : (
              <DefaultAvatarIcon />
            )}
          </div>
          <p className="profile-sidebar__role">{roleLabel}</p>
          {user.trainer?.specialization && (
            <p className="profile-sidebar__specialization">{user.trainer.specialization}</p>
          )}
          <div className="profile-sidebar__actions">
            <NavLink to="/profile/schedules" className="profile-sidebar__btn profile-sidebar__btn--schedules">
              My Schedules
            </NavLink>
            <button
              type="button"
              className="profile-sidebar__btn profile-sidebar__btn--update"
              onClick={onUpdateProfile}
            >
              Update Profile
            </button>
          </div>
        </aside>
        <section className="profile-info" aria-label="Контактна інформація">
          <h2 className="profile-info__title">Контактна інформація</h2>
          <dl className="profile-info__list">
            <div className="profile-info__row">
              <dt className="profile-info__term">Ім'я</dt>
              <dd className="profile-info__value">{user.name || '—'}</dd>
            </div>
            <div className="profile-info__row">
              <dt className="profile-info__term">Email</dt>
              <dd className="profile-info__value">{user.email || '—'}</dd>
            </div>
            <div className="profile-info__row">
              <dt className="profile-info__term">Телефон</dt>
              <dd className="profile-info__value">{user.phone || '—'}</dd>
            </div>
            <div className="profile-info__row">
              <dt className="profile-info__term">Роль</dt>
              <dd className="profile-info__value">{roleLabel}</dd>
            </div>
            {user.trainer?.specialization && (
              <div className="profile-info__row">
                <dt className="profile-info__term">Спеціалізація</dt>
                <dd className="profile-info__value">{user.trainer.specialization}</dd>
              </div>
            )}
            <div className="profile-info__row">
              <dt className="profile-info__term">
                {user.student ? 'Активних абонементів' : 'Моїх розкладів'}
              </dt>
              <dd className="profile-info__value">
                {user.student?.activeSubscriptionCount ?? user.trainer?.schedulesCount ?? '—'}
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
};
