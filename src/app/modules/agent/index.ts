import { Router } from "express";
import AgentValidation from './validation'
import AgentController from "./controller";
import { HelperFunctions } from "../../utilities/helper";


class AgentRouter {
    public path = "/agent"
    public router: Router

    constructor() {
        this.router = Router()
        this.instantiateRoute()
    }
    private instantiateRoute() {

        this.router.post(`${this.path}/register`, HelperFunctions.validate(AgentValidation.agent_sign_up), (...x) => new AgentController(...x).HTTPSignUp())
        this.router.post(`${this.path}.login`, HelperFunctions.validate(AgentValidation.agent_sign_in), (...x) => new AgentController(...x).HTTPAgentSignIn())

    }
}


export default AgentRouter