import React, { useState } from 'react';

function Repeat(){
    const [Number, setNumber] = useState(50);
    return (
        <div>
            <input value={Number} onChange={(e) => setNumber(e.target.value)} />
            <p>{Number}</p>
        </div>
    );
}

export default Repeat;

