import { AuditableEntity } from "@/types/auditable-entity";
import { CandidateType } from "@/types/candidate-type";

interface CandidateWithoutImage extends AuditableEntity {
  name: string;
  candidateType: CandidateType;
}

interface Candidate extends AuditableEntity {
  candidateType: CandidateType;
  image: string | null;
  imageName: string | null;
}

export type {
  CandidateWithoutImage,
  Candidate,
}