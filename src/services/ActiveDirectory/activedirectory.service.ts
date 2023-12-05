import Access from "../Access";

const AD = require("ad");

const ActiveDirectory = new AD({
  url: "ldap://26.246.216.159",
  user: "murilo.baleeiro@corporation.local",
  pass: "113551gg@",
});

const ActiveDirectoryService = {
  async getUsers() {
    try {
      const users = await ActiveDirectory.user().get();
      return users;
    } catch (err: any) {
      console.log("ERROR | Active Directory Service | Get users | more:", err.message);
      return null;
    }
  },

  async userIsMemberOf(username: string, group: string) {
    try {
      const isMember = await ActiveDirectory.user(username).isMemberOf(group);
      return isMember;
    } catch (err: any) {
      console.log("ERROR | Active Directory Service | Is Member Of | more:", err.message);
      return null;
    }
  },

  async getGroups() {
    try {
      const groups = await ActiveDirectory.group().get();
      return groups;
    } catch (err: any) {
      console.log("ERROR | Active Directory Service | Get Groups | more:", err.message);
      return null;
    }
  },
};

export default ActiveDirectoryService;
