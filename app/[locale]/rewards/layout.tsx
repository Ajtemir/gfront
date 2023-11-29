import React from "react";
import { MainLayout } from "@/components/main-layout";
import { AuthGuard } from "@/components/auth-guard";

const RewardsLayout = ({children}: { children?: React.ReactNode }) => (
  <AuthGuard>
    <MainLayout>
      {children}
    </MainLayout>
  </AuthGuard>
)

export default RewardsLayout