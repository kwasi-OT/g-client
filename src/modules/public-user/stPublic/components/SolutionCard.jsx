import PropTypes from 'prop-types'

const SolutionCard = ({logo, title, description, price}) => {
    return (
        <div className="flex flex-col items-start justify-center gap-[1rem] box-shadow: 0px 16px 32px 0px #00000026;
">
            {logo &&<img src={logo} alt="Software Development Logo" className="w-[5rem] h-[5rem] object-contain" />}
            <h3>{title}</h3>
            <p>{description}</p>
            <p>Price: {price}</p>
        </div>
    )
}


SolutionCard.propTypes = {
    logo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired
}

export default SolutionCard
