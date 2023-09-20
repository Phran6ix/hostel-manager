import { AccountStatusError, ExistError, InvalidRequestError, NotFoundError } from "../../utilities/error";
import { HelperFunctions } from "../../utilities/helper";
import Agent from "./model";
import User from '../auth/model'
import { AgentInterface } from "./type";

export default class AgentRepo {
    private model = Agent

    async SignUpAsAgent(payload: Partial<AgentInterface>): Promise<Partial<AgentInterface>> {
        try {
            const agent = new this.model({ ...payload })

            if (await User.findOne({ email: payload.email }).lean().select("email")) {
                throw ExistError("An Account with this email already exists")
            }
            agent.password = await HelperFunctions.hashString("" + payload.password) as string

            await HelperFunctions.sendOTPToEmail(agent.email, "One-Time password for you account verification")
            await agent.save()
            return agent.toObject()
        } catch (error) {
            throw error
        }
    }

    async LoginAsAnAgent(payload: { email?: string, phone?: string, password: string }): Promise<{ agent: AgentInterface, token: string }> {
        try {
            let agent

            if (payload.email) { agent = await Agent.findOne({ email: payload.email }) }
            if (payload.phone) { agent = await Agent.findOne({ phone: payload.phone }) }

            if (!agent) {
                throw NotFoundError("Account not found")
            }

            if (!await HelperFunctions.comparePassword(agent.password, payload.password)) {
                throw InvalidRequestError("Invalid password")
            }

            return { token: await HelperFunctions.getToken(agent.toObject()), agent: agent.toObject() as AgentInterface }
        } catch (error) {
            throw error
        }
    }

    async VerifyAgentAccount(data: { email: string, otp: string }): Promise<void> {
        try {
            let agent = await Agent.findOne({ email: data.email }).select('isVerified')
            if (!agent) { throw NotFoundError("Account not found") }

            if (agent.isVerified) { throw AccountStatusError("Your account has already been verified") }

            agent.isVerified = true
            await agent.save()
            return
        } catch (error) {
            throw error
        }
    }
    async ForgotPassword(): Promise<void> { }
    async ResetPassword(): Promise<void> { }
}