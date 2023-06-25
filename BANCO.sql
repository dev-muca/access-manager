-- Active: 1679111228872@@127.0.0.1@3306@sga

-- DEPARTAMENTS

CREATE TABLE
    `departament` (
        `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        `name` VARCHAR(50) UNIQUE NOT NULL
    );

-- USERS

CREATE TABLE
    `users`(
        `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        `email` VARCHAR(150),
        `username` VARCHAR(50) UNIQUE NOT NULL,
        `fullname` VARCHAR(50) NOT NULL,
        `password` VARCHAR(150),
        `departament` VARCHAR(50)
    );

SELECT * FROM `users`;

DELETE FROM `users` WHERE ID > 0;

DROP TABLE `users`;

SELECT * FROM users;

-- ROLES (CARGOS)

CREATE TABLE
    `roles` (
        `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        `name` VARCHAR(50) NOT NULL
    );

-- PROFILE

CREATE TABLE
    `profile` (
        `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        `avatar` VARCHAR(250),
        `status` BOOLEAN NOT NULL,
        `id_user` INT NOT NULL,
        `id_role` INT,
        CONSTRAINT `FK_USER` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`),
        CONSTRAINT `FK_ROLE` FOREIGN KEY (`id_role`) REFERENCES `roles`(`id`)
    );

SELECT * FROM `profile`;

UPDATE `profile` SET avatar = "SEM FOTO" WHERE id = 1;

SELECT
    username,
    fullname,
    email,
    departament,
    name AS role,
    avatar,
    status
FROM users
    LEFT JOIN profile ON profile.id_user = users.id
    LEFT JOIN roles ON roles.id = profile.id_role
WHERE
    username = 'vitor.martins';

DROP TABLE `profile`;

CREATE TRIGGER `CREATE_PROFILE` AFTER INSERT ON `USERS` 
FOR EACH ROW BEGIN 
	INSERT INTO
	    `profile` (`avatar`, `status`, `id_user`)
	VALUES ('', true, NEW.id);
END; 

DROP TRIGGER `CREATE_PROFILE` ;

SELECT email, fullname, status
FROM users
    LEFT JOIN profile ON profile.id_user = users.id
    LEFT JOIN roles ON roles.id = profile.id_role
WHERE
    departament = 'Tecnologia da Informação';

SELECT
    `users`.`id`,
    `email`,
    `fullname`,
    `status`
FROM `users`
    LEFT JOIN `profile` ON `profile`.`id_user` = `users`.`id`
WHERE
    `departament` = 'Tecnologia da Informação';

UPDATE users
SET
    departament = 'Tecnologia da Informação'
WHERE id = 4;

SELECT * FROM profile;

UPDATE profile SET status = true WHERE id = 1;

INSERT INTO `roles` (`name`) VALUES ('Diretor') ;