export function generateRandomPassword() {
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "!@#$&*()-.?/:<>";

  const allChars = lowerCaseLetters + upperCaseLetters + numbers + specialChars;

  // Gerar um número aleatório entre 8 e 16 para determinar o comprimento da senha
  const passwordLength = 16;

  let password = "";

  // Adicionar pelo menos 1 letra maiúscula
  password += upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)];

  // Adicionar pelo menos 1 número
  password += numbers[Math.floor(Math.random() * numbers.length)];

  // Adicionar pelo menos 1 caractere especial
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  // Preencher o restante da senha com caracteres aleatórios
  for (let i = 0; i < passwordLength - 3; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Embaralhar a senha para garantir a aleatoriedade
  password = password
    .split("")
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join("");

  return password;
}

export function generateUsername(fullname) {
  if (!fullname) return null;
  const firstname = fullname.split(" ")[0].toLowerCase();
  const lastname = fullname.split(" ")[fullname.split(" ").length - 1].toLowerCase();
  if (lastname == firstname || !lastname) return null;
  const username = `${firstname}.${lastname}`;
  return username;
}
