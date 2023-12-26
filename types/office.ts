import {AuditableEntity} from "@/types/auditable-entity";
import {MultiselectOption} from "@/components/multi-select";
import {boolean, number, string} from "yup";

interface Office extends AuditableEntity {
  nameRu: string;
  nameKg: string;
  parentOffices: Office[]
}
interface CreateOffice {
  id: number | null;
  nameRu: string;
  nameKg: string;
  parentOffices: Office[],
}

interface UpdateOfficeDetails {
  id: number;
  nameRu: string;
  nameKg: string;
  parentOffices: Office[];
}

export type {
  Office,
  CreateOffice,
  UpdateOfficeDetails,
}
