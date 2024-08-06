import React, { useEffect, useRef } from 'react';

export default function StatefulTextBuffer({state, setState}) {
    const inputRef = useRef(null);


    const changeWrapper = (e) => {
        if (typeof setState !== "function") {
            console.log(e.target.value) 
        } else {
            setState(e);
        }
    };

    useEffect(() => {
    const input = inputRef.current;
    input.focus();

    const handleBlur = () => {
        setTimeout(() => input.focus(), 0);
    };

    input.addEventListener('blur', handleBlur);

    return () => {
        input.removeEventListener('blur', handleBlur);
    };
    }, []);

    return (
        <input
            type="text"
            className="hidden-input"
            ref={inputRef}
            style={{ height: 0, width: 0, overflow: 'hidden', padding: 0 }}
            value={state}
            onChange={changeWrapper}
        />
    );
};
