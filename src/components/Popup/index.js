import React from 'react';

const Popup = props => (
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

export default Popup;
