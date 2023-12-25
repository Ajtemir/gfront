import {AuditableEntity} from "@/types/auditable-entity";
import {MultiselectOption} from "@/components/multi-select";

interface Office extends AuditableEntity {
  nameRu: string;
  nameKg: string;
  parentOffices: Office[]
}

interface CreateOffice {
  id: number | null;
  nameRu: string;
  nameKg: string;
  parentOffices: MultiselectOption[],
}

interface UpdateOfficeDetails {
  id: number;
  nameRu: string;
  nameKg: string;
  parentOffices: MultiselectOption[];
}

export type {
  Office,
  CreateOffice,
  UpdateOfficeDetails,
}
