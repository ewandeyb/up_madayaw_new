export type IPermission = {
  PermissionsID: string;
  created_at: string;
  Role: "user" | "admin";
  Status: "active" | "resigned";
  MemberData: {
    MembershipID: string;
    FirstName: string;
    LastName: string;
    Email: string;
    MemberType: string;
  };
};
