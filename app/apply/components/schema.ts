import { z } from "zod";

export interface data1 {
  MembershipID: string;
  MemberType: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Suffix: string;
  CivilStatus: string;
  Email: string;
  Sex: string;
  BirthDate: Date;
  BirthPlace: string;

  SpouseFirstName: string;
  SpouseMiddleName: string;
  SpouseLastName: string;
  SpouseSuffix: string;
  SpouseOccupation: string;

  PositionTitle: string;
  OfficeTitle: string;
  NatureOfEmployment: string;
  YearsOfService: number;

  MemLine1: string;
  MemBarangay: string;
  MemMunicipalityCity: string;
  MemProvince: string;
  MemZipCode: number;

  NearestRelativeFirstName: string;
  NearestRelativeLastName: string;

  RelativeLine1: string;
  RelativeBarangay: string;
  RelativeMunicipalityCity: string;
  RelativeProvince: string;
  RelativeZipCode: number;

  Dependent1FirstName: string;
  Dependent1MiddleName: string;
  Dependent1LastName: string;
  Dependent1Suffix: string;
  Dependent1BirthDate: Date;
  Dependent1Relation: string;
  Dependent1Sex: string;

  Dependent2FirstName: string;
  Dependent2MiddleName: string;
  Dependent2LastName: string;
  Dependent2Suffix: string;
  Dependent2BirthDate: Date;
  Dependent2Relation: string;
  Dependent2Sex: string;

  Dependent3FirstName: string;
  Dependent3MiddleName: string;
  Dependent3LastName: string;
  Dependent3Suffix: string;
  Dependent3BirthDate: Date;
  Dependent3Relation: string;
  Dependent3Sex: string;

  PrevMemberStatus: string;
  LeaveReason: string;
  ReferralName: string;
}

export const FullApplicationFormSchema = z.object({
  FirstName: z.string().min(2),
  MiddleName: z.string().min(2),
  LastName: z.string().min(2),
  Suffix: z.string().optional(),
  CivilStatus: z.enum([
    "Single",
    "Married",
    "Divorced",
    "Widowed",
    "Annulled",
    "Legally Seperated",
  ]),
  Email: z.string().email(),
  Sex: z.enum(["Male", "Female", "Other", "Prefer not to Say"]),
  BirthDate: z
    .date({
      required_error: "A date of birth is required.",
    })
    .optional(),
  BirthPlace: z.string(),

  SpouseFirstName: z.string().optional(),
  SpouseMiddleName: z.string().optional(),
  SpouseLastName: z.string().optional(),
  SpouseSuffix: z.string().optional(),
  SpouseOccupation: z.string().optional(),

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

  Dependent1FirstName: z.string().optional(),
  Dependent1MiddleName: z.string().optional(),
  Dependent1LastName: z.string().optional(),
  Dependent1Suffix: z.string().optional(),
  Dependent1BirthDate: z.date().optional(),
  Dependent1Relation: z.string().optional(),
  Dependent1Sex: z.string().optional(),

  Dependent2FirstName: z.string().optional(),
  Dependent2MiddleName: z.string().optional(),
  Dependent2LastName: z.string().optional(),
  Dependent2Suffix: z.string().optional(),
  Dependent2BirthDate: z.date().optional(),
  Dependent2Relation: z.string().optional(),
  Dependent2Sex: z.string().optional(),

  Dependent3FirstName: z.string().optional(),
  Dependent3MiddleName: z.string().optional(),
  Dependent3LastName: z.string().optional(),
  Dependent3Suffix: z.string().optional(),
  Dependent3BirthDate: z.date().optional(),
  Dependent3Relation: z.string().optional(),
  Dependent3Sex: z.string().optional(),

  PrevMemberStatus: z.string(),
  LeaveReason: z.string().optional(),
  ReferralName: z.string().optional(),
});

export const ApplicationFormSchema = FullApplicationFormSchema;
