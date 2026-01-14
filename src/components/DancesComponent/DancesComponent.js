import { useDispatch, useSelector } from "react-redux"
import { getDances } from "../../redux/selectors/selectors"
import { useEffect } from "react";
import { fetchDances } from "../../redux/schoolShelf/schoolOperation";
import "./DancesComponent.css";
export const DancesComponent=()=>{

const dances = useSelector(getDances);
const isLoading = useSelector(state => state.schoolDance.isLoading);
const error = useSelector(state=>state.schoolDance.error);
const dispatch = useDispatch();

useEffect(()=>{
    dispatch(fetchDances());
}, [dispatch])

console.log('Dances from Redux:', dances);
console.log('Is Loading:', isLoading);
console.log('Error:', error);



   return (
  <div className="dances-container">
    {isLoading && <p>Loading...</p>}
    {error && <p>Error: {error}</p>}
    
    <ul className="dances-grid">
      {dances.map((item) => (
        <li key={item.danceId} className="dance-card">
          <div className="dance-card__image-thumb">
            <img src={item.danceImg} alt={item.name} />
          </div>

          <div className="dance-card__content">
            <h3 className="dance-card__title">{item.name}</h3>
            <p className="dance-card__category">{item.category}</p>
          </div>

          <div className="dance-card__btn">
            <div className="dance-card__btn-arrow"></div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
}

