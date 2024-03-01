import React, { useState } from 'react';

function Repeat({Number, setNumber}){
    return (
        <div>
            <input value={Number} onChange={(e) => setNumber(e.target.value)} />
        </div>
    );
}

export default Repeat;

