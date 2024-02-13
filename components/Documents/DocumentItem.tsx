import React from 'react';
import {Card} from "@mui/material";

const DocumentItem: React.FC<DocumentProps> = ({
                                                   id,
                                                   name,
                                                   documentTypeName,
                                                   isRequired
                                               }) => {

    return (
        <Card>

        </Card>
    );
};

interface DocumentProps {
    id: number
    name: string | undefined
    documentTypeName: string
    isRequired: boolean
}

export default DocumentItem;