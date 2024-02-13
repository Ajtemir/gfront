import {AuditableEntity} from "@/types/auditable-entity";
import {Candidate} from "@/types/candidate";
import {Reward} from "@/types/reward";

interface Application extends AuditableEntity {
    candidateId:number,
    candidate: Candidate,
    rewardId: number,
    reward: Reward,
}

export type {
    Application
}