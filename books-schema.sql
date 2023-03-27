CREATE DATABASE IF NOT EXISTS `book-management-db`;

use `book-management-db`;

--
-- Table structure for table `books`
--
DROP TABLE IF EXISTS `books`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `language` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `books`
--
LOCK TABLES `books` WRITE;

/*!40000 ALTER TABLE `books` DISABLE KEYS */
;

INSERT INTO
  `books`
VALUES
  (
    2,
    'Mrutunjay',
    'Shivai Sawant',
    'Marathi',
    '2023-03-05 23:59:39',
    NULL,
    '2023-03-05 23:59:39',
    NULL
  ),
  (
    3,
    'A song of ice and fire',
    'R.R.Martin',
    'English',
    '2023-03-06 00:17:48',
    NULL,
    '2023-03-06 00:17:48',
    NULL
  ),
  (
    4,
    'A song of ice and fire',
    'G.R.Martin',
    'Englisha',
    '2023-03-06 00:55:35',
    NULL,
    '2023-03-06 00:55:35',
    NULL
  );

/*!40000 ALTER TABLE `books` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping routines for database 'books_management'
--