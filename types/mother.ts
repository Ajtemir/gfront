import { Candidate } from "@/types/candidate";
import {Person} from "@/types/person";

interface Mother extends Candidate {
  lastName: string;
  firstName: string;
  patronymicName: string | null;
  pin: string | null;
  passportNumber: string | null;
  birthDate: Date;
  deathDate: Date | null;
  registeredAddress: string;
  actualAddress: string | null;
  person: Person;
}

interface CreateMother {
  lastName: string;
  firstName: string;
  patronymicName: string | null;
  pin: string;
  passportNumber: string;
  birthDate: Date | null;
  deathDate: Date | null;
  registeredAddress: string;
  actualAddress: string | null;
  image: string | null;
  imageName: string | null;
}

interface UpdateMotherDetails {
  id: number;
  lastName: string;
  firstName: string;
  patronymicName: string | null;
  pin: string | null;
  passportNumber: string | null;
  birthDate: Date;
  deathDate: Date | null;
  registeredAddress: string;
  actualAddress: string | null;
}

interface UpdateMotherImage {
  id: number;
  imageName: string | null;
  image: string | null;
}

export type {
  Mother,
  CreateMother,
  UpdateMotherDetails,
  UpdateMotherImage,
}