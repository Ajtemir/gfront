import {Office} from "@/types/office";
import {User} from "@/types/user";

export interface Status {
    id: number
    statusName: string
    officeId: number
    office: Office
    userId: number
    user: User
    changeTime:Date
}