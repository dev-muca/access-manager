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
      console.log(`AD: Erro ao localizar dados do usuário no Active Directory: ${JSON.stringify(err.message)}`);
      return null;
    }
  },

  findUsers: async (username) => {
    try {
      let users = [];
      const data = await new Promise((resolve, reject) => {
        LDAP.findUsers(`CN=*${username}*`, (err, found) => {
          if (err) reject(err);
          if (!found) reject(found);

          resolve(found);
        });
      });

      data.forEach((adUser) => {
        const { sAMAccountName, cn, mail, description } = adUser;
        const user = {
          email: mail,
          fullname: cn,
          username: sAMAccountName,
          departament: description,
        };
        users.push(user);
      });

      return users;
    } catch (err) {
      console.log(`AD: Erro ao localizar dados dos usuários no Active Directory: ${JSON.stringify(err.message)}`);
      return null;
    }
  },

  findUsersByDepartament: async (office) => {
    try {
      let members = [];

      const data = await new Promise((resolve, reject) => {
        LDAP.findUsers((err, found) => {
          if (err) reject(err);
          if (!found) reject(found);

          resolve(found);
        });
      });

      data.forEach((adUser) => {
        const { sAMAccountName, cn, mail, description } = adUser;
        if (description == office) {
          const user = {
            email: mail,
            fullname: cn,
            username: sAMAccountName,
            departament: description,
          };
          members.push(user);
        }
      });

      return members;
    } catch (err) {
      console.log(
        `AD: Erro ao localizar dados dos usuários no Active Directory do departamento ${office}: ${JSON.stringify(
          err.message
        )}`
      );
      return null;
    }
  },

  findAllUsers: async () => {
    try {
      let users = [];
      const data = await new Promise((resolve, reject) => {
        LDAP.findUsers((err, found) => {
          if (err) reject(err);
          if (!found) reject(found);

          resolve(found);
        });
      });

      data.forEach((adUser) => {
        const { sAMAccountName, cn, mail, description } = adUser;
        const user = {
          email: mail,
          fullname: cn,
          username: sAMAccountName,
          departament: description,
        };
        users.push(user);
      });

      return users;
    } catch (err) {
      console.log(`AD: Erro ao localizar dados dos usuários no Active Directory: ${JSON.stringify(err.message)}`);
      return null;
    }
  },

  authenticate: async (username, password) => {
    try {
      const auth = await new Promise((resolve, reject) => {
        LDAP.authenticate(username + domain, password, (err, isAuth) => {
          if (err) reject(false);
          if (!isAuth) reject(isAuth);
          if (isAuth) resolve(true);
        });
      });

      return auth;
    } catch (err) {
      console.log(err);
      console.log(`AD: Erro ao autenticar com o Active Directory: ${JSON.stringify(err.message)}`);
      return false;
    }
  },
};

export default AD;
