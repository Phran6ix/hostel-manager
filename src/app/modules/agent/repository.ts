import { InvalidRequestError, NotFoundError } from "../../utilities/error";
import { HelperFunctions } from "../../utilities/helper";
import Agent from "./model";
import { AgentInterface } from "./type";

export default class AgentRepo {
    private model = Agent

    async SignUpAsAgent(payload: Partial<AgentInterface>): Promise<Partial<AgentInterface>> {
        try {
            const agent = new this.model({ ...payload })

            agent.password = await HelperFunctions.hashString("" + payload.password) as string

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

    async VerifyAgentAccount(): Promise<void> { }
    async ForgotPassword(): Promise<void> { }
    async ResetPassword(): Promise<void> { }
}