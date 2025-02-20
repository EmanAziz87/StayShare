import React, { useState, useEffect } from 'react';

const App = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/test')
            .then((response) => response.json())
            .then((data) => setData(data.message));
    }, []);

    return (
        <div>
            <h1>{data || 'Loading...'}</h1>
        </div>
    );
};

export default App;
