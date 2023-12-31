import { Schema, model } from 'mongoose'
import { AgentInterface } from './type'
import { HelperFunctions } from '../../utilities/helper'
import Constants from '../../utilities/constant'
import { transform } from 'typescript'

const AgentSchema = new Schema<AgentInterface>({
    agentId: {
        type: String,
        default: () => HelperFunctions.UUID()
    },
    email: {
        type: String,
        unique: true,
        required: true
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
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true, versionKey: false,
    toObject: {
        transform: function (doc, ret) {
            delete ret._id
            let { password, ...returnValue } = ret
            return returnValue
        }
    }

})

const Agent = model<AgentInterface>('Agent', AgentSchema)
export default Agent