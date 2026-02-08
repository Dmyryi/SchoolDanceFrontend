export const ProfileForm = ({ onCancel }) => {
  return (
    <div className="profile-form">
      <div className="profile-form__content">Profile Form Content</div>
      {onCancel && (
        <button type="button" className="profile-form__cancel" onClick={onCancel}>
          Скасувати
        </button>
      )}
    </div>
  );
};