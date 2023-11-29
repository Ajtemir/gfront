import {AuditableEntity} from "@/types/auditable-entity";

interface Office extends AuditableEntity {
  nameRu: string;
  nameKg: string;
}

interface CreateOffice {
  id: number | null;
  nameRu: string;
  nameKg: string;
}

interface UpdateOfficeDetails {
  id: number;
  nameRu: string;
  nameKg: string;
}

export type {
  Office,
  CreateOffice,
  UpdateOfficeDetails,
}
