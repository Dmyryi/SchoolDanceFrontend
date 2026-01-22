import { useDispatch, useSelector } from "react-redux"
import { StatusIcon } from "./StatusIcon";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchShedulesByTrainer } from "../../redux/schoolShelf/schoolOperation";
import { getShedulesByTrainer } from "../../redux/selectors/selectors";
import './SheduleComponent.css'
export const SheduleComponent=()=>{
const { trainerId } = useParams();
    const isLoading = useSelector(state => state.schoolDance.isLoading);
    const error = useSelector(state=>state.schoolDance.error);

    const dispatch = useDispatch();
const shedules = useSelector(getShedulesByTrainer);
const [activeDay, setActiveDay] = useState("Monday");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
  ];
  // 2. Фільтруємо розклад під вибраний день
  const filteredShedules = shedules.filter(item => item.dayOfWeek === activeDay);
useEffect(()=>{
dispatch(fetchShedulesByTrainer(trainerId));
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = days[new Date().getDay()];
  setActiveDay(today);
},[dispatch, trainerId])


return (
    <div className="schedule-dashboard">
      {/* Перемикач днів (Таби) */}
      <div className="days-nav">
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
          <button 
            key={day} 
            className={`day-tab ${activeDay === day ? 'active' : ''}`}
            onClick={() => setActiveDay(day)}
          >
            {day.substring(0, 3)}
          </button>
        ))}
      </div>

      {/* Сітка блоків */}
      <div className="blocks-grid">
        {timeSlots.map((time) => {
          const session = shedules.find(s => 
            s.dayOfWeek === activeDay && s.startTime.startsWith(time)
          );

          let stateClass = "empty"; // Білий (дефолт)
          if (session) {
            stateClass = session.status === 1 ? "available" : "booked";
          }

          return (
            <div key={time} className={`time-block ${stateClass}`}>
              <span className="time-label">{time}</span>
              {session && <span className="room-label">{session.room}</span>}
              {session?.status === 1 && <button className="mini-book-btn">+</button>}
            </div>
          );
        })}
      </div>
    </div>
  );
}