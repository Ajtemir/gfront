import {Person} from "@/types/person";
import {Gender} from "@/types/gender";

export interface Child {
    id: number;
    pin: string
    passportNumberAndSeries?:string
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
}