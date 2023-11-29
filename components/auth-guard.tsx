'use client'

import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import { Role } from "@/types/role";
import { isInRole } from "@/utils/is-in-role";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { useAuth } from "@/hooks/use-auth";

const doesUserHaveRequiredRoles = (user: User | null, requiredRoles?: Role[]): boolean => {
  if (!requiredRoles) {
    return true
  }
  
  if (!user || !user.roles || user.roles.length === 0) {
    return false
  }
  
  for (const role of requiredRoles) {
    if (isInRole(role, user?.roles)) {
      return true;
    }
  }
  
  return false
}

interface AuthGuardProps {
  children?: ReactNode;
  requiredRoles?: Role[];
}

export const AuthGuard = ({children, requiredRoles}: AuthGuardProps) => {
  const auth = useAuth();
  const router = useRouter()

  useEffect(() => {
    if (!auth.user) {
      router.push('/login')
      toast.error('Unauthorized')
    } else if (!doesUserHaveRequiredRoles(auth.user, requiredRoles)) {
      router.back()
      toast.error('Forbidden')
    }
  }, [auth.user, requiredRoles, router]);
  
  if (!auth.user) return null
  
  return <>{children}</>;
}

AuthGuard.propTypes = {
  children: PropTypes.node
};
