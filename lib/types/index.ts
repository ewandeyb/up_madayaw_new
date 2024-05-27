export type IPermission = {
  PermissionsID: string;
  created_at: string;
  Role: "user" | "admin";
  Status: "active" | "resigned";
  MemberData: {
    CivilStatus: string | undefined;
    BirthDate: string | undefined;
    MembershipID: string;
    MembershipNo: string;
    FirstName: string;
    LastName: string;
    Email: string;
    MemberType: string;
  };
};

export type IProfile = {
  MembershipID: string;
  created_at: string;
  MemberData: {
    CivilStatus: string | undefined;
    BirthDate: string | undefined;
    MembershipNo: string;
    FirstName: string;
    LastName: string;
    Email: string;
    MemberType: string;
  };
};