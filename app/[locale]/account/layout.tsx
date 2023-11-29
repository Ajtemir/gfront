import { ReactNode } from "react";
import { MainLayout } from "@/components/main-layout";
import {AuthGuard} from "@/components/auth-guard";

const AccountLayout = ({children}: {children?: ReactNode}) => {
  return (
    <AuthGuard>
      <MainLayout>
          {children}
      </MainLayout>
    </AuthGuard>
  )
}

export default AccountLayout