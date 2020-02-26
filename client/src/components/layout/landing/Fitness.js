import React from 'react'

const Fitness = () => {

    let skillSet = [
        {
            name: "Weight loss",
            info: "Lorem i elit. Deleniti quis",
            moreInfo: "more info"
        },
        {
            name: "Core Training",
            info: "Lorem i elit. Deleniti quis",
            moreInfo: "more info"
        },
        {
            name: "pre-/post-natal training",
            info: "Lorem i elit. Deleniti quis",
            moreInfo: "more info"
        },
        {
            name: "endurance training",
            info: "Lorem i elit. Deleniti quis",
            moreInfo: "more info"
        },
        {
            name: "functional training",
            info: "Lorem i elit. Deleniti quis",
            moreInfo: "more info"
        },
        {
            name: " strength and conditioning",
            info: "Lorem i elit. Deleniti quis",
            moreInfo: "more info"
        },
        {
            name: " myofascial release & muscle activation",
            info: "Lorem i elit. Deleniti quis",
            moreInfo: "more info"
        }, {
            name: "nutritional advice",
            info: "Lorem i elit. Deleniti quis",
            moreInfo: "more info"
        }
    ]

    let renderSkillTiles = () => {
        return skillSet.map((skillSetItem, index) => {
            return (
                <div className='skill' key={index}>
                    <h1>{skillSetItem.name}</h1>
                    {/* <p>{skillSetItem.info}</p> */}
                    <p className="more-info btn">{skillSetItem.moreInfo}</p>
                </div>
            )
        })
    }

    return (
        <div className="fitness-container">
            <div className="fitness-heading">
                <h2 className="large">What you can expect</h2>
                {/* <p className="lead">Live Your Best Life</p> */}
            </div>
            <div className="fitness-skills">
                {renderSkillTiles()}
            </div>
        </div>
    )
}

export default Fitness
