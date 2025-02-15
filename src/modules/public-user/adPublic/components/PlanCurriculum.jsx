import PlanImage from '../../../../assets/plan.svg'

const PlanCurriculum = () => {
    return (
        <div className="w-[100%] h-[100%] flex items-center justify-center">
            <div className="left w-[50%] h-[100%] flex items-center justify-center">
                <p>
                    You start with your passion and knowledge. Then choose a promising topic with the help of our Marketplace Insights tool.<br/>
                    The way that you teach — what you bring to it — is up to you.
                </p>
                <h3>How we help you</h3>
                <p>
                    We offer plenty of resources on how to create your first course. And, our instructor dashboard and curriculum pages help keep you organized.
                </p>
            </div>
            <div className="right w-[50%] h-[100%] flex items-center justify-center">
                <img src={PlanImage} alt="Plan" className='w-[100%]' />
            </div>
        </div>
    )
}

export default PlanCurriculum
