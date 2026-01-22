import { useParams } from 'react-router-dom';
import { HeaderComponent } from '../../components/HeaderComponent/HeaderComponent';
import { TrainersComponent } from '../../components/TrainersComponent/TrainersComponent';

export const TrainersPage=()=>{
const {specDance} = useParams();



    return(
        <>
              <HeaderComponent/>
        <TrainersComponent specDance={specDance}/></>
  
    )
}