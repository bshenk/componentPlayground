import PropTypes from 'prop-types'

const Tab = props => props.children

Tab.propTypes = {
  title: PropTypes.string.isRequired
}

export default Tab
