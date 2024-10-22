import React, { useState } from 'react';

function Search({ checkWeather }) {
    const [search, setSearch] = useState('');

    const handleOnChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSubmit = () => {
        if (search) {
            checkWeather(search);
            setSearch('');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && search) {
            checkWeather(search);
            setSearch('');
        }
    };

    return (
        <>
            <div>
                <input
                    className='search-bar'
                    type="text"
                    placeholder='Search for products'
                    value={search}
                    onKeyDown={handleKeyDown}
                    onChange={handleOnChange}
                />
                <button onClick={handleSubmit} className='search-button'>
                    <img className='search' src="../src/assets/search.png" alt="" />
                </button>
            </div>
        </>
    );
}

export default Search;
