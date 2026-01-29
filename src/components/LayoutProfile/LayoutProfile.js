import { AuthNav } from "../AuthNav/AuthNav";
import { ProfileForm } from "../ProfileForm/ProfileForm";
import { useAuth } from "../../hooks/useAuth";


export const LayoutProfile = () => {
const { isLoggedIn } = useAuth();

return (
  <div className="layout-profile">
    {isLoggedIn ? <ProfileForm /> : <AuthNav />}
  </div>
);
}