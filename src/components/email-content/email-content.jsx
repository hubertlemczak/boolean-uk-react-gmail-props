export const EmailContent = ({ email: { title, sender } }) => {
  return (
    <div className="email-content">
      <h3>{title}</h3>
      <div className="sender-info">
        <h4>{sender}</h4>
        <em>&lt;{sender}@gmail.com&gt;</em>
      </div>
      <div className="email-body">
        <p>{title.repeat(30)}</p>
      </div>
    </div>
  );
};
