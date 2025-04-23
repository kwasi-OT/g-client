import CategoriesTab from "../components/CategoriesTab"

const SolutionsSection = () => {

    return (
        <div className="flex flex-col justify-center items-center w-full h-[130vh]">
            <div className="w-[80%] h-[95%] mx-auto flex flex-col justify-between pb-[2rem]">
                <div className="flex flex-col items-start w-[100%]">
                    <h2 className="text-[2rem]">All the skills you need in one place</h2>
                    <p className="text-[1.2rem] mt-[-1rem]">From critical skills to technical topics, GClient supports your professional development</p>
                </div>
                <div className="w-[100%] h-[80%]">
                    <CategoriesTab />
                </div>
            </div>
        </div>
    )
}

export default SolutionsSection
