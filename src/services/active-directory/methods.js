import LDAP from "./config";

const domain = process.env.DOMAIN;

const AD = {
  findUser: async (username) => {
    try {
      const data = await new Promise((resolve, reject) => {
        LDAP.findUser(username, (err, found) => {
          if (err) reject(err);
          if (!found) reject(found);

          resolve(found);
        });
      });

      const { sAMAccountName, cn, mail, description } = data;

      const user = {
        email: mail,
        fullname: cn,
        username: sAMAccountName,
        departament: description,
      };

      return user;
    } catch (err) {
      return null;
    }
  },

  authenticate: async (username, password) => {
    try {
      const auth = await new Promise((resolve, reject) => {
        LDAP.authenticate(username + domain, password, (err, isAuth) => {
          if (err) reject(false);
          if (!isAuth) reject(false);
          if (isAuth) resolve(true);
        });
      });

      return auth;
    } catch (err) {
      return false;
    }
  },
};

export default AD;
