import React, { Component } from 'react'
import './style.css'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

class Hosts extends Component {
  constructor () {
    super()

    this.state = {
      hovered: ''
    }
  }
  render () {
    return (
      <section className='hosts-container'>
        <CSSTransitionGroup
          transitionName='host-transition'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          transitionAppear
          transitionAppearTimeout={500}
        >
          {this.renderHosts()}
        </CSSTransitionGroup>
      </section>
    )
  }

  renderHosts () {
    const hostKeys = Object.keys(this.props.hosts)
    let hosts = []

    if (hostKeys.length > 0) {
      hostKeys.forEach((key, index) => {
        const host = this.props.hosts[key]
        const firstRow = index === 0
        const onlyOneHost = hostKeys.length === 1
        const hovered = key === this.state.hovered

        let ele = (
          <div
            key={key}
            className={onlyOneHost ? 'row first' : 'row'}
            style={{ gridTemplateColumns: this.props.grid }}
            onMouseEnter={() => this.setHover(key)}
            onMouseLeave={() => this.setHover(key)}
          >
            <div className='column'>
              {firstRow ? <div className='column-header'><h5>Host</h5></div> : null}

              <div className={`column-content ${hovered ? 'hovered' : ''}`}>
                {this.props.showIcon ? this.renderIcon() : null}
                <div className='host-name'>
                  {host.host}
                  <span className='sub'>Last Updated: {host.timeStamp}</span>
                </div>
              </div>

            </div>
            <div className='column'>
              {firstRow ? <div className='column-header'><h5>Nodes</h5></div> : null}

              <div className={`column-content ${hovered ? 'hovered' : ''}`}>
                {host.nodesCount}
              </div>

            </div>
            <div className='column'>
              {firstRow ? <div className='column-header'><h5>Cycles</h5></div> : null}
              <div className={`column-content ${hovered ? 'hovered' : ''}`}>
                <div>
                  {host.cycles}
                  <span className='sub'>Speed: {parseFloat(host.averageCycleTime).toFixed(2)} m/s</span>
                </div>
              </div>
            </div>

            <div className='column'>
              {firstRow ? <div className='column-header'><h5>Actions</h5></div> : null}
              <div className={`column-content ${hovered ? 'hovered' : ''}`}>
                {this.renderActions()}
              </div>
            </div>
          </div>
        )

        hosts.push(ele)
      })
    } else {
      hosts = <h2>There are no hosts to view.</h2>
    }

    return hosts
  }

  renderIcon () {
    return (
      <svg viewBox='0 0 82 82' version='1.1' xmlns='http://www.w3.org/2000/svg'>
        <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
          <g id='Group' transform='translate(1.000000, 1.000000)' stroke='#4D4D4D' strokeWidth='2'>
            <g id='1493935065_Server' transform='translate(22.500000, 17.500000)' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M34.2680023,42.4066529 C34.2680023,43.3490229 33.4969723,44.120053 32.5546022,44.120053 L1.71340012,44.120053 C0.771030052,44.120053 0,43.3490229 0,42.4066529 L0,2.14175014 C0,1.19938008 0.771030052,0.428350029 1.71340012,0.428350029 L32.5546022,0.428350029 C33.4969723,0.428350029 34.2680023,1.19938008 34.2680023,2.14175014 L34.2680023,42.4066529 Z' id='Shape' />
              <path d='M0,28.8707919 L33.2399622,28.8707919' id='Shape' />
              <path d='M0,14.306891 L34.2680023,14.306891' id='Shape' />
              <circle id='Oval' cx='27.8427519' cy='6.42525043' r='2.14175014' />
              <circle id='Oval' cx='27.8427519' cy='22.2742015' r='2.14175014' stroke={this.props.primaryColor} />
              <circle id='Oval' cx='27.8427519' cy='36.8381025' r='2.14175014' />
              <path d='M6.25391042,6.42525043 L21.6745115,6.42525043' id='Shape' stroke={this.props.primaryColor} />
              <path d='M6.25391042,22.7025515 L21.6745115,22.7025515' id='Shape' />
              <path d='M6.25391042,37.2664525 L21.6745115,37.2664525' id='Shape' stroke={this.props.primaryColor} />
            </g>
            <circle id='Oval-2' cx='40' cy='40' r='39.5' stroke={this.props.primaryColor} />
          </g>
        </g>
      </svg>
    )
  }

  renderActions () {
    return (
      <div className='render-actions'>
        <p style={{color: this.props.primaryColor}}>More</p>
        <svg viewBox='0 0 67 37' version='1.1' xmlns='http://www.w3.org/2000/svg'>
          <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd' strokeLinecap='square'>
            <g id='Group' transform='translate(2.984375, 2.980469)' stroke={this.props.primaryColor} strokeWidth='5'>
              <path d='M1,1 L30.3470612,30.3470612' id='Line' />
              <path d='M30.365625,1 L60,30.3449314' id='Line-Copy' transform='translate(45.182813, 15.672466) scale(-1, 1) translate(-45.182813, -15.672466) ' />
            </g>
          </g>
        </svg>

      </div>
    )
  }

  setHover (key) {
    let value = key

    if (this.state.hovered === key) {
      value = ''
    }

    this.setState({ hovered: value })
  }
}

export default Hosts
