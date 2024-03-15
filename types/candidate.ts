import { AuditableEntity } from "@/types/auditable-entity";
import { CandidateType } from "@/types/candidate-type";

interface CandidateWithoutImage extends AuditableEntity {
  name: string;
  candidateType: CandidateType;
}

interface Candidate extends AuditableEntity {
  candidateType: CandidateType;
  candidateTypeId: string;
  image: string | null;
  imageName: string | null;
  applicationId: number
}

export type {
  CandidateWithoutImage,
  Candidate,
}