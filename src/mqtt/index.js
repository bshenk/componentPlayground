import { Component } from 'react'
import PropTypes from 'prop-types'
import mqtt from 'mqtt'

// TODO: set up reconnecting

class ReactMQTT extends Component {
  constructor () {
    super()

    this.state = {
      client: null
    }
  }
  componentWillMount () {
    if (this.props.connected) this.setupClient(this.props.url)
  }

  componentWillUpdate (nextProps, nextState) {
    const willBeConnected = !this.props.connected && nextProps.connected
    const willBeDisconnected = this.props.connected && !nextProps.connected
    const urlChanged = this.props.url !== nextProps.url

    if (willBeConnected) this.setupClient(nextProps.url)
    if (willBeDisconnected) this.closeClient()
    if (urlChanged) this.setupClient(nextProps.url)
  }

  componentWillUnmount () {
    this.closeClient()
  }

  shouldComponentUpdate (nextProps) {
    const connectionChanged = this.props.connected !== nextProps.connected
    const urlChanged = this.props.url !== nextProps.url

    if (connectionChanged || urlChanged) {
      return true
    } else {
      return false
    }
  }

  render () {
    return null
  }

  setupClient (connectUrl) {
    // if client exists, end connection
    this.closeClient()

    // connect client to new server
    let client = mqtt.connect(`${connectUrl}`)

    client.on('connect', () => {
      this.props.onConnect(`Connected to MQTT server: ${connectUrl}.`)
    })

    client.on('message', (topic, message, packet) => {
      this.props.onMessage(topic, message, packet)
    })

    client.on('error', (error) => {
      this.props.onError(error)
    })

    client.on('close', () => {
      this.props.onClose(`Disconnected from MQTT server: ${connectUrl}.`)

      // if reconnect is false, the client will be closed
      this.closeClient()
    })

    this.setState({ client })
  }

  closeClient (force = true) {
    // force: passing it to true will close the client right away
    // without waiting for the in-flight messages to be acked.
    if (this.state.client) {
      this.state.client.end(force, () => {
        this.setState({ client: null })
      })
    }
  }
}

ReactMQTT.propTypes = {
  url: PropTypes.string.isRequired,
  connected: PropTypes.bool.isRequired,
  onConnect: PropTypes.func.isRequired,
  onMessage: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

export default ReactMQTT
