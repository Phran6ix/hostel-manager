import { Request, Response, NextFunction } from "express";
import BaseController from "../baseController";
import AgentService from "./service";

export default class AgentController extends BaseController {
    private service: AgentService

    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next)
        this.service = new AgentService()
    }

    async HTTPAgentSignIn(): Promise<void> {
        try {
            console.log('1')
            const data = await this.service.AgentSignIn({ ...this.req.body })
            console.log(data)
            this.responseHandler(data)
        } catch (error) {
            this.next(error)
        }
    }

    async HTTPSignUp(): Promise<void> {
        try {
            const data = await this.service.AgentSignUp({ ...this.req.body })
            this.responseHandler(data)
        } catch (error) {
            this.next(error)
        }
    }

    async HTTPAgentVerifyAccount(): Promise<void> {
        try {
            const data = await this.service.VerifyAgentAccount({ ...this.req.body })
            this.responseHandler(data)
        } catch (error) {
            this.next(error)
        }
    }
    async HTTPAgentForgetPassword(): Promise<void> {
        try {
            const data = await this.service.ForgotAgentAccountPassword({ ...this.req.body })
            this.responseHandler(data)
        } catch (error) {
            this.next(error)
        }
    }

    async HTTPResetAgentPassword(): Promise<void> {
        try {
            const data = await this.service.ResetAgentAccountPassword({ otp: this.req.params.otp, ...this.req.body })
            this.responseHandler(data)
        } catch (error) {
            this.next(error)
        }
    }
}