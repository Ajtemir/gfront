import { AuditableEntity } from "@/types/auditable-entity";

interface Reward extends AuditableEntity {
  nameRu: string;
  nameKg: string;
  image: string;
  imageName: string;
}

interface CreateReward {
  nameRu: string;
  nameKg: string;
  image: string;
  imageName: string;
}

interface UpdateReward {
  id: number;
  nameRu: string;
  nameKg: string;
  image: string;
  imageName: string;
}

export type {
  Reward,
  CreateReward,
  UpdateReward,
}