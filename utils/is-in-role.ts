import { Role } from "@/types/role";

export function isInRole(userRole: Role, roles?: Role[]) {
  if (!roles) {
    return false;
  }
  
  return roles.find(r => r === userRole);
}