import React from 'react';
import { ShimmerTable } from 'react-shimmer-effects';

const Loader = ({col}) => {

    return (
        <div>
            <ShimmerTable row={5} col={col}  />
        </div>
    );
};

export default Loader;