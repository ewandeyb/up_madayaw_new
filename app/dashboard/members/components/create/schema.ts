import { z } from "zod";

export const MemberSchema = z
  .object({
    /* MembershipNo: z.string().max(10),
  MemberType: z.enum(["Regular Membership", "Associate (NGS/Project-Based)"]), 
  MiddleName: z.string().max(50), 
  LastName: z.string().max(50),
  Suffix: z.string().max(5), 
  Sex: z.enum(["Male", "Female", "Other", "Prefer not to say"]),
  BirthDate: z.string({ required_error: "BirthDate must be in YYYY-MM-DD format" }),
  Birthplace: z.string().max(50), 
  SpouseFirstName: z.string().max(50), 
  SpouseMiddleName: z.string().max(50), 
  SpouseLastName: z.string().max(50), 
  SpouseSuffix: z.string().max(5), 
  SpouseOccupation: z.string().max(30), 
  NearestRelativeFirstName: z.string().max(50), 
  NearestRelativeLastName: z.string().max(50),  */
    FirstName: z.string().max(50),
    Email: z.string().email(),
    Role: z.enum(["user", "admin"]),
    Status: z.enum(["active", "resigned"]),
    password: z.string().min(6, { message: "Password should be 6 characters" }),
    confirm: z.string().min(6, { message: "Password should be 6 characters" }),
  })
  .refine((data) => data.confirm === data.password, {
    message: "Password doesn't match",
    path: ["confirm"],
  });

/* 
create table
  public."MemberData" (
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
    "Sex" text null,
    constraint Member Data_pkey primary key ("MembershipID")
  ) tablespace pg_default; */

/* <-------- Address Data --------> 
    Hidden Data:
    - AssocMemberID
    PK: AssocMemberID
    Foreign Keys
    - Members.MembershipID -> AssocMemberID, isMemberAddress,isRelativeAddress
  */

export const AddressSchema = z.object({
  IsMemberAddress: z.boolean().default(true),
  IsRelativeAddress: z.boolean().default(false),
  FloorNo: z.number().int().min(-32768).max(32767),
  UnitNo: z.number().int().min(-32768).max(32767),
  BuildingName: z.string(),
  PhaseNo: z.number().int().min(-32768).max(32767),
  BlockNo: z.number().int().min(-32768).max(32767),
  HouseNo: z.number().int().min(-32768).max(32767),
  Street: z.string(),
  Subdivision: z.string(),
  Barangay: z.string(),
  MunicipalityCity: z.string(),
  Province: z.string(),
  ZipCode: z.number().int().min(-32768).max(32767),
  Line1: z.string(),
});
/* create table
  public."Addresses" (
    created_at timestamp with time zone not null default now(),
    "AssocMemberID" uuid not null default gen_random_uuid (),
    "IsMemberAddress" boolean not null default true,
    "IsRelativeAddress" boolean not null default false,
    "FloorNo" smallint null,
    "UnitNo" smallint null,
    "BuildingName" text null,
    "PhaseNo" smallint null,
    "BlockNo" smallint null,
    "HouseNo" smallint null,
    "Street" text null,
    "Subdivision" text null,
    "Barangay" text null,
    "MunicipalityCity" text null,
    "Province" text null,
    "ZipCode" smallint null,
    "Line1" text null,
    constraint Addresses_pkey primary key (
      "AssocMemberID",
      "IsMemberAddress",
      "IsRelativeAddress"
    ),
    constraint Addresses_AssocMemberID_fkey foreign key ("AssocMemberID") references "MemberData" ("MembershipID") on update cascade on delete cascade
  ) tablespace pg_default; */

/*
    Hidden Data
      - AssocMemberID
    PK: AssocMemberID
    Foreign Key
      Members.MembershipID -> AssocMemberID -> ContactNumber
  */
export const ContactSchema = z.object({
  ContactNumber: z.string().max(12),
});

/*
    Hidden Data
      - AssocMemberID
    PK: AssocMemberID
    Foreign Key
      Members.MembershipID -> AssocMemberID -> ContactNumber
  */

export const DependentsSchema = z.object({
  Relationship: z.string().nonempty(),
  FirstName: z.string().nonempty().default(""),
  MiddleName: z.string().nonempty().default(""),
  LastName: z.string().nonempty().default(""),
  Suffix: z.string(),
  BirthDate: z.string({
    required_error: "BirthDate must be in YYYY-MM-DD format",
  }),
  Sex: z.string(),
});
/* 
  Hidden Data
    - AssocMemberID
  PK: AssocMemberID
  FK
  Members.MembershipID -> AssocMemberID -> ContactNumber
*/
export const OccupationSchema = z.object({
  PositionTitle: z.string(),
  OfficeTitle: z.string(),
  NatureOfEmployment: z.string(),
  YearsOfService: z.bigint(),
});

/* 
  Hidden Data
    - AssocMemberID
  PK: AssocMemberID
  FK
  Members.MembershipID -> AssocMemberID -> Survey
*/
export const SurveySchema = z.object({
  PrevMemberStatus: z.enum(["active", "resigned"]),
  LeaveReason: z.string(),
  ReferralName: z.string(),
});
