import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.css'

import Tab from './Tab'

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

class TabNav extends Component {
  constructor (props) {
    super(props)

    this.state = {
      active: props.children[props.activeIndex].props.title,
      hovered: null
    }
  }

  render () {
    const {
      children,
      activeColor,
      hoverColor,
      color,
      linebreakColor
    } = this.props

    return (
      <section>
        <ul className='tab-nav'>
          {children.map(child => {
            const { title } = child.props
            const active = title === this.state.active
            const hovered = title === this.state.hovered
            const style = {
              borderColor: hovered ? (active ? activeColor : hoverColor) : (active ? activeColor : linebreakColor),
              color: hovered ? (active ? activeColor : hoverColor) : (active ? activeColor : color)
            }

            return (
              <li
                key={title}
                className={active ? 'active' : null}
                style={style}
                onClick={() => this.handleClick(title)}
                onMouseEnter={() => this.handleMouseEnter(title)}
                onMouseLeave={() => this.handleMouseLeave()}
              >
                <h4>{title}</h4>
              </li>
            )
          })}
        </ul>
        <div className='line-break' style={{ backgroundColor: linebreakColor }} />

        <div className='tab-content' style={{color: hoverColor}}>
          <CSSTransitionGroup
            transitionName='tab-content-child'
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
            transitionAppear={true}
            transitionAppearTimeout={500}
          >
            {children.map(child => {
              const active = child.props.title === this.state.active
              return active ? child.props.children : null
            })}
          </CSSTransitionGroup>
        </div>
      </section>
    )
  }

  handleClick (title) {
    this.setState({ active: title })
  }

  handleMouseEnter (title) {
    this.setState({ hovered: title })
  }

  handleMouseLeave () {
    this.setState({ hovered: null })
  }
}

TabNav.defaultProps = {
  activeIndex: 0,
  color: '#B0B0B0',
  hoverColor: '#626262',
  activeColor: '#0069ff',
  linebreakColor: '#F4F5F4'
}

TabNav.propTypes = {
  activeIndex: PropTypes.number,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  activeColor: PropTypes.string,
  linebreakColor: PropTypes.string
}

export { Tab, TabNav }
