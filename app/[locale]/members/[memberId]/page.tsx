import React from 'react';

interface UpdateMemberProps {
    params: {
        memberId: number
    }
}

const MemberDetail = ({params}: UpdateMemberProps) => {
    return (
        <div>
            {params.memberId}
        </div>
    );
};

export default MemberDetail;