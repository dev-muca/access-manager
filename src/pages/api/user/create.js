import { exec } from "child_process";

export default async function postCreateUser(req, res) {
  const { username, email, fullname, firstName, lastName, password, departament } = req.body;

  const command = `powershell.exe -Command "Import-Module ActiveDirectory; 
                        New-ADUser -SamAccountName '${username}' 
                                   -UserPrincipalName '${username}@servidor-ad.local' 
                                   -Name '${fullname}' 
                                   -GivenName '${firstName}' 
                                   -Surname '${lastName}'
                                   -DisplayName '${fullname}'
                                   -Description '${departament}'
                                   -EmailAddress '${email}'
                                   -Enabled $true
                                   -PasswordNeverExpires $true
                                   -AccountPassword (ConvertTo-SecureString -AsPlainText '${password}' -Force) 
                                   -Server 'servidor.local'"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao criar usuário: ${error.message}`);
      return res.status(500).json({ error: "Erro ao criar usuário" });
    }
    if (stderr) {
      console.error(`Erro ao criar usuário: ${stderr}`);
      return res.status(500).json({ error: "Erro ao criar usuário" });
    }
    console.log(`Usuário criado com sucesso: ${stdout}`);
    return res.status(200).json({ message: "Usuário criado com sucesso" });
  });
}
