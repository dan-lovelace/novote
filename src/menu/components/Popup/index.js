import React from 'react';

import 'bootstrap/dist/css/bootstrap.css'
import './style.scss';
import { fields } from '../../App';

class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.config,
      changed: false,
    };
  }

  toggleOption = event => {
    const { target: { id }} = event;

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
      ...obj,
      saved: true,
    })
    
    this.setState({
      data: newData,
      changed: newData[id] !== data[id]
    });
  }

  reloadPage = () => {
    chrome.tabs.reload();
    window.close();
  }

  render() {
    const { data, changed } = this.state;
    console.log('changed: ', changed);
    return (
      <div className='popup'>
        <div className='popup--content'>
          <div className='popup--content__heading'>
            The following will be disabled
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
                Please refresh the page to see changes
              </p>
              <button className='btn btn-primary btn-block' onClick={() => this.reloadPage()}>Refresh now</button>
            </div>
          }
        </div>
      </div>
    );
  }
};

export default Popup;
