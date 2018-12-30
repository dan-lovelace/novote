import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

const Popup = props => (
  <div className='popup'>
    <div className='popup--content'>
      <h3>Options</h3>
      <Form>
        <FormGroup check>
          <Label check>
            <Input type='checkbox' />{' '}
            Option 1
          </Label>
        </FormGroup>
      </Form>
    </div>
  </div>
);

export default Popup;
