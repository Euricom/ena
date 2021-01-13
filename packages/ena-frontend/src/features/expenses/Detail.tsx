import React from 'react';
import { useParams } from 'react-router-dom';

interface DetailParams {
    id: string;
};

function Detail() {
    const { id } = useParams<DetailParams>();

    return (
        <h1>Expenses Detail {id} Component</h1>
    );

}

export default Detail;
