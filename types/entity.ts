import { Candidate } from "@/types/candidate";

interface Entity extends Candidate {
  nameRu: string;
  nameKg: string;
}

interface CreateEntity {
  nameRu: string;
  nameKg: string;
  imageName: string | null;
  image: string | null;
}

interface UpdateEntityDetails {
  id: number;
  nameRu: string;
  nameKg: string;
}

interface UpdateEntityImage {
  id: number;
  imageName: string | null;
  image: string | null;
}

export type {
  Entity,
  CreateEntity,
  UpdateEntityDetails,
  UpdateEntityImage,
}