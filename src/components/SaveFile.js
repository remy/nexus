import React from 'react';
import idb from 'idb-keyval';
import Window from './Window';

const SaveFile = ({ add, ...props }) => {
  return (
    <Window {...props} title="">
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
                    <ul>
                      <li>
                        <input type="radio" name="file" id="file1" />
                        <label htmlFor="file1">fileName.html</label>
                      </li>
                      <li>
                        <input type="radio" name="file" id="file2" />
                        <label htmlFor="file2">fileName.html</label>
                      </li>
                      <li>
                        <input type="radio" name="file" id="file3" />
                        <label htmlFor="file3">fileName.html</label>
                      </li>
                      <li>
                        <input type="radio" name="file" id="file4" />
                        <label htmlFor="file4">fileName.html</label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="second-block">
            <p>
              <label>
                Name: <input type="text" name="file-name" />
              </label>
            </p>
            <ul class="buttons-bar">
              <li>
                <img src="img/house.png" alt="" />
              </li>
              <li>
                <img src="img/disk.png" alt="" />
              </li>
              <li>
                <img src="img/disk-arrow.png" alt="" />
              </li>
              <li>
                <button>Cancel</button>
              </li>
              <li>
                <button className="enter-button">OK</button>
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
