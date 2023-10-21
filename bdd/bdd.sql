DROP DATABASE IF EXISTS villa;

CREATE DATABASE villa CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

use villa;

DROP TABLE IF EXISTS `users`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cin` varchar(15) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `identification` varchar(250) NOT NULL,
  `prenom` varchar(200),
  `dateNais` date,
  `lieuNais` varchar(100) NOT NULL,
  `nomPere` varchar(150),
  `nomMere` varchar(150),
  `domicile` varchar(150) NOT NULL,
  `numTel` varchar(15) NOT NULL,
  `profession` varchar(100),
  `attribut` boolean DEFAULT 0,
  `statu` boolean DEFAULT 0,
  `numUrg` varchar(15) NOT NULL,
  `email` varchar(150),
  `img` varchar(255),
  `fb` varchar(255),
  `mdp` varchar(255) NOT NULL,
  `observation` varchar(250),
  PRIMARY KEY (`id`)
) ENGINE = MyISAM AUTO_INCREMENT = 5 DEFAULT CHARSET = latin1;