import {Person} from "@/types/person";
import {Gender} from "@/types/gender";
import {Mother} from "@/types/mother";

export interface Child {
    id: number;
    pin: string
    passportSeriesNumber?:string
    registeredAddress:string
    firstName: string
    lastName: string
    patronymicName: string
    gender: Gender
    birthDate: Date
    deathDate?: Date
    birthPlace?: string
    studyPlace?: string
    workPlace?: string
    isAdopted: boolean
    image: string | null;
    imageName: string | null;
    motherId: number
    mother: Mother
}