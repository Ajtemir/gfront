import { Candidate } from "@/types/candidate";
import { Gender } from "@/types/gender";

interface Citizen extends Candidate {
  lastName: string;
  firstName: string;
  patronymicName: string | null;
  pin: string | null;
  passportNumber: string | null;
  gender: Gender;
  birthDate: Date;
  deathDate: Date | null;
  registeredAddress: string;
  actualAddress: string | null; 
  educationId: number;
  educationRu: string;
  educationKg: string;
  scienceDegree: string | null;
  yearsOfWorkTotal: number;
  yearsOfWorkInIndustry: number;
  yearsOfWorkInCollective: number;
}

interface CreateCitizen {
  lastName: string;
  firstName: string;
  patronymicName: string | null;
  pin: string;
  passportNumber: string;
  gender: Gender | '';
  birthDate: Date | null;
  deathDate: Date | null;
  image: string | null;
  imageName: string | null;
  registeredAddress: string;
  actualAddress: string | null;
  educationId: number | null;
  scienceDegree: string | null;
  yearsOfWorkTotal: number | null;
  yearsOfWorkInIndustry: number | null;
  yearsOfWorkInCollective: number | null;
}

interface UpdateCitizenDetails {
  id: number;
  lastName: string;
  firstName: string;
  patronymicName: string | null;
  pin: string | null;
  passportNumber: string | null;
  gender: Gender;
  birthDate: Date;
  deathDate: Date | null;
  registeredAddress: string;
  actualAddress: string | null;
  educationId: number;
  scienceDegree: string | null;
  yearsOfWorkTotal: number;
  yearsOfWorkInIndustry: number;
  yearsOfWorkInCollective: number;
}

interface UpdateCitizenImage {
  id: number;
  imageName: string | null;
  image: string | null;
}

export type {
  Citizen,
  CreateCitizen,
  UpdateCitizenDetails,
  UpdateCitizenImage,
}