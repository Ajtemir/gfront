import React from 'react';
import {Document} from '@/types/document';
import DocumentItem from './DocumentItem';
interface DocumentListProps {
    documents: Document[]
}
const DocumentList = ({documents}:DocumentListProps) => {
    return <> {documents.map((document) => <DocumentItem key={document.id} document={document}/>)}</>
};

export default DocumentList;