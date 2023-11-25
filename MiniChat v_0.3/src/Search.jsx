import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Search() {
    let navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/text/' + text);
    };
    const [text, setText] = useState('');

    return (
        <div>
            <h1>Find Articles</h1>
            <input
                type="text"
                class="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></input>
            <button onClick={handleButtonClick} class="button">Go!</button>
        </div>
    )
}

export default Search