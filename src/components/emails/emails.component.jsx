import { Email } from '../email/email.component';

export const Emails = ({
  setEmails,
  setCurrentTab,
  setCurrentEmail,
  filteredEmails,
}) => {
  return (
    <main className="emails">
      <ul>
        {filteredEmails.map((email, index) => (
          <Email
            key={index}
            email={email}
            setEmails={setEmails}
            setCurrentTab={setCurrentTab}
            setCurrentEmail={setCurrentEmail}
          />
        ))}
      </ul>
    </main>
  );
};
