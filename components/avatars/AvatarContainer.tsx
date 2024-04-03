import React from 'react';
import {Button, ButtonGroup, Card, CardContent, CardHeader, Divider} from "@mui/material";
import {ImageUploader} from "@/components/image-uploader";
import {megabytesToBytes} from "@/utils/megabytes-to-bytes";
import {SubmitButton} from "@/components/buttons/submit-button";
import {useTranslations} from "next-intl";
import {FileWithPath} from "react-dropzone";
import {fileToBase64} from "@/utils/file-to-base64";
import {nameof} from "@/utils/nameof";
import {UpdateCitizenImage} from "@/types/citizen";
import {useImageUploader} from "@/hooks/use-image-uploader";
import {useFormik} from "formik";
import {Avatar} from "@/types/avatar";
import {useGetAvatarQuery, useUpdateAvatarMutation} from "@/backend-api/member-api";
import {RowSkeletonGroup} from "@/components/RowSkeleton";
import toast from "react-hot-toast";



interface AvatarContainerProps {
    avatar: Avatar
}
export const AvatarContainer = ({avatar}:AvatarContainerProps) => {
    const [updateAvatar] = useUpdateAvatarMutation()
    const formik = useFormik({
        initialValues: avatar,
        onSubmit:async (values) => {
            await toast.promise(updateAvatar(values).unwrap(), {
                loading: 'Loading',
                success: 'Success',
                error: 'Error'
            })
        }
    })
    const t = useTranslations()
    const imageMaxSizeMb = 3
    const onImageAccepted = async (image: FileWithPath) => {
        let base64 = await fileToBase64(image) as string;
        base64 = base64.split(',')[1]

        await formik.setFieldValue(nameof<Avatar>('image'), base64)
        await formik.setFieldValue(nameof<Avatar>('imageName'), image.name);
    }
    const {image, preview, setPreview, setImage, handleAccepted, handleRejected} = useImageUploader({
        imageMaxSizeMb,
        onImageAccepted,
        previewInitial: avatar.image ? `data:image/jpeg;base64,${avatar.image}` : null
    })
    return (
        <Card sx={{mt: 3}}>
            <CardHeader title={t('Image')} />
            <Divider/>
            <CardContent>
                <form onSubmit={formik.handleSubmit}>
                    <ImageUploader
                        image={image}
                        imageName={avatar.imageName}
                        preview={preview}
                        multiple={false}
                        onDropAccepted={handleAccepted}
                        onDropRejected={handleRejected}
                        imageWidth={640}
                        imageHeight={400}
                        uploadIconSize={32}
                        maxSize={megabytesToBytes(imageMaxSizeMb)}
                    />

                    <ButtonGroup variant='contained' sx={{mt: 3}}>
                        <SubmitButton color='success'>
                            {t('Save')}
                        </SubmitButton>
                        <Button color='error' onClick={async (_) => {
                            setImage(null)
                            setPreview(null)
                            await formik.setFieldValue(nameof<Avatar>('image'), null)
                            await formik.setFieldValue(nameof<Avatar>('imageName'), null)
                        }}>
                            {t('Delete')}
                        </Button>
                    </ButtonGroup>
                </form>
            </CardContent>
        </Card>
    );
};






export default AvatarContainer;