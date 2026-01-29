import React, { useState } from "react";
import "./AuthNav.css";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";


export const AuthNav = () => {
 const [activeTab, setActiveTab] = useState('login');
 
    return(
             <div className="auth-wrapper">
          <div className="auth-tabs">
            <button
              className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Вхід
            </button>
            <button
              className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Реєстрація
            </button>
          </div>
          
          <div className="auth-form-container">
            {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
    )
}