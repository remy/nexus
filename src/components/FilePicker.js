import React, { useState, useEffect } from 'react';
import { list } from '../filesystem';

export default ({ onSubmit, onCancel, title }) => {
  const [files, setFiles] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    list().then(files => {
      setFiles(files);
      setSelected(files[0]);
    });
  }, []);

  return (
    <form
      id="save-file"
      onReset={onCancel}
      onSubmit={event => {
        event.preventDefault();
        onSubmit(selected);
      }}
    >
      <div className="content">
        <div className="first-block">
          <h3>{title}</h3>
          <hr />
          <div className="file-lists">
            <div className="list">
              <h4>WWW</h4>
              <div className="r2l-content">
                <div className="l2r-content">
                  <select
                    defaultValue={selected}
                    onDoubleClick={() => onSubmit(selected)}
                    onChange={e => {
                      setSelected(e.target.value);
                    }}
                    size={files.length}
                  >
                    {files.map((filename, i) => {
                      return <option key={i}>{filename}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="second-block">
          <p>
            <label>
              Name:{' '}
              <input
                value={selected}
                onChange={e => setSelected(e.target.value)}
                type="text"
                name="file-name"
              />
            </label>
          </p>
          <ul className="buttons-bar">
            <li>
              <img src="img/house.png" alt="Icon of a house." />
            </li>
            <li>
              <img src="img/disk.png" alt="Icon of a disk." />
            </li>
            <li>
              <img
                src="img/disk-arrow.png"
                alt="Icon of a disk with an arrow"
              />
            </li>
            <li>
              <span
                className="button"
                onClick={() => {
                  onCancel();
                }}
              >
                <input className="reset" type="reset" value="Cancel" />
              </span>
            </li>
            <li>
              <button className="button enter-button">OK</button>
            </li>
          </ul>
        </div>
      </div>
      <button className="grab-window">Grab the window</button>
    </form>
  );
};
