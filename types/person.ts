import {Candidate} from "@/types/candidate";
import {Gender} from "@/types/gender";

export interface Person extends Candidate {
    firstName: string
    lastName: string
    patronymicName: string
    gender: Gender
    birthDate: Date
    deathDate?: Date
    birthPlace?: string
    studyPlace?: string
    workPlace?: string
}