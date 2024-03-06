import React from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardHeader,
    Divider,
    LinearProgress,
    Typography
} from "@mui/material";
import {SubmitButton} from "@/components/buttons/submit-button";
import {useTranslations} from "next-intl";
import {useGetChildrenByMotherIdQuery} from "@/backend-api/children-api";
import ChildrenList from "@/components/children/ChildrenList";
import ChildItem from "@/components/children/ChildItem";
import Loading from "@/components/loading";
import {useRouter} from "next/navigation";

export interface ChildContainerProps {
    motherId: number
}
const ChildrenContainer = ({motherId}:ChildContainerProps) => {
    const {data: children, error, isLoading} = useGetChildrenByMotherIdQuery(motherId)
    const router = useRouter()
    const t = useTranslations()
    return (
        <Card sx={{mt: 3}}>
            <CardHeader title={t('Children')}/>
            <Divider/>
            {children && <ChildrenList motherChildren={children}/>}
            {isLoading && <LinearProgress variant="indeterminate" />}
            {error && <>Ошибка</>}
            {children &&
                <CardContent>
                    <ButtonGroup variant='contained' sx={{mt: 3}}>
                        <Button color='success' onClick={() => {
                            router.push(`/children/create/${motherId}`)
                        }}>
                            {t('Add Child')}
                        </Button>
                    </ButtonGroup>
            </CardContent>}
        </Card>
    );
};

export default ChildrenContainer;