'use client'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import React from 'react';
import {LoaderIcon} from "react-hot-toast";
import {Document} from "@/types/document";

interface PdfViewerProps{
    url?:string
    document?: Document
}
const PdfViewer = ({url = 'https://localhost:44350/documents/1', document}:PdfViewerProps) => {
    if(!document)return null;
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer
            fileUrl= {`https://localhost:44350/documents/${document?.id}`}
            plugins={[
                defaultLayoutPluginInstance,
            ]}
        />
    </Worker>
};

export default PdfViewer;