import PropTypes from 'prop-types'

const StackCard = ({stack, className}) => {
    return (
        <div className={className}>
            <p>{stack}</p>
        </div>
    )
}

StackCard.propTypes = {
    stack: PropTypes.string.isRequired,
    className: PropTypes.string
}

export default StackCard
