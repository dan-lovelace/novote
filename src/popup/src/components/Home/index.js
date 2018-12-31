import React, { Fragment } from 'react';

import 'bootstrap/dist/css/bootstrap.css'
import './style.scss';
import fields from '../../lib/fields';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: null,
      changed: false,
    };

    chrome.storage.sync.get(fields.map(field => field.id), storage => {
      const defaults = fields.reduce((acc, val, index) => index !== 1
        ? Object.assign(acc, { [val.id]: val.defaultValue })
        : Object.assign({ [acc.id]: acc.defaultValue }, { [val.id]: val.defaultValue })
      );
      const userConfig = {
        ...defaults,
        ...storage,
      };

      this.setState({
        loading: false,
        data: userConfig,
      });
    });
  }

  toggleOption = event => {
    const { target: { id }} = event;
    const { changed } = this.state;

    if (!id
      || id.length < 1
      || !(fields.find(field => field.id === id))
    ) {
      return false;
    };

    const { data } = this.state;
    const obj = { [id]: !data[id] };
    const newData = {
      ...data,
      ...obj
    };

    chrome.storage.sync.set({
      ...newData,
      saved: true,
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { from: 'popup', subject: 'UpdateConfig', data: newData }
      )
    });

    this.setState({
      data: newData,
      changed: changed || newData[id] === false
    });
  }

  reloadPage = () => {
    chrome.tabs.reload();
    window.close();
  }

  render() {
    const { loading, data, changed } = this.state;

    return (
      <div className='popup'>
        <div className='popup--content'>
          {loading ? (
            <div>Loading</div>
          ) : (
            <Fragment>
              <div className='popup--content__heading'>
                Choose what to disable
              </div>
              <form className='popup--content__form'>
                {fields.map(field => {
                  const { id, label, defaultValue } = field;
                  const storageValue = data[id];

                  return (
                    <div key={id} className='option custom-control custom-switch' onClick={this.toggleOption}>
                      <input type='checkbox' id={id} checked={storageValue} className='custom-control-input' />
                      <label className='custom-control-label' for={id}>
                        {label}
                      </label>
                    </div>
                  );
                })}
              </form>
              {changed &&
                <div className='popup--content_actions'>
                  <p className='alert alert-danger' role='alert'>
                    Please refresh the page to see these changes
                  </p>
                  <button className='btn btn-primary btn-block' onClick={() => this.reloadPage()}>Refresh now</button>
                </div>
              }
            </Fragment>
          )}
        </div>
      </div>
    );
  }
};

export default Home;
