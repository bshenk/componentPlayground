import { Component } from 'react'
import PropTypes from 'prop-types'
import mqtt from 'mqtt'

// TODO: set up reconnecting

class ReactMQTT extends Component {
  constructor (props) {
    super(props)

    this.state = {
      client: null,
      subscribedTo: []
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

  setupClient (connectUrl, callback = null) {
    // if client exists, end connection
    this.closeClient()

    // connect client to new server
    let client = mqtt.connect(`${connectUrl}`)

    client.on('connect', () => {
      this.props.onConnect(`[MQTT] Connected to server: ${connectUrl}.`)

      this.setupSubscriptions(client)
    })

    client.on('message', (topic, message, packet) => {
      this.props.onMessage(topic, message, packet)
    })

    client.on('error', (error) => {
      this.props.onError(error)
    })

    this.setState({ client })

    client.on('close', () => {
      this.props.onClose(`[MQTT] Disconnected from server: ${connectUrl}.`)

      // if reconnect is false, the client will be closed
      this.closeClient()
    })
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

  setupSubscriptions (client) {
    client.subscribe(this.props.topics, null, (err, topics) => {
      if(err) return err

      let subscribedTopics = []

      topics.forEach(topic => {
        subscribedTopics = [
          ...subscribedTopics,
          topic.topic
        ]

        console.log(`[MQTT] Subscribed to topic: ${topic.topic}`)
      })

      this.setState({ subscribedTo: subscribedTopics })
    })
  }
}

ReactMQTT.propTypes = {
  url: PropTypes.string.isRequired,
  connected: PropTypes.bool.isRequired,
  onConnect: PropTypes.func.isRequired,
  onMessage: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  topics: PropTypes.array.isRequired
}

export default ReactMQTT
