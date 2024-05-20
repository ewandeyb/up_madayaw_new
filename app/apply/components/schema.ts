import { z } from "zod"

export const FullApplicationFormSchema = z
  .object({
    FirstName: z.string().min(2),
    MiddleName: z.string().min(2),
    LastName: z.string().min(2),
    Suffix: z.string().max(5),
    CivilStatus: z.enum(["Single", "Married", "Divorced", "Widowed", "Annulled", "Legally Seperated"]),
    Email: z.string().email(),
    Sex: z.enum(["Male", "Female", "Other", "Prefer not to Say"]),
    BirthDate: z.date({
      required_error: "A date of birth is required.",
    }),
    BirthPlace: z.string(),

    SpouseFirstName: z.string().optional(),
    SpouseMiddleName: z.string(),
    SpouseLastName: z.string(),
    SpouseSuffix: z.string(),
    SpouseOccupation: z.string(),

    PositionTitle: z.string().min(2),
    NatureOfEmployment: z.enum(["Casual", "NGS", "Permanent"]),
    OfficeTitle: z.string().min(2),
    YearsOfService: z.coerce.number().nonnegative(),

    MemLine1: z.string().min(2),
    MemBarangay: z.string().min(2),
    MemMunicipalityCity: z.string().min(2),
    MemProvince: z.string().min(2),
    MemZipCode: z.coerce.number(),

    NearestRelativeFirstName: z.string().min(2),
    NearestRelativeLastName: z.string().min(2),

    RelativeLine1: z.string().min(2),
    RelativeBarangay: z.string().min(2),
    RelativeMunicipalityCity: z.string().min(2),
    RelativeProvince: z.string().min(2),
    RelativeZipCode: z.coerce.number(),

    Dependent1FirstName: z.string(),
    Dependent1MiddleName: z.string(),
    Dependent1LastName: z.string(),
    Dependent1Suffix: z.string(),
    Dependent1BirthDate: z.date(),
    Dependent1Relation: z.string(),
    Dependent1Sex: z.string(),

    Dependent2FirstName: z.string(),
    Dependent2MiddleName: z.string(),
    Dependent2LastName: z.string(),
    Dependent2Suffix: z.string(),
    Dependent2BirthDate: z.date(),
    Dependent2Relation: z.string(),
    Dependent2Sex: z.string(),

    Dependent3FirstName: z.string(),
    Dependent3MiddleName: z.string(),
    Dependent3LastName: z.string(),
    Dependent3Suffix: z.string(),
    Dependent3BirthDate: z.date(),
    Dependent3Relation: z.string(),
    Dependent3Sex: z.string(),

    PrevMemberStatus: z.string(),
    LeaveReason: z.string(),
    ReferralName: z.string()
  });

  export const ApplicationFormSchema = FullApplicationFormSchema;
