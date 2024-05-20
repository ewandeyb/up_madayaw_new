import {z} from "zod"

export const ApplicationFormSchema = z
.object({
  FirstName: z.string().min(2),
  MiddleName: z.string().min(2),
  LastName: z.string().min(2),
  Suffix: z.string().max(5),
  CivilStatus: z.enum(["Single","Married","Divorced","Widowed","Annulled","Legally Seperated"]),
  Email: z.string().email(),
  Sex: z.enum(["Male","Female","Other","Prefer not to Say"]),
  BirthDate: z.date({
    required_error: "A date of birth is required.",
  }),
  BirthPlace: z.string(),

  SpouseFirstName: z.string(),
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

  Dependent1Name: z.optional(z.string()),
  Dependent1Age: z.optional(z.coerce.number().nonnegative()),
  Dependent1Relation: z.optional(z.string()),
  Dependent2Name: z.optional(z.string()),
  Dependent2Age: z.optional(z.coerce.number().nonnegative()),
  Dependent2Relation: z.optional(z.string()),
  Dependent3Name: z.optional(z.string()),
  Dependent3Age: z.optional(z.coerce.number().nonnegative()),
  Dependent3Relation: z.optional(z.string()),
  
  PrevMemberStatus: z.string(),
  LeaveReason: z.optional(z.string()),
  ReferralName: z.optional(z.string())
});

/* 

"MembershipID" uuid not null default gen_random_uuid (),
    "MembershipNo" bigint not null,
    "MemberType" text not null,
    "FirstName" text not null,
    "MiddleName" text not null,
    "LastName" text not null,
    "Suffix" text null,
    "BirthDate" date null,
    "Birthplace" text null,
    "Email" text null,
    "CivilStatus" text null,
    "SpouseFirstName" text null,
    "SpouseMiddleName" text null,
    "SpouseLastName" text null,
    "SpouseSuffix" text null,
    "SpouseOccupation" text null,
    "PasswordHash" text null,
    "NearestRelative First Name" text null,
    "NearestRelative Last Name" text null,
    "Sex" text null,*/