import * as s from "./schema"
import { z } from "zod"

export type FormFields = z.infer<typeof s.FormSchema>

