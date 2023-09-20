import { z } from 'zod'
import Constants from '../../utilities/constant'

export default {
    agent_sign_up: z.object({
        body: z.object({
            name: z.string({ required_error: "name is required" }),
            email: z.string({ required_error: "email is required" }).email("Please input a valid email").toLowerCase(),
            password: z.string({ required_error: "password is required" }).min(6, "password should be a minimum of 6 characters").refine((password) => {
                const regex = /^[a-zA-Z0-9]*$/
                return regex.test(password)
            }),
            address: z.string({ required_error: "address is required" }),
            phone: z.string({ required_error: "phone number is required" }),
            role: z.nativeEnum(Constants.AGENT_ROLE),
            agencyName: z.string().optional()
        })
    }),

    agent_sign_in: z.object({
        body: z.object({
            email: z.string().email().toLowerCase().optional(),
            phone: z.string().optional(),
            password: z.string({ required_error: "password is required" })
        })
    }),

    agent_verify_account: z.object({
        body: z.object({
            email: z.string({ required_error: "email is required" }).email().toLowerCase(),
            otp: z.string({ required_error: "otp is required" })
        })
    })
}