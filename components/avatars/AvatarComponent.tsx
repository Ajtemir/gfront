import {useGetAvatarQuery} from "@/backend-api/member-api";
import {RowSkeletonGroup} from "@/components/RowSkeleton";
import React from "react";
import {AvatarContainer} from "@/components/avatars/AvatarContainer";

const AvatarComponent = ({avatarId}:{avatarId:number}) => {
    const {data, isLoading} = useGetAvatarQuery(avatarId)
    return (
        <>
            {data && <AvatarContainer avatar={data}/>}
            {isLoading && <RowSkeletonGroup/>}
        </>
    );
};

export default AvatarComponent