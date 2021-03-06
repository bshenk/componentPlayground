import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

// Custom Components
import ReactMQTT from './mqtt/'
import { TabNav, Tab } from './TabNav/'
import Hosts from './Hosts'

class App extends Component {
  constructor () {
    super()

    this.state = {
      url: 'ws://localhost:8080',
      connected: true,
      hosts: {}
    }
  }

  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome to React</h2>
        </div>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <input type='text' value={this.state.url} onChange={e => this.handleInputChange(e, 'url')} />
        <input type='checkbox' checked={this.state.connected} onChange={e => this.handleInputChange(e, 'connected')} />

        <ReactMQTT
          url={this.state.url}
          connected={this.state.connected}
          topics={['hostHeartbeat', 'hostAnnouncement', 'hostGoodbye']}
          onConnect={msg => this.handleConnect(msg)}
          onClose={msg => console.log(msg)}
          onMessage={(topic, msg, packet) => this.handleMessage(topic, msg, packet)}
          onError={err => console.error(err)}
        />

        <div className='tab' style={{width: '50%', margin: '0 auto'}}>
          <TabNav activeColor='#E65343'>
            <Tab title='Hosts'>
              <Hosts
                hosts={this.state.hosts}
                showIcon
                primaryColor='#E65343'
                grid='1.5fr .5fr .5fr .5fr'
              />
            </Tab>

            <Tab title='Other'>
              <p>Other</p>
            </Tab>

            <Tab title='Testing'>
              <p>Testing 1234</p>
            </Tab>
          </TabNav>
        </div>
      </div>
    )
  }

  handleInputChange (e, key) {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value

    this.setState({ [key]: value })
  }

  handleConnect (msg) {
    console.log(msg)
  }

  handleMessage (topic, msg, packet) {
    const json = JSON.parse(msg)

    // console.log(topic, json)

    if (topic === 'hostHeartbeat') this.handleHeartbeat(json)
    if (topic === 'hostGoodbye') this.handleGoodbye(json)
  }

  handleHeartbeat (beat) {
    let hosts = {...this.state.hosts}

    hosts[beat.host] = beat

    this.setState({ hosts })
  }

  handleGoodbye (beat) {
    let hosts = {...this.state.hosts}

    delete hosts[beat.host]

    this.setState({ hosts })
  }
}

export default App
