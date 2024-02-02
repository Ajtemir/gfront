import React from 'react';

const EditApplicationPage = ({params}: {
    params: {
        applicationId: number
    }
}) => {
    return (
        <div>
            <h1>{params.applicationId}</h1>
        </div>
    );
};



export default EditApplicationPage;