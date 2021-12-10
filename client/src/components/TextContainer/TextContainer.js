import React from 'react';

import './textContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <h1>Chat REDЯUM <span role="img" aria-label="emoji"></span></h1>
      <h2>Aplikacioni chat në kohë reale<span role="img" aria-label="emoji"></span></h2>
      {/* <h2>! <span role="img" aria-label="emoji"></span></h2> */}
    </div>
    {
      users
        ? (
          <div>
            <h1>People currently chatting:</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src="https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/onlineIcon.png"/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;