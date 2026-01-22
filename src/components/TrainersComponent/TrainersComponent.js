import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { getTrainerByDances } from '../../redux/selectors/selectors';
import { fetchTrainersByDance } from '../../redux/schoolShelf/schoolOperation';
import './TrainersComponent.css'
import { NavLink } from 'react-router-dom';

export const TrainersComponent=({specDance})=>{
    const dispatch = useDispatch();

    const isLoading = useSelector(state => state.schoolDance.isLoading);
    const error = useSelector(state=>state.schoolDance.error);

    const trainers = useSelector(getTrainerByDances);
    
    useEffect(()=>{
        dispatch(fetchTrainersByDance(specDance));
        console.log(trainers);
    },[dispatch, specDance])
    return(
        <div>
                {isLoading && <p>Loading...</p>}
    {error && <p>Error: {error}</p>}
    
         
                 <ul className="dances-grid">
      {trainers.map((item) => (
        <li key={item.trainerId} className="dance-card">
          <div className="dance-card__image-thumb">
            <img src={item.userImg} alt={item.name} />
          </div>

          <div className="dance-card__content">
            <h3 className="dance-card__title">{item.name}</h3>
            <p className="dance-card__category">{item.specialization}</p>
          </div>

 <NavLink  to={`/shedules/${item.trainerId}`}>
          <div className="dance-card__btn">
             
 <div className="dance-card__btn-arrow"></div>
          
           
          </div>
</NavLink>
        </li>
      ))}
    </ul>
        
        </div>
    )
}