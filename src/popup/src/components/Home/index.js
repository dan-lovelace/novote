import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';

import './style.scss';
import fields from '../../lib/fields';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

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
    const { classes } = this.props;

    return (
      <div className='popup container'>
        <div className='popup--content'>
          {loading ? (
            <div>Loading</div>
          ) : (
            <Fragment>
              <h6 className='popup--content__heading'>
                Toggle to disable X
              </h6>
              <form className='popup--content__form'>
                <List className={classes.root}>
                  <ListItem>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                    <ListItemText primary='Test' secondary='Lorem ipsum dolor sit amet' />
                  </ListItem>
                  <li>
                    <Divider variant='inset' />
                  </li>
                </List>
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
                <div className='popup--content__actions'>
                  <p className='alert alert-danger' role='alert'>
                    Refresh to see changes
                  </p>
                  <Button variant='contained' color='primary' onClick={() => this.reloadPage()}>Refresh now</Button>
                </div>
              }
            </Fragment>
          )}
        </div>
      </div>
    );
  }
};

export default withStyles(styles)(Home);
