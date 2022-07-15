import { useState } from 'react';
import { Emails } from './components/emails/emails.component';
import { EmailContent } from './components/email-content/email-content';

import { initialEmails } from './data/emails';

import './styles/app.css';
const getReadEmails = (emails) => emails.filter((email) => !email.read);

const getStarredEmails = (emails) => emails.filter((email) => email.starred);

function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);
  const [currentTab, setCurrentTab] = useState('inbox');
  const [currentEmail, setCurrentEmail] = useState();
  const [searchValue, setSearchValue] = useState('');

  const unreadEmails = emails.filter((email) => !email.read);
  const starredEmails = emails.filter((email) => email.starred);

  const searchHandler = (value) => {
    setSearchValue(value);
  };

  let filteredEmails = emails;
  if (hideRead) filteredEmails = getReadEmails(filteredEmails);
  if (currentTab === 'starred')
    filteredEmails = getStarredEmails(filteredEmails);

  filteredEmails = filteredEmails.filter((email) =>
    `${email.sender} ${email.title}`.toLocaleLowerCase().includes(searchValue)
  );

  return (
    <div className="app">
      <header className="header">
        <div className="left-menu">
          <svg className="menu-icon" focusable="false" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
          </svg>

          <img
            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png"
            alt="gmail logo"
          />
        </div>

        <div className="search">
          <input
            className="search-bar"
            placeholder="Search mail"
            value={searchValue}
            onChange={(e) => searchHandler(e.target.value.toLocaleLowerCase())}
          />
        </div>
      </header>
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === 'inbox' ? 'active' : ''}`}
            onClick={() => setCurrentTab('inbox')}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadEmails.length}</span>
          </li>
          <li
            className={`item ${currentTab === 'starred' ? 'active' : ''}`}
            onClick={() => setCurrentTab('starred')}
          >
            <span className="label">Starred</span>
            <span className="count">{starredEmails.length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={(e) => setHideRead(e.target.checked)}
            />
          </li>
        </ul>
      </nav>
      {currentTab === 'email' ? (
        <EmailContent email={currentEmail} />
      ) : (
        <Emails
          setEmails={setEmails}
          setCurrentTab={setCurrentTab}
          setCurrentEmail={setCurrentEmail}
          filteredEmails={filteredEmails}
        />
      )}
    </div>
  );
}

export default App;
