import {z} from "zod"

export const ApplicationFormSchema = z
.object({
  FirstName: z.string().min(2),
  MiddleName: z.string().min(2),
  LastName: z.string().min(2),
  Suffix: z.string().max(5),
  CivilStatus: z.enum(["Single","Married","Divorced","Widowed","Annulled","Legally Seperated"]),
  PositionTitle:z.string().min(2),
  Email: z.string().email(),
  Sex: z.enum(["Male","Female","Other","Prefer not to Say"]),
  NatureOfEmployment: z.enum(["Casual", "NGS", "Permanent"]),
  OfficeTitle: z.string().min(2)
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