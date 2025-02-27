import PropTypes from 'prop-types'

const SolutionCard = ({logo, title, description, price}) => {
    return (
        <div className={`flex flex-col items-start justify-center shadow-[0px_16px_32px_0px_#00000026] box-border max-w-[30%] h-[100%] rounded-[1rem] py-[0.5rem] px-[2rem]`}>
            {logo &&<img src={logo} alt="Software Development Logo" className="w-[5rem] h-[5rem] object-contain" />}
            <h3>{title}</h3>
            <p>{description}</p>
            <div className='flex items-center gap-[0.5rem]'>
                <p>Price:</p>
                <p className="text-[1rem] font-[600]">{price}</p>
            </div>
        </div>
    )
}

SolutionCard.propTypes = {
    logo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    className: PropTypes.string
}

export default SolutionCard
