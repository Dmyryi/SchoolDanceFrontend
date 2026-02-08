import React from 'react';
import './LoginForm.css';
import { logIn, refreshUser } from '../../redux/auth/operations';
import { useDispatch } from 'react-redux';

export default function LoginForm() {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    try {
      await dispatch(logIn({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })).unwrap();
      await dispatch(refreshUser()).unwrap();
    } catch {
      // помилку вже показує logIn через alert
    }
    form.reset();
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2 className="form-title">Вхід</h2>
        <p className="form-subtitle">Увійдіть до свого облікового запису</p>
      </div>

      <div className="form-fields">
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
          Увійти
        </button>
      </div>
    </form>
  );
}
