import React from 'react';

console.log('Popup test');

class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: null
    };

    chrome.storage.sync.set({ test: 'bar' });

    const done = data => {
      this.setState({
        loading: false,
        data,
      });
    }

    chrome.storage.sync.get('test', data => {
      console.log('data: ', data);
      done(data);
    });
  }

  render() {
    return (
      <div className='popup'>
        <div className='popup--content'>
          <h3>Options</h3>
          <form>
            <label>
              <input type='checkbox' />{' '}
              Test
            </label>
          </form>
        </div>
      </div>
    );
  }
};

export default Popup;
