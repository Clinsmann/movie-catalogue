import "./styles.scss";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="error-message">
    <div className="container">
      <strong>Error</strong>
      <div className="message">{message}</div>
    </div>
  </div>
);
