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
import {
    useGetChildrenByMotherIdQuery,
    useLazyGetChildrenByMotherIdFromZagsThroughPinQuery
} from "@/backend-api/children-api";
import ChildrenList from "@/components/children/ChildrenList";
import ChildItem from "@/components/children/ChildItem";
import Loading from "@/components/loading";
import {useRouter} from "next/navigation";
import {ArrowLeft as ArrowLeftIcon} from "@/icons/arrow-left";
import toast from "react-hot-toast";

export interface ChildContainerProps {
    motherId: number
}
const ChildrenContainer = ({motherId}:ChildContainerProps) => {
    const {data: children, error, isLoading,refetch, isFetching} = useGetChildrenByMotherIdQuery(motherId)
    const [getChildren] = useLazyGetChildrenByMotherIdFromZagsThroughPinQuery()
    const router = useRouter()
    const t = useTranslations()
    return (
        <Card sx={{mt: 3}}>
            <CardHeader
                action={
                    <ButtonGroup variant='contained'>
                        <Button startIcon={<ArrowLeftIcon fontSize='small'/>} onClick={async () => {
                            await toast.promise(getChildren(motherId).unwrap(), {
                                loading: 'Loading',
                                success: 'Children added',
                                error: 'Error'
                            })
                            refetch()
                        }}>
                            {isFetching ? t('Loading') : t('Get chidren from Zags')}
                        </Button>
                    </ButtonGroup>
                }
                title={t('Children')}
            />
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