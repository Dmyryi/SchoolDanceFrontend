import { HeaderComponent } from "../../components/HeaderComponent/HeaderComponent"
import { SheduleComponent } from "../../components/ShedulesComponent/ShedulesComponent"
import "./ShedulesPage.css"

export const ShedulePage = ()=>{
    return(
        <div className="schedule-page">
             <HeaderComponent/>
             <SheduleComponent/>
        </div>
    )
}