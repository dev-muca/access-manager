import ActiveDirectory from "activedirectory2";

const LDAP = new ActiveDirectory({
  url: process.env.AD_URL,
  baseDN: process.env.AD_DC,
  username: process.env.AD_USER,
  password: process.env.AD_PASS,
});

export default LDAP;
