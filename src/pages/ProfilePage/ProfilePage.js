import { useState } from 'react';
import { HeaderComponent } from "../../components/HeaderComponent/HeaderComponent";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import "./ProfilePage.css";
import { LayoutProfile } from '../../components/LayoutProfile/LayoutProfile';
export default function ProfilePage() {
 

  return (
    <div className="profile-page">
      <HeaderComponent />
      <div className="profile-container">
   <LayoutProfile/>
      </div>
    </div>
  );
}
