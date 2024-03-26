'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import {TabContext, TabList, TabPanel} from "@material-ui/lab";
import {Container} from "@mui/material";
import {useTranslations} from "next-intl";
import CreatePerson from "@/components/members/CreatePerson";
import CreateEntity from "@/components/members/CreateEntity";


export default function LabTabs() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };

    const t = useTranslations()

    return (
        <Container maxWidth={'md'}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label={t("Crete person")} value="1" />
                        <Tab label={t("Create entity")} value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <CreatePerson/>
                </TabPanel>
                <TabPanel value="2">
                    <CreateEntity/>
                </TabPanel>
            </TabContext>
        </Container>
    );


}