import {Candidate} from "@/types/candidate";
import {Gender} from "@/types/gender";

export interface Person {
    id: number
    birthDate: Date
    deathDate?: Date
    firstName: string
    lastName: string
    patronymicName?: string
    fullName?: string
    gender: Gender
    passportNumber?: string
    passportSeries?: string
    pin?: string
    registeredAddress?: string
    actualAddress?: string
}