import React from 'react';
import Window from './Window';
import cs from 'classnames';

const Prompt = ({ buttons, text, onSubmit, title, ...props }) => {
  return (
    <Window {...props} showClose={false} dialogue>
      <div className="prompt">
        <div className="content">
          <div className="first-block">
            <h3>{title}</h3>
            <hr />
          </div>
          <div className="second-block">
            <p className="text">{text}</p>
            <ul className="buttons-bar">
              {buttons.map((button, i) => {
                return (
                  <li key={i}>
                    <button
                      className={cs({
                        'enter-button': i === buttons.length - 1,
                      })}
                      onClick={() => onSubmit(i)}
                    >
                      {button}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </Window>
  );
};

export default Prompt;
