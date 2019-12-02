import React, { Fragment } from 'react';

import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RefreshIcon from '@material-ui/icons/Refresh';
import LinkIcon from '@material-ui/icons/Link';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import './style.scss';
import fields from '../../lib/fields';

const linkedFields = ['voteButtons', 'commentLink'];

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: null,
      changed: false,
    };

    chrome.storage.sync.get(fields.map(field => field.id), storage => {
      const defaults = fields.reduce((acc, val, index) =>
        index !== 1
          ? Object.assign(acc, { [val.id]: val.defaultValue })
          : Object.assign({ [acc.id]: acc.defaultValue }, { [val.id]: val.defaultValue }),
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

    if (!id || id.length < 1 || !fields.find(field => field.id === id)) {
      return false;
    }

    const { data: currentData } = this.state;
    const key = id;
    const value = !!currentData[id];
    const obj = { [key]: !value };
    const newData = {
      ...currentData,
      ...obj,
    };

    if (key === 'voteButtons' && newData[key] === true) {
      newData.postScore = true;
    }

    if (key === 'postScore' && newData[key] === false) {
      newData.voteButtons = false;
    }

    if (key === 'commentLink' && newData[key] === true) {
      newData.commentCount = true;
    }

    if (key === 'commentCount' && newData[key] === false) {
      newData.commentLink = false;
    }

    chrome.storage.sync.set({
      ...newData,
      saved: true,
    });

    this.setState({
      data: newData,
      changed: changed || newData[id] !== currentData[id],
    });
  };

  reloadPage = () => {
    chrome.tabs.reload();
    window.close();
  };

  render() {
    const { loading, data, changed } = this.state;
    const { classes } = this.props;

    return (
      <div className="popup container">
        <div className="popup--content">
          {loading ? (
            <div>Loading</div>
          ) : (
            <Fragment>
              <FormGroup>
                {fields.map(field => {
                  const { id, label, defaultValue } = field;
                  const storageValue = data[id];

                  return (
                    <div className="toggle-wrapper">
                      <FormControlLabel
                        key={id}
                        id={id}
                        role={undefined}
                        dense
                        button
                        className="toggle-label"
                        control={
                          <Switch
                            classname="option-toggle"
                            checked={storageValue}
                            onChange={() => this.toggleOption(id)}
                            disableRipple
                            color="primary"
                          />
                        }
                        label={label}
                        labelPlacement="start"
                      />
                      {linkedFields.includes(id) && <LinkIcon className="link-icon" />}
                    </div>
                  );
                })}
              </FormGroup>
              {changed && (
                <div className="popup--content__actions">
                  <Typography className="refresh-text" variant="subtitle2">
                    The page must be refreshed for these changes to take effect
                  </Typography>
                  <Button
                    className="refresh-button"
                    variant="contained"
                    color="secondary"
                    onClick={() => this.reloadPage()}
                  >
                    <RefreshIcon className="refresh-icon" />
                    Refresh now
                  </Button>
                </div>
              )}
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
