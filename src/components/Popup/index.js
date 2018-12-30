import React from 'react';

import 'bootstrap/dist/css/bootstrap.css'
import './style.scss';

const fields = [
  {
    id: 'postVoteButtons',
    label: 'Post vote buttons',
    defaultValue: true,
  },
  {
    id: 'commentVoteButtons',
    label: 'Comment vote buttons',
    defaultValue: true,
  },
  {
    id: 'postScore',
    label: 'Post score',
    defaultValue: true,
  },
  {
    id: 'commentScore',
    label: 'Comment score',
    defaultValue: true,
  },
  {
    id: 'karma',
    label: 'Karma',
    defaultValue: true,
  },
  {
    id: 'commentCount',
    label: 'Comment count',
    defaultValue: false,
  },
  {
    id: 'gildBadge',
    label: 'Gild badge',
    defaultValue: false,
  }
];

class Popup extends React.Component {
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
      const data = {
        ...defaults,
        ...storage,
      };

      this.setState({
        loading: false,
        data,
      });
    });
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

    chrome.storage.sync.set(obj)
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
    const { loading, data, changed } = this.state;
    console.log('changed: ', changed);
    return loading ? <div>Loading...</div> : (
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
