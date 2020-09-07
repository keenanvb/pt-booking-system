import React from 'react'

const Fitness = () => {

    let skillSet = [
        {
            name: "Weight Loss",
            info: "Lorem i elit. Deleniti quis",
            moreInfo: "more info"
        },
        {
            name: "Core Training",
            info: "Lorem i elit. Deleniti quis",
            moreInfo: "more info"
        },
        {
            name: "Pre-/Post-natal Training",
            info: "Lorem i elit. Deleniti quis",
            moreInfo: "more info"
        },
        {
            name: "Endurance Training",
            info: "Lorem i elit. Deleniti quis",
            moreInfo: "more info"
        },
        {
            name: "Functional Training",
            info: "Lorem i elit. Deleniti quis",
            moreInfo: "more info"
        },
        {
            name: "Strength & Conditioning",
            info: "Lorem i elit. Deleniti quis",
            moreInfo: "more info"
        },
        {
            name: "Myofascial Release & Muscle Activation",
            info: "Lorem i elit. Deleniti quis",
            moreInfo: "more info"
        }, {
            name: "Nutritional Advice",
            info: "Lorem i elit. Deleniti quis",
            moreInfo: "more info"
        }
    ]

    let renderSkillTiles = () => {
        return skillSet.map((skillSetItem, index) => {
            return (
                <div className='skill' key={index}>
                    <h2>{skillSetItem.name.toUpperCase()}</h2>
                    {/* <p>{skillSetItem.info}</p> */}
                    <p className="more-info btn">{skillSetItem.moreInfo}</p>
                </div>
            )
        })
    }

    return (
        <div className="fitness-container">
            <div className="fitness-heading">
                <h2 className="large landing-heading">What you can expect</h2>
                {/* <p className="lead">Live Your Best Life</p> */}
            </div>
            <div className="fitness-skills">
                {renderSkillTiles()}
            </div>
            <div className="line hide-sm"></div>
        </div>
    )
}

export default Fitness
