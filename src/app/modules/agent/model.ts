import { Schema, model } from 'mongoose'
import { AgentInterface } from './type'
import { HelperFunctions } from '../../utilities/helper'
import Constants from '../../utilities/constant'

const AgentSchema = new Schema<AgentInterface>({
    agentId: {
        type: String,
        default: () => HelperFunctions.UUID()
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [...Object.values(Constants.AGENT_ROLE)]
    },
    avatar: {
        type: String
    },
    agencyName: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    }
})

const Agent = model<AgentInterface>('Agent', AgentSchema)
export default Agent