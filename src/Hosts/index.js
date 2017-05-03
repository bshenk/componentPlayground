import React, { Component } from 'react'
import './style.css'

class Hosts extends Component {
  render () {
    return (
      <section className='hosts-container'>
        {this.props.hosts ? this.props.hosts.map(host => {
          return (
            <div className='host' key={host.host}>
              <div className='host-title'>
                <h5>HOST ID</h5>
                {host.host}
              </div>
              <div className='host-nodes-count'>
                <h5>NODES COUNT</h5>
                {host.nodesCount}
              </div>
              <div className='host-time-stamp'>
                <h5>TIMESTAMP</h5>
                {host.timeStamp}
              </div>
            </div>
          )
        }) : <h2>No hosts exist. Check WebSocket connection.</h2>}
      </section>
    )
  }
}
export default Hosts
