import React from 'react';
import {ButtonGroup, Card, CardContent} from "@mui/material";
import {ImageUploader} from "@/components/image-uploader";
import {megabytesToBytes} from "@/utils/megabytes-to-bytes";
import {SubmitButton} from "@/components/buttons/submit-button";

const AvatarContainer = () => {
    const t = useTra
    return (
        <div>
            <Card sx={{mt: 3}}>
                <CardContent>
                    <ImageUploader
                        image={image}
                        preview={preview}
                        onDropAccepted={handleAccepted}
                        onDropRejected={handleRejected}
                        imageWidth={640}
                        imageHeight={400}
                        uploadIconSize={32}
                        maxSize={megabytesToBytes(imageMaxSizeMb)}
                    />
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
        </div>
    );
};

export default AvatarContainer;