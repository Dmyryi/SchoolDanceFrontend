import React from 'react';
import './RegisterForm.css';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
export default function RegisterForm() {

const dispatch = useDispatch();

const handleSubmit = (e) => {
e.preventDefault();
const form = e.currentTarget;
dispatch(register({
  email:form.elements.email.value,
  password:form.elements.password.value,
  name:form.elements.name.value,
  phone:form.elements.phone.value
}))
form.reset();
}

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2 className="form-title">Реєстрація</h2>
        <p className="form-subtitle">Створіть новий обліковий запис</p>
      </div>

      <div className="form-fields">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Ім'я <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            placeholder="Введіть ваше ім'я"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Телефон <span className="required">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-input"
            placeholder="+380 (XX) XXX XX XX"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            placeholder="example@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Пароль <span className="required">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            placeholder="Введіть пароль"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          Зареєструватися
        </button>
      </div>
    </form>
  );
}
