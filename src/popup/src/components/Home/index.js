import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import RefreshIcon from '@material-ui/icons/Refresh';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

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

  toggleOption = id => {
    const { changed } = this.state;

    if (
      !id
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
              <List dense>
                {fields.map(field => {
                  const { id, label, defaultValue } = field;
                  const storageValue = data[id];

                  return (
                    <ListItem key={id} id={id} role={undefined} dense button onClick={() => this.toggleOption(id)}>
                      <ListItemText primary={label} />
                      <Switch
                        checked={storageValue}
                        disableRipple
                        color='primary'
                      />
                    </ListItem>
                  );
                })}
              </List>
              {changed &&
                <div className='popup--content__actions'>
                  <Typography component='p' style={{ marginBottom: '1rem' }}>
                    You'll need to refresh the page to see these changes
                  </Typography>
                  <Button variant='contained' color='secondary' onClick={() => this.reloadPage()} style={{ width: '100%' }}>
                    <RefreshIcon />
                    Refresh now
                  </Button>
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
