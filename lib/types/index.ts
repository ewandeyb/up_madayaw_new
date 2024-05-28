export type IPermission = {
  PermissionsID: string;
  created_at: string;
  Role: "user" | "admin";
  Status: "active" | "resigned";
  MemberData: {
    MembershipID: string;
    MembershipNo: string;
    FirstName: string;
    LastName: string;
    Email: string;
    MemberType: string;
  };
};

export type IMemberData = {
  MembershipID: string; // Ensure MembershipID is a part of the member data
  MembershipNo: string;
  FirstName: string;
  LastName: string;
  CivilStatus: string;
  BirthDate: string;
  Email: string;
  MemberType: string;
}