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

  SpouseFirstName: z.optional(z.string()),
  SpouseMiddleName: z.optional(z.string()),
  SpouseLastName: z.optional(z.string()),
  SpouseSuffix: z.optional(z.string()),
  SpouseOccupation: z.optional(z.string()),

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

  Dependent1FirstName: z.optional(z.string()),
  Dependent1MiddleName: z.optional(z.string()),
  Dependent1LastName: z.optional(z.string()),
  Dependent1Suffix: z.optional(z.string()),
  Dependent1BirthDate: z.optional(z.date()),
  Dependent1Relation: z.optional(z.string()),
  Dependent1Sex: z.optional(z.string()),

  Dependent2FirstName: z.optional(z.string()),
  Dependent2MiddleName: z.optional(z.string()),
  Dependent2LastName: z.optional(z.string()),
  Dependent2Suffix: z.optional(z.string()),
  Dependent2BirthDate: z.optional(z.date()),
  Dependent2Relation: z.optional(z.string()),
  Dependent2Sex: z.optional(z.string()),

  Dependent3FirstName: z.optional(z.string()),
  Dependent3MiddleName: z.optional(z.string()),
  Dependent3LastName: z.optional(z.string()),
  Dependent3Suffix: z.optional(z.string()),
  Dependent3BirthDate: z.optional(z.date()),
  Dependent3Relation: z.optional(z.string()),
  Dependent3Sex: z.optional(z.string()),
  
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