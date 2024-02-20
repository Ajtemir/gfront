import {AuditableEntity} from "@/types/auditable-entity";
import {Candidate} from "@/types/candidate";
import {Reward} from "@/types/reward";
import {Document} from "@/types/document";

interface Application extends AuditableEntity {
    candidateId: number,
    candidate: Candidate,
    rewardId: number,
    reward: Reward,
    documents: Document[]
}

export type {
    Application
}