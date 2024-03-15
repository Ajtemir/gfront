import React from 'react';
interface UpdateMemberProps {
    params:{
        memberId:number
    }
}
const UpdateMember = ({params}: UpdateMemberProps) => {
    return (
        <div>
            {params.memberId}
        </div>
    );
};

export default UpdateMember;