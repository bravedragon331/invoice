/*
SQLyog Community v12.3.2 (64 bit)
MySQL - 5.6.26 : Database - invoice
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`invoice` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `invoice`;

/*Table structure for table `auth` */

DROP TABLE IF EXISTS `auth`;

CREATE TABLE `auth` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user` varchar(100) NOT NULL,
  `page` int(11) NOT NULL,
  `r` int(1) DEFAULT '1',
  `w` int(1) DEFAULT '0',
  `d` int(1) DEFAULT '0',
  `status` int(1) DEFAULT '1',
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

/*Data for the table `auth` */

insert  into `auth`(`id`,`user`,`page`,`r`,`w`,`d`,`status`,`create_at`) values 
(1,'363c5c7e-082c-4c95-b7fd-32843deeb7b7',6,1,1,1,1,'2018-06-25 06:58:06'),
(2,'363c5c7e-082c-4c95-b7fd-32843deeb7b7',1,1,1,1,1,'2018-06-25 07:25:34'),
(4,'363c5c7e-082c-4c95-b7fd-32843deeb7b7',5,1,1,1,1,'2018-06-25 09:27:00'),
(5,'0a24cf2e-e819-4a8d-97e4-298e29c70374',5,1,0,0,1,'2018-06-25 14:19:26'),
(6,'0a24cf2e-e819-4a8d-97e4-298e29c70374',1,1,1,1,1,'2018-06-26 09:20:33'),
(7,'3413002b-dbda-47e3-a09c-e4c67c857951',1,1,1,1,0,'2018-06-26 10:11:38'),
(8,'3413002b-dbda-47e3-a09c-e4c67c857951',5,1,1,1,0,'2018-06-26 10:11:42'),
(9,'a2d57b4d-e921-463e-aba5-5c04bfc9dcf0',1,1,1,1,1,'2018-06-26 10:22:48');

/*Table structure for table `empresa` */

DROP TABLE IF EXISTS `empresa`;

CREATE TABLE `empresa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empresa` varchar(50) NOT NULL,
  `nit` varchar(50) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `numero` varchar(50) DEFAULT NULL,
  `folio` varchar(50) DEFAULT NULL,
  `libro` varchar(50) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `ddmmaa` varchar(50) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `documento` varchar(50) DEFAULT NULL,
  `usrid` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `empresa` */

insert  into `empresa`(`id`,`empresa`,`nit`,`tipo`,`numero`,`folio`,`libro`,`nombre`,`ddmmaa`,`direccion`,`documento`,`usrid`) values 
(1,'2','1','1','1','1','1','1','1','1','1','363c5c7e-082c-4c95-b7fd-32843deeb7b7'),
(3,'1','1','1','','','1','','','','','a2d57b4d-e921-463e-aba5-5c04bfc9dcf0');

/*Table structure for table `publicidad` */

DROP TABLE IF EXISTS `publicidad`;

CREATE TABLE `publicidad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empresa` varchar(50) DEFAULT NULL,
  `tel` varchar(50) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `descanso` varchar(50) DEFAULT NULL,
  `servicio` varchar(50) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `domicilio` varchar(50) DEFAULT NULL,
  `presentacion` varchar(50) DEFAULT NULL,
  `confirmacion` varchar(50) DEFAULT NULL,
  `minimo` varchar(50) DEFAULT NULL,
  `tarjeta` varchar(50) DEFAULT NULL,
  `usrid` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `publicidad` */

insert  into `publicidad`(`id`,`empresa`,`tel`,`tipo`,`descanso`,`servicio`,`direccion`,`domicilio`,`presentacion`,`confirmacion`,`minimo`,`tarjeta`,`usrid`) values 
(1,'1','1','1','1','1','1','1','','','12','','363c5c7e-082c-4c95-b7fd-32843deeb7b7');

/*Table structure for table `publish` */

DROP TABLE IF EXISTS `publish`;

CREATE TABLE `publish` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usrid` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `publish` */

insert  into `publish`(`id`,`usrid`) values 
(1,'0a24cf2e-e819-4a8d-97e4-298e29c70374'),
(2,'a2d57b4d-e921-463e-aba5-5c04bfc9dcf0');

/*Table structure for table `representante` */

DROP TABLE IF EXISTS `representante`;

CREATE TABLE `representante` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `dpi` varchar(50) DEFAULT NULL,
  `tel` varchar(50) DEFAULT NULL,
  `usrid` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `representante` */

insert  into `representante`(`id`,`nombre`,`dpi`,`tel`,`usrid`) values 
(1,'2','1','1','363c5c7e-082c-4c95-b7fd-32843deeb7b7'),
(2,'1','1','1','0a24cf2e-e819-4a8d-97e4-298e29c70374');

/*Table structure for table `resettoken` */

DROP TABLE IF EXISTS `resettoken`;

CREATE TABLE `resettoken` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(100) DEFAULT NULL,
  `token` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `resettoken` */

/*Table structure for table `terms` */

DROP TABLE IF EXISTS `terms`;

CREATE TABLE `terms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ver` varchar(30) NOT NULL,
  `sub` varchar(50) NOT NULL,
  `revisedate` varchar(30) NOT NULL,
  `filename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `terms` */

insert  into `terms`(`id`,`ver`,`sub`,`revisedate`,`filename`) values 
(2,'1.0.2','How to use','2018-06-25','2u2e90jiu62mn4.pdf'),
(3,'1.0.1','How to use','2018-06-25','2u21h8jiu65gt9.pdf');

/*Table structure for table `token` */

DROP TABLE IF EXISTS `token`;

CREATE TABLE `token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(100) DEFAULT NULL,
  `token` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `token` */

insert  into `token`(`id`,`userid`,`token`) values 
(1,'363c5c7e-082c-4c95-b7fd-32843deeb7b7','$2a$08$1xtsl/LyKoiBmLh2J26hoeu5Y.RbzUZMUDJQDKphei26oB9nwTBM6');

/*Table structure for table `transferencia` */

DROP TABLE IF EXISTS `transferencia`;

CREATE TABLE `transferencia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `banco` varchar(50) DEFAULT NULL,
  `cuenta_numero` varchar(50) DEFAULT NULL,
  `cuenta_nombre` varchar(50) DEFAULT NULL,
  `pago` varchar(50) DEFAULT NULL,
  `usrid` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `transferencia` */

insert  into `transferencia`(`id`,`banco`,`cuenta_numero`,`cuenta_nombre`,`pago`,`usrid`) values 
(1,'2','1','1','1','363c5c7e-082c-4c95-b7fd-32843deeb7b7');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` varchar(100) NOT NULL,
  `email` varchar(30) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `firstname` varchar(30) DEFAULT NULL,
  `lastname` varchar(30) DEFAULT NULL,
  `contractdate` varchar(30) DEFAULT NULL,
  `acceptdate` varchar(30) DEFAULT NULL,
  `type` tinyint(1) DEFAULT '0',
  `status` tinyint(1) DEFAULT '1',
  `active` tinyint(1) DEFAULT '0',
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`id`,`email`,`password`,`firstname`,`lastname`,`contractdate`,`acceptdate`,`type`,`status`,`active`,`create_at`) values 
('0a24cf2e-e819-4a8d-97e4-298e29c70374','bader@test.com','$2a$08$ApQJU74.LClD5Y/qB4sETuSKCXiVtRnkePuMCWr4POaxKx9Wds6nS','Bader','Al','2018-06-26','2018-06-26',0,1,0,'2018-06-25 14:19:12'),
('363c5c7e-082c-4c95-b7fd-32843deeb7b7','monitor@admin.com','$2a$08$Kg8xuYXzZynPx9tXSBqJAeUo3UHNfS4SvsuTjLUYQrjQZ.Zu15N7y','Admin','Admin',NULL,NULL,1,1,0,'2018-06-25 06:23:01'),
('a2d57b4d-e921-463e-aba5-5c04bfc9dcf0','bader@test2.com','$2a$08$gpLv9nKjK6WofFoCOng1Cu14KeTJLNFjGH.Ah6gFqFTJ55Nxln6rC','Test','Test','2018-06-26','2018-06-26',0,1,0,'2018-06-26 10:18:21');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
