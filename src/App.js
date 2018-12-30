import React from 'react';

import { removeElements } from './reddit';

import './styles/App.scss';
import Popup from './components/Popup';

export const fields = [
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
  },
];

const configuration = [
  ...fields,
  {
    id: 'tabUpdated',
    label: 'Tab updated',
    defaultValue: false,
  }
]

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      config: null,
      changed: false,
    };

    chrome.storage.sync.get(configuration.map(field => field.id), storage => {
      const defaults = configuration.reduce((acc, val, index) => index !== 1
        ? Object.assign(acc, { [val.id]: val.defaultValue })
        : Object.assign({ [acc.id]: acc.defaultValue }, { [val.id]: val.defaultValue })
      );
      const config = {
        ...defaults,
        ...storage,
        userVisited: true,
      };
      console.log('App init config: ', config);
      // this.beginRemoving(config);
      this.setState({
        loading: false,
        config,
      });
    });
  }
  // 
  // beginRemoving = config => {
  //   // window.addEventListener('popstate', () => removeElements(config));
  //   // window.addEventListener('onbeforeunload' () => {
  //   //   chrome.storage.sync.set({ userLeft: true });
  //   // });
  //   chrome.tabs.onActivated.addListener(function(info) {
  //     console.log('info: ', info);
  //     console.log('Tab updated :0');
  //     chrome.storage.sync.set({ tabUpdated: true });
  //   })
  //   const keys = Object.keys(chrome.tabs);
  //   console.log('chrome.tabs: ', chrome.tabs);
  //
  //   (function start() {
  //     removeElements(config);
  //     setTimeout(start, 100);
  //   })();
  // }

  render() {
    const { loading, config } = this.state;

    return (
      <div className='app'>
        {loading
          ? <div className='app-loading'>Loading...</div>
          : <div className='app-content'>
              <Popup config={config} onConfigUpdate={this.updateConfig} />
            </div>
        }
      </div>
    );
  }
};

export default App;
