import {AuditableEntity} from "@/types/auditable-entity";

interface Application extends AuditableEntity {
    candidateId:number
}

export type {
    Application
}