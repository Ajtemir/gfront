import {AuditableEntity} from "@/types/auditable-entity";
import {Candidate} from "@/types/candidate";
import {Reward} from "@/types/reward";

interface Document {
    id: number
    name?: string
    documentTypeName: string
    isRequired: boolean
}

export type {
    Document
}