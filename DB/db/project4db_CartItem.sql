-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: project4db
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `CartItem`
--

DROP TABLE IF EXISTS `CartItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CartItem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  `totalPrice` int NOT NULL,
  `cartId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productId_idx` (`productId`),
  KEY `CartId_idx` (`cartId`),
  CONSTRAINT `CartId` FOREIGN KEY (`cartId`) REFERENCES `carts` (`id`),
  CONSTRAINT `productId` FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CartItem`
--

LOCK TABLES `CartItem` WRITE;
/*!40000 ALTER TABLE `CartItem` DISABLE KEYS */;
INSERT INTO `CartItem` VALUES (15,1,1,1,4),(41,1,1,10,5),(42,2,1,3,5),(43,1,1,10,7),(44,2,1,3,7),(45,3,1,1,7),(46,1,2,20,8),(47,1,2,20,9),(48,2,1,3,9),(49,1,1,10,10),(50,2,1,3,10),(51,3,1,1,10),(53,1,1,15,11),(55,5,5,35,12);
/*!40000 ALTER TABLE `CartItem` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-24 20:53:30
