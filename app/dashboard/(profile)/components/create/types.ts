import * as s from "./schema"
import { z } from "zod"

export type MemberFields = z.infer<typeof s.MemberSchema>
export type AddressFields = z.infer<typeof s.AddressSchema>
export type ContactFields = z.infer<typeof s.ContactSchema>
export type DependentsFields = z.infer<typeof s.DependentsSchema>
export type OccupationFields = z.infer<typeof s.OccupationSchema>
export type SurveyFields = z.infer<typeof s.SurveySchema>

