import { Document } from "mongoose";

export interface AgentInterface extends Document {
    agentId: string;
    name: string;
    email: string;
    password: string;
    role: string;
    avatar: string;
    agencyName: string;
    phoneNumber: string;
    address: string;
    isVerified: boolean
}
