import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchShedulesByTrainer } from "../../redux/schoolShelf/schoolOperation";
import { bookSchedule } from "../../redux/profile/operations";
import { getShedulesByTrainer } from "../../redux/selectors/selectors";
import { selectIsLoggedIn } from "../../redux/auth/selector";
import './SheduleComponent.css'

/** Повертає наступну дату для dayOfWeek (e.g. "Monday") + startTime ("HH:mm" або "HH:mm:ss") у форматі ISO */
function getNextActualDate(dayOfWeek, startTime) {
  const dayIndex = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 };
  const targetDay = dayIndex[dayOfWeek] ?? 1;
  const [h, m, s = 0] = startTime.split(':').map(Number);
  const d = new Date();
  const currentDay = d.getDay();
  let daysToAdd = (targetDay - currentDay + 7) % 7;
  if (daysToAdd === 0 && (d.getHours() > h || (d.getHours() === h && d.getMinutes() >= m))) daysToAdd = 7;
  d.setDate(d.getDate() + daysToAdd);
  d.setHours(h, m, s || 0, 0);
  return d.toISOString();
}

export const SheduleComponent=()=>{
const { trainerId } = useParams();
const navigate = useNavigate();
    const isLoading = useSelector(state => state.schoolDance.isLoading);
    const error = useSelector(state=>state.schoolDance.error);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const dispatch = useDispatch();
const shedules = useSelector(getShedulesByTrainer);
const [activeDay, setActiveDay] = useState("Monday");
const [bookingId, setBookingId] = useState(null);
const [showBookSuccessModal, setShowBookSuccessModal] = useState(false);

  // Маппінг англійських назв на українські
  const dayNames = {
    Monday: "Понеділок",
    Tuesday: "Вівторок",
    Wednesday: "Середа",
    Thursday: "Четвер",
    Friday: "П'ятниця",
    Saturday: "Субота",
    Sunday: "Неділя"
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"
  ];

useEffect(()=>{
dispatch(fetchShedulesByTrainer(trainerId));
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = days[new Date().getDay()];
  setActiveDay(today);
},[dispatch, trainerId])

const handleBook = (session) => {
  if (!isLoggedIn) {
    navigate('/profile');
    return;
  }
  const sheduleId = session.sheduleId ?? session.scheduleId ?? session.id;
  if (!sheduleId) return;
  const actualDate = getNextActualDate(activeDay, session.startTime);
  const id = session.sheduleId ?? session.scheduleId ?? session.id;
  setBookingId(id);
  dispatch(bookSchedule({ sheduleId: id, actualDate }))
    .then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(fetchShedulesByTrainer(trainerId));
        setShowBookSuccessModal(true);
      } else if (res.meta.requestStatus === 'rejected') {
        alert(res.payload || 'Не вдалося записатися');
      }
    })
    .finally(() => setBookingId(null));
};

const closeSuccessModalAndGoToProfile = () => {
  setShowBookSuccessModal(false);
  navigate('/profile');
};

return (
    <div className="schedule-dashboard">
      {showBookSuccessModal && (
        <div
          className="book-success-overlay"
          onClick={closeSuccessModalAndGoToProfile}
          role="dialog"
          aria-modal="true"
          aria-labelledby="book-success-title"
        >
          <div className="book-success-modal" onClick={(e) => e.stopPropagation()}>
            <p id="book-success-title" className="book-success-modal__title">Запис створено</p>
            <p className="book-success-modal__text">Ви успішно записалися на заняття.</p>
            <button
              type="button"
              className="book-success-modal__btn"
              onClick={closeSuccessModalAndGoToProfile}
            >
              OK
            </button>
          </div>
        </div>
      )}
      {/* Перемикач днів (Таби) */}
      <div className="days-nav">
        {days.map(day => (
          <button 
            key={day} 
            className={`day-tab ${activeDay === day ? 'active' : ''}`}
            onClick={() => setActiveDay(day)}
          >
            <span className="day-tab__short">{dayNames[day].substring(0, 3)}</span>
            <span className="day-tab__full">{dayNames[day]}</span>
          </button>
        ))}
      </div>

      {/* Сітка блоків */}
      <div className="blocks-grid">
        {timeSlots.map((time) => {
          const session = shedules.find(s => 
            s.dayOfWeek === activeDay && s.startTime.startsWith(time)
          );

          // Якщо бек не повертає status — вважаємо слот вільним. Інакше: 1 = вільний (по свагеру), 0 = зайнятий
          const isAvailable = session && (session.status === undefined || session.status === 1);
          let stateClass = "empty";
          if (session) {
            stateClass = isAvailable ? "available" : "booked";
          }

          return (
            <div key={time} className={`time-block ${stateClass}`}>
              <span className="time-label">{time}</span>
              {session && <span className="room-label">{session.room}</span>}
              {isAvailable && (
                <button
                  type="button"
                  className="mini-book-btn"
                  title="Записатися"
                  onClick={(e) => { e.stopPropagation(); handleBook(session); }}
                  disabled={bookingId === (session.sheduleId ?? session.scheduleId ?? session.id)}
                >
                  +
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
