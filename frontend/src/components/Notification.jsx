const Notification = ({ message, type }) => {
  if (message === null) {
    return;
  }

  return (
    <div className={`${type === "error" ? "error" : "success"}`}>{message}</div>
  );
};

export default Notification;
