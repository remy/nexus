import React, { useState, useEffect } from 'react';
import Window from './Window';
import { save, load, list } from '../filesystem';

const SaveFile = ({ close, add, id, ...props }) => {
  const [selected, setSelected] = useState('');
  const [files, setFiles] = useState([]);

  const saveAndLoad = async () => {
    const template = await load('blank.html');
    save(selected, template);
    add({
      id: 'file://WWW/' + selected,
      type: 'url',
    });
    close(id);
  };

  useEffect(() => {
    list().then(files => setFiles(files));
  }, []);

  return (
    <Window {...props} id={id} title="" dialogue>
      <div id="save-file">
        <div className="content">
          <div className="first-block">
            <h3>Save</h3>
            <hr />
            <div className="file-lists">
              <div className="list">
                <h4>WWW</h4>
                <div className="r2l-content">
                  <div className="l2r-content">
                    <select
                      defaultValue={selected}
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
                <img src="img/disk-arrow.png" alt="Icon of a disk with an arrow" />
              </li>
              <li>
                <button onClick={() => close(id)}>Cancel</button>
              </li>
              <li>
                <button onClick={saveAndLoad} className="enter-button">
                  OK
                </button>
              </li>
            </ul>
          </div>
        </div>
        <button className="grab-window">Grab the window</button>
      </div>
    </Window>
  );
};

export default SaveFile;
