'use client'
import React from 'react';
import {useTranslations} from "next-intl";
import {useGetMemberByIdQuery} from "@/backend-api/member-api";
import {RowSkeleton, RowSkeletonGroup} from "@/components/RowSkeleton";
import {useGetCandidatesByPersonIdQuery} from "@/backend-api/candidate-api";
import MemberCandidatesTable from "@/components/candidates/MemberCandidatesTable";
import {Box, Button, ButtonGroup, Container, Icon, Typography} from "@mui/material";
import {ProgressLink as Link} from "@/components/progress-link";
import {Plus as PlusIcon} from "@/icons/plus";
import UpdatePerson from "@/components/members/UpdatePerson";
import AvatarComponent from "@/components/avatars/AvatarComponent";
interface UpdateMemberProps {
    params:{
        memberId:number
    }
}
const UpdateMember = ({params}: UpdateMemberProps) => {
    const t = useTranslations()
    const {data:person, isLoading:isLoadingPerson, error:errorPerson} = useGetMemberByIdQuery(params.memberId)
    const {data:candidates, isLoading: isLoadingCandidates, error:errorCandidates} = useGetCandidatesByPersonIdQuery(params.memberId)
    return (
        <Container maxWidth='md'>
            <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                flexWrap='wrap'
                mb={3}
            >
                <Typography variant='h4'>
                    {t('Person')}
                </Typography>

                <Link href='/candidates/create'>
                    <ButtonGroup variant='contained'>
                        <Button startIcon={<PlusIcon fontSize='small'/>}>
                            {t('Сreate a candidate')}
                        </Button>
                    </ButtonGroup>
                </Link>
            </Box>

            {isLoadingPerson && <RowSkeletonGroup/>}
            {person && <UpdatePerson person={person}/>}
            {isLoadingCandidates && <RowSkeletonGroup/>}
            {candidates && <MemberCandidatesTable candidates={candidates}/>}
            {person?.avatarId && <AvatarComponent avatarId={person.avatarId}/>}
        </Container>
    );
};

export default UpdateMember;