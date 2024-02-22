import {AuditableEntity} from "@/types/auditable-entity";
import {Candidate} from "@/types/candidate";
import {Reward} from "@/types/reward";
import {Document} from "@/types/document";
import {Status} from "@/types/status";

interface Application extends AuditableEntity {
    candidateId: number,
    candidate: Candidate,
    rewardId: number,
    reward: Reward,
    documents: Document[]
    statuses: Status[]
}

export type {
    Application
}