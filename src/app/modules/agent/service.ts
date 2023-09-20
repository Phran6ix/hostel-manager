import { IResponseType } from "../../utilities/types";
import AgentRepo from "./repository";


export default class AgentService {
    private repository: AgentRepo

    constructor() {
        this.repository = new AgentRepo()
    }

    async AgentSignUp(payload: { name: string, email: string, password: string, role: string, avatar: string, agencyName: string, phone: string, address: string }): Promise<IResponseType> {
        return {
            status: 201,
            message: "Your account has been successfully registered",
            data: await this.repository.SignUpAsAgent(payload)
        }
    }

    async AgentSignIn(payload: { email: string, phone: string, password: string }): Promise<IResponseType> {
        return {
            status: 200,
            message: "Account signed in successfully",
            data: await this.repository.LoginAsAnAgent(payload)
        }
    }

    async VerifyAgentAccount(payload: { email: string, otp: string }): Promise<IResponseType> {
        return {
            status: 200,
            message: "Account has been verified successfully",
            data: await this.repository.VerifyAgentAccount(payload)
        }
    }
}