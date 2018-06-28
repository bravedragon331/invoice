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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

/*Data for the table `auth` */

insert  into `auth`(`id`,`user`,`page`,`r`,`w`,`d`,`status`,`create_at`) values 
(14,'6ed8457b-bc35-473b-9037-11fb38bafdb8',6,1,1,1,1,'2018-06-28 04:58:30'),
(15,'6ed8457b-bc35-473b-9037-11fb38bafdb8',1,1,1,1,1,'2018-06-28 04:58:42'),
(16,'6ed8457b-bc35-473b-9037-11fb38bafdb8',5,1,1,1,1,'2018-06-28 04:58:46');

/*Table structure for table `dato` */

DROP TABLE IF EXISTS `dato`;

CREATE TABLE `dato` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usrid` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `categoria` varchar(100) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `precio` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

/*Data for the table `dato` */

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Data for the table `empresa` */

/*Table structure for table `invoice` */

DROP TABLE IF EXISTS `invoice`;

CREATE TABLE `invoice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `payment` varchar(50) DEFAULT NULL,
  `amount` varchar(50) DEFAULT NULL,
  `transfer` varchar(50) DEFAULT NULL,
  `receipt` varchar(50) DEFAULT NULL,
  `invoice` varchar(50) DEFAULT NULL,
  `invoicedate` varchar(50) DEFAULT NULL,
  `total` varchar(50) DEFAULT NULL,
  `usrid` varchar(100) DEFAULT NULL,
  `filename` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Data for the table `invoice` */

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `publicidad` */

/*Table structure for table `publish` */

DROP TABLE IF EXISTS `publish`;

CREATE TABLE `publish` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usrid` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `publish` */

/*Table structure for table `representante` */

DROP TABLE IF EXISTS `representante`;

CREATE TABLE `representante` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `dpi` varchar(50) DEFAULT NULL,
  `tel` varchar(50) DEFAULT NULL,
  `usrid` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `representante` */

/*Table structure for table `resettoken` */

DROP TABLE IF EXISTS `resettoken`;

CREATE TABLE `resettoken` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(100) DEFAULT NULL,
  `token` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

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

/*Table structure for table `token` */

DROP TABLE IF EXISTS `token`;

CREATE TABLE `token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(100) DEFAULT NULL,
  `token` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `token` */

insert  into `token`(`id`,`userid`,`token`) values 
(2,'6ed8457b-bc35-473b-9037-11fb38bafdb8','$2a$08$.s0Cx45wKQNc6eozwWexfeHyRTEivQKSQEv4UjI/TycnBjCEedPeG');

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `transferencia` */

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
('6ed8457b-bc35-473b-9037-11fb38bafdb8','monitor@admin.com','$2a$08$YjWUFLBRNqwYTHsz6VIcw..yTEMmVmcMwkivjXL5BaQC7rixwT3OC',NULL,NULL,NULL,NULL,1,1,0,'2018-06-28 04:57:47');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
