import { Gender } from "@/types/gender";
import { Candidate } from "@/types/candidate";

interface Foreigner extends Candidate {
  lastName: string;
  firstName: string;
  patronymicName: string | null;
  gender: Gender;
  citizenshipId: number;
  citizenshipRu: string;
  citizenshipKg: string;
  birthDate: Date;
  deathDate: Date | null;
}

interface CreateForeigner {
  lastName: string;
  firstName: string;
  patronymicName: string | null;
  gender: Gender | '';
  citizenshipId: number | null;
  birthDate: Date | null;
  deathDate: Date | null;
  image: string | null;
  imageName: string | null;
}

interface UpdateForeignerDetails {
  id: number;
  lastName: string;
  firstName: string;
  patronymicName: string | null;
  gender: Gender;
  citizenshipId: number;
  citizenshipRu: string;
  citizenshipKg: string;
  birthDate: Date;
  deathDate: Date | null; 
}

interface UpdateForeignerImage {
  id: number;
  imageName: string | null;
  image: string | null;
}

export type {
  Foreigner,
  CreateForeigner,
  UpdateForeignerDetails,
  UpdateForeignerImage,
}