import React, { createRef } from 'react';
import Window from './Window';

const StyleEditor = ({ onAction, onClose, ...props }) => {
  const inputRef = createRef();
  const handleClick = () => {
    onAction(inputRef.current.value);
    onClose(props.id);
  };
  return (
    <Window {...props} title="Style Editor" onClose={onClose}>
      <div id="style-editor">
        <div className="first-block">
          <p>
            <label>
              Style name:{' '}
              <input type="text" name="style-name" defaultValue="List" />
            </label>
          </p>
          <ul className="buttons-bar limited">
            <li>
              <button>&lt;&lt;</button>
            </li>
            <li>
              <button style={{ padding: '0.3em 5px' }}>
                style of selection
              </button>
            </li>
            <li>
              <button>&gt;&gt;</button>
            </li>
          </ul>
        </div>
        <div className="second-block">
          <ul className="buttons-bar vertical">
            <li>
              <button style={{ padding: '10px 0' }}>
                <strong>Apply to selection</strong>
              </button>
            </li>
            <li>
              <button>Apply style to all similar text</button>
            </li>
            <li>
              <button>Find unstyled text</button>
            </li>
          </ul>
          <fieldset>
            <legend>
              <span>Style sheet</span>
            </legend>
            <div className="content">
              <ul className="buttons-bar vertical">
                <li>
                  <button>Open</button>
                </li>
                <li>
                  <button>Save as...</button>
                </li>
              </ul>
            </div>
          </fieldset>
        </div>
        <div className="third-block">
          <fieldset>
            <legend>
              <span>Format</span>
            </legend>
            <div className="content">
              <p className="tabbed">
                <label htmlFor="fline-indent">First line indent:</label>
                <input
                  type="text"
                  id="fline-indent"
                  name="fline-indent"
                  defaultValue="100"
                />
              </p>
              <p className="tabbed">
                <label htmlFor="successive-indent">Successive indent:</label>
                <input
                  type="text"
                  id="successive-indent"
                  name="successive-indent"
                  defaultValue="130"
                />
              </p>
              <p className="tabbed">
                <label htmlFor="tag-font">Font:</label>
                <input
                  type="text"
                  id="tag-font"
                  name="tag-font"
                  defaultValue="Helvetica"
                />
              </p>
              <p className="tabbed">
                <label htmlFor="tag-size">Font size:</label>
                <input
                  type="text"
                  id="tag-size"
                  name="tag-size"
                  defaultValue="12"
                />
              </p>
              <p className="tabbed" style={{ position: 'relative' }}>
                <label htmlFor="tag-sgml">SGML tag:</label>
                <input
                  type="text"
                  id="tag-sgml"
                  name="tag-sgml"
                  defaultValue="<LI>"
                />
                <button className="enter-button" disabled>
                  Set
                </button>
              </p>
              <p>
                <label htmlFor="tag-tabs">Tabs:</label>
                <input type="text" id="tag-tabs" name="tag-tabs" />
              </p>
            </div>
          </fieldset>
        </div>
      </div>
    </Window>
  );
};

export default StyleEditor;
