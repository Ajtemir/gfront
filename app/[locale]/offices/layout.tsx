import {ReactNode} from "react";
import {AuthGuard} from "@/components/auth-guard";
import {MainLayout} from "@/components/main-layout";

const OfficesLayout = ({children}: {children?: ReactNode}) => (
  <AuthGuard>
    <MainLayout>
      {children}
    </MainLayout>
  </AuthGuard>
)

export default OfficesLayout
