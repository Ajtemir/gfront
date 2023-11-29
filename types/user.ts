import { Role } from "@/types/role";

type User = {
  id: number,
  userName: string;
  lastName: string,
  firstName: string,
  patronymicName?: string | null,
  email?: string | null;
  pin: string | null;
  image: string | null;
  createdBy: number,
  createdAt: Date,
  modifiedBy: number,
  modifiedAt: Date,
  roles: Role[],
}

interface UpdateUserDetails {
  id: number,
  userName: string;
  lastName: string,
  firstName: string,
  patronymicName?: string | null,
  email?: string | null;
  pin: string | null;
}


export {
  type User,
  type UpdateUserDetails,
}