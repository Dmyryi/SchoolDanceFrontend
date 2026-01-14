import { DancesComponent } from "../../components/DancesComponent/DancesComponent";
import { HeaderComponent } from "../../components/HeaderComponent/HeaderComponent";
import "./DancesPage.css"
export default function DancesPage() {
  return (
    <div className="home-page">
  <HeaderComponent></HeaderComponent>
  <DancesComponent></DancesComponent>
    </div>
  );
}