import React, { useState, useEffect } from 'react';
import Window from './Window';
import { copyStyle } from '../actions/styles';

export const styles = [
  { name: 'Normal', tag: '<P>', font: 'Helvetica', size: 12.0 },
  {
    name: 'Address',
    tag: '<P>',
    unknown: 0,
    font: 'Helvetica-Oblique',
    size: 12.0,
  },
  {
    name: 'Heading1',
    tag: '<H1>',
    unknown: 0,
    font: 'Helvetica-Bold',
    size: 18.0,
  },
  {
    name: 'Heading2',
    tag: '<H2>',
    unknown: 0,
    font: 'Helvetica-Bold',
    size: 14.0,
  },
  {
    name: 'Heading3',
    tag: '<H3>',
    unknown: 0,
    font: 'Helvetica-Oblique ',
    size: 14.0,
  },
  {
    name: 'Heading4',
    tag: '<H4>',
    unknown: 0,
    font: 'Helvetica-Bold',
    size: 12.0,
  },
  {
    name: 'Heading5',
    tag: '<H5>',
    unknown: 0,
    font: 'Helvetica-Bold-Oblique',
    size: 12.0,
  },
  {
    name: 'Heading6',
    tag: '<H6>',
    unknown: 0,
    font: 'Helvetica-Bold',
    size: 12.0,
  },
  { name: 'List', tag: '<LI>', unknown: 0, font: 'Helvetica', size: 12.0 },
  { name: 'Glossary', tag: '<DL>', unknown: 0, font: 'Helvetica', size: 12.0 },
  { name: 'Example', tag: '<XMP>', font: 'Ohlfs', size: 10.0 },
  { name: 'Listing', tag: '<LISTING>', font: 'Ohlfs', size: 9.0 },
];

const StyleEditor = ({ onClose, ...props }) => {
  const [index, setIndex] = useState(0);
  const [style, setStyle] = useState(styles[index]);

  const previous = () => {
    let i = index;
    if (i > 0) i--;
    setIndex(i);
  };

  const next = () => {
    let i = index;
    if (i < styles.length) i++;
    setIndex(i);
  };

  useEffect(() => {
    setStyle(styles[index]);
    copyStyle({ style: styles[index] });
  }, [index]);

  return (
    <Window {...props} title="Style Editor" onClose={onClose}>
      <div id="style-editor">
        <div className="first-block">
          <p>
            <label>
              Style name:{' '}
              <input type="text" name="style-name" value={style.name} />
            </label>
          </p>
          <ul className="buttons-bar limited">
            <li>
              <button onClick={previous}>&lt;&lt;</button>
            </li>
            <li>
              <button style={{ padding: '0.3em 5px' }}>
                style of selection
              </button>
            </li>
            <li>
              <button onClick={next}>&gt;&gt;</button>
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
                  value="100"
                />
              </p>
              <p className="tabbed">
                <label htmlFor="successive-indent">Successive indent:</label>
                <input
                  type="text"
                  id="successive-indent"
                  name="successive-indent"
                  value="130"
                />
              </p>
              <p className="tabbed">
                <label htmlFor="tag-font">Font:</label>
                <input
                  type="text"
                  id="tag-font"
                  name="tag-font"
                  value={style.font}
                />
              </p>
              <p className="tabbed">
                <label htmlFor="tag-size">Font size:</label>
                <input
                  type="text"
                  id="tag-size"
                  name="tag-size"
                  value={style.size}
                />
              </p>
              <p className="tabbed" style={{ position: 'relative' }}>
                <label htmlFor="tag-sgml">SGML tag:</label>
                <input
                  type="text"
                  id="tag-sgml"
                  name="tag-sgml"
                  value={style.tag}
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
