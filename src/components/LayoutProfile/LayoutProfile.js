import { useState } from 'react';
import { AuthNav } from "../AuthNav/AuthNav";
import { ProfileForm } from "../ProfileForm/ProfileForm";
import { ProfileComponent } from "../ProfileComponent/ProfileComponent";
import { useAuth } from "../../hooks/useAuth";

export const LayoutProfile = () => {
  const { isLoggedIn } = useAuth();
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  return (
    <div className="layout-profile">
      {isLoggedIn ? (
        showUpdateForm ? (
          <ProfileForm onCancel={() => setShowUpdateForm(false)} />
        ) : (
          <ProfileComponent onUpdateProfile={() => setShowUpdateForm(true)} />
        )
      ) : (
        <AuthNav />
      )}
    </div>
  );
};