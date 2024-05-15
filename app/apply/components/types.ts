import * as s from "./schema";
import { z } from "zod";

export type ApplicationFormFields = z.infer<typeof s.ApplicationFormSchema>;
