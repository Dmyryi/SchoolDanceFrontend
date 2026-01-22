  import './SheduleComponent.css'
  
  export  const StatusIcon = ({ status }) => {
  // Тепер status приходить як 0 або 1 з твого SheduleDto
  switch (status) {
    case 1: // Йде запис (Твоя "зелена лампочка")
      return (
        <span className="status-indicator status-online">
          <span className="dot">●</span> Йде запис
        </span>
      );
    case 0: // Зайнято (Твоя "вимкнена лампочка")
      return (
        <span className="status-indicator status-offline">
          <span className="dot">○</span> Місць немає
        </span>
      );
    default:
      return null;
  }
};