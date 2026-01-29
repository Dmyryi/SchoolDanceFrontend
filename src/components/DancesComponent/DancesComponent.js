import { useDispatch, useSelector } from "react-redux"
import { getDances, getTrainerByDances } from "../../redux/selectors/selectors"
import { useEffect } from "react";
import { fetchDances, fetchTrainersByDance } from "../../redux/schoolShelf/schoolOperation";
import "./DancesComponent.css";
import { NavLink } from 'react-router-dom';

export const DancesComponent=()=>{

const dances = useSelector((state) => getDances(state));
const isLoading = useSelector((state) => state.schoolDance?.isLoading);
const error = useSelector((state) => state.schoolDance?.error);
const dispatch = useDispatch();

useEffect(() => {
    dispatch(fetchDances());
}, [dispatch])
   return (
  <div className="dances-container">
    {isLoading && (
      <div style={{ 
        textAlign: 'center', 
        padding: '4rem 2rem',
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '1.5rem'
      }}>
        Завантаження...
      </div>
    )}
    {error && (
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        color: '#ff6b6b',
        background: 'rgba(255, 107, 107, 0.1)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 107, 107, 0.3)',
        backdropFilter: 'blur(10px)',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        Помилка: {error}
      </div>
    )}
    {!isLoading && !error && dances.length === 0 && (
      <div style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '1.2rem'
      }}>
        Немає танців для відображення
      </div>
    )}
    
    {!isLoading && !error && dances.length > 0 && (
      <ul className="dances-grid">
        {dances.map((item) => (
          <li key={item.danceId} className="dance-card">
            <div className="dance-card__image-thumb">
              {item.danceImg ? (
                <img src={item.danceImg} alt={item.name} />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  color: '#ccc'
                }}>
                  💃
                </div>
              )}
            </div>

            <div className="dance-card__content">
              <h3 className="dance-card__title">{item.name}</h3>
              <p className="dance-card__category">{item.category}</p>
            </div>
            
            <NavLink to={`/trainers/${item.category}`}>
              <div className="dance-card__btn">
                <div className="dance-card__btn-arrow"></div>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    )}
  </div>
);
}
