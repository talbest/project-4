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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `categoryId` int NOT NULL,
  `price` int NOT NULL,
  `photoUrl` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId_idx` (`categoryId`),
  CONSTRAINT `category` FOREIGN KEY (`categoryId`) REFERENCES `catagory` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'steak',2,15,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2bN7WxpUN3SKfRca0YHuUMN6-9RS2tbErEQ&usqp=CAU'),(2,'milk',1,3,'https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Glass-and-bottle-of-milk-fe0997a.jpg'),(3,'lolipop',3,1,'https://ae01.alicdn.com/kf/Haf3c9550e20846b2a5012d829e40be8dI.jpg'),(4,'chiken',2,8,'https://images.herzindagi.info/image/2019/Jan/chiken-benefits-for-health.jpg'),(5,'shocko edited ',1,7,'DDDD edited'),(6,'gvina cheeses',1,6,'https://media.wired.co.uk/photos/606db59587b15dc95f9cd468/16:9/w_1920,h_1080,c_limit/Cheese_01.jpg'),(7,'banana',3,123,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpSR4J08eP-UwrQlRgVWJfL5cL3Uv8VYm5hQ&usqp=CAU'),(8,'shocko',1,6,'DDDD');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
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
