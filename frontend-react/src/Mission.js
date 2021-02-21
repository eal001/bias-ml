import React from 'react';

class Mission extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <p className='text-title'>WHY WE BUILT THIS TOOL</p>
                <br/>
                <p className='text-body' >How do you invite people to a meaningful conversation concerning politics? </p>
                <p className='text-body' >Well, you start by giving them the facts...web articles, the news, tweets, etc... so they can form their own opinions, right?</p>
                <p className='text-body' >Often, these “facts” are swayed by political bias, which stands in the way of the truth and does not let civilian voices speak for themselves.</p>
                <p className='text-body' >If you want people to be engaged with civic affairs, then you give them the power to see how their information is biased toward a particular party.</p>
                <p className='text-body' >You give people a political bias detector.</p>
                <p className='text-body' >You give people BIAS ML because people deserve to form their own opinions.</p>
            </div>
        )
    }
}

export default Mission;