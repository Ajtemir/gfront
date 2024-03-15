import React from "react";
import {AuthGuard} from "@/components/auth-guard";
import {MainLayout} from "@/components/main-layout";

const MembersLayout = ({children}: {children?: React.ReactNode}) => (
    <AuthGuard>
        <MainLayout>
            {children}
        </MainLayout>
    </AuthGuard>
)

export default MembersLayout