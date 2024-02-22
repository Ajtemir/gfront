'use client'

import React from 'react';
import {CreateEntity, Entity} from "@/types/entity";
import {useTranslations} from "next-intl";
import {useRouter, useSearchParams} from "next/navigation";
import {useCreateEntity} from "@/backend-api/entity-api";
import {number, object, Schema, string} from "yup";
import {useFormik} from "formik";
import {CreateEntitySchema, EntitySchema} from "@/schemas";
import toast from "react-hot-toast";
import {formatYupError} from "@/utils/format-yup-error";
import {Box, ButtonGroup, Card, CardContent, Input, MenuItem, TextField} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {FormikTextField} from "@/components/formik-text-field";
import {nameof} from "@/utils/nameof";
import {UpdateCitizenDetails} from "@/types/citizen";
import {Genders} from "@/types/gender";
import {
    useGetRewardsByCandidateIdQuery,
    useGetRewardsByCandidateTypeIdQuery,
    useRewardsCandidateId
} from "@/backend-api/reward-api";
import {SubmitButton} from "@/components/buttons/submit-button";
import {translateYupError} from "@/components/formik-interface";
import {Reward} from "@/types/reward";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {fetchWithCredentials} from "@/backend-api/fetch-with-credentials";
import {backendUrl} from "@/env-variables";

interface CreateApplication {
    rewardId: number,
    candidateId: number,
    SpecialAchievements: string,
}

interface CreateApplicationResponse {
    id: number
}

const CreateApplicationResponseSchema: Schema<CreateApplicationResponse> = object({
    id: number().required().label('Id'),

})

const initialValues: CreateApplication = {
    rewardId: 0,
    candidateId: 0,
    SpecialAchievements: '',
}

const CreateApplicationSchema: Schema<CreateApplication> = object({
    rewardId: number().required().min(1).label('rewardId'),
    candidateId: number().required().min(1).label('Candidate identifier'),
    SpecialAchievements: string().required().min(2).label('Special Achievements'),
})

const applicationsKeys = {
    all: ['applications'] as const,
    detail: (id: number) => [...applicationsKeys.all, id.toString()] as const,
}

const useCreateApplication = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: CreateApplication) =>
            fetchWithCredentials(`${backendUrl}/applications/create`, {
                method: 'POST',
                body: JSON.stringify(request),
            })
                .then(response => response.json())
                .then(json => CreateApplicationResponseSchema.validate(json))
                .then(data => data as CreateApplicationResponse),
        onSuccess: (entity, _) =>
            queryClient.setQueryData(applicationsKeys.detail(entity.id), entity),

    })
}

const CreateApplicationForm = () => {
    const t = useTranslations()
    const router = useRouter()
    const searchParams = useSearchParams()
    const candidateId = parseInt(searchParams.get('candidateId')!)
    const {data, error, isLoading} = useGetRewardsByCandidateIdQuery(candidateId)
    if(candidateId) {
        initialValues.candidateId = candidateId;
    }
    const useCreate = useCreateApplication()


    const formik= useFormik({
        initialValues: initialValues,
        validationSchema: CreateApplicationSchema,
        onSubmit: async (values) => {
            const createApplication = async () => {
                const request = CreateApplicationSchema.cast(values) as CreateApplication;
                const response = await useCreate.mutateAsync(request)
                router.push(`/applications/${response.id}/edit`)
            }

            await toast.promise(createApplication(), {
                loading: t('Pending'),
                success: t('Success'),
                error: (err) => {
                    console.log(err)
                    console.error(formatYupError(err))
                    return  err.toString()
                    return t('Failed')
                },
            },{
                error:{
                    duration: 7000,
                },
            })
        }
    })

    return (
        <Box component='form' onSubmit={formik.handleSubmit}
        >
            <Card>
                <CardContent>
                    <Grid container spacing={3}>

                        <Grid md={6} xs={12}>
                            <FormikTextField
                                name={nameof<CreateApplication>('candidateId')}
                                label='Candidate identifier'
                                value={candidateId}
                                fullWidth={true}
                                disabled={true}
                                labelRequired
                                formik={formik}
                            />
                        </Grid>

                        <Grid md={6} xs={12}>
                            {data && <FormikTextField
                                name={nameof<CreateApplication>('rewardId')}
                                label='Reward'
                                fullWidth={true}
                                select
                                required={true}
                                formik={formik}
                                labelRequired
                                defaultValue={0}
                            >

                                <MenuItem value={0}>
                                    {t("Not selected")}
                                </MenuItem>
                                {data.map(reward => (
                                    <MenuItem key={reward.id} value={reward.id}>
                                        {reward.nameRu}
                                    </MenuItem>
                                ))}
                            </FormikTextField>}
                        </Grid>

                        <Grid md={6} xs={12}>
                            <FormikTextField
                                formik={formik}
                                name={nameof<CreateApplication>('SpecialAchievements')}
                                label='Special Achievements'
                                fullWidth={true}
                                multiline={true}
                                rows={10}
                                labelRequired
                            />
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>

            <Card sx={{mt: 3}}>
                <CardContent>
                    <ButtonGroup variant='contained'>
                        <SubmitButton>
                            {t('Submit')}
                        </SubmitButton>
                    </ButtonGroup>
                </CardContent>
            </Card>

        </Box>
    );
};

export default CreateApplicationForm;