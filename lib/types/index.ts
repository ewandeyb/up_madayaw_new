export type IPermission = {
  PermissionsID: string;
  created_at: string;
  Role: "user" | "admin";
  Status: "active" | "resigned";
  MemberData: {
    MembershipID: string;
    created_at: string;
    FirstName: string;
    Email: string;
  };
};
