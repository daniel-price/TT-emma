DELIMITER //

USE emma//
DROP TABLE IF EXISTS `Merchants`//
CREATE TABLE `Merchants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `display_name` varchar(255) NOT NULL,
  `icon_url` varchar(255) NOT NULL,
  `funny_gif_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci//

DROP TABLE IF EXISTS `Users`//
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci//

DROP TABLE IF EXISTS `Transactions`;
CREATE TABLE `Transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `date` datetime NOT NULL,
  `amount` decimal(8,2) NOT NULL,
  `description` varchar(255) NOT NULL,
  `merchant_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Transactions_user_id_IDX` (`user_id`,`date`) USING BTREE,
  KEY `Transactions_merchant_id_IDX` (`merchant_id`,`date`) USING BTREE,
  CONSTRAINT `Merchants_Id` FOREIGN KEY (`merchant_id`) REFERENCES `Merchants` (`id`),
  CONSTRAINT `Users_Id` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci//

DROP PROCEDURE IF EXISTS CreateUsers//

CREATE PROCEDURE CreateUsers(
  IN numOfLoops INT,
  IN numOfRowsInInsert INT
)
BEGIN
	DECLARE r INT DEFAULT numOfLoops;
  DECLARE i INT DEFAULT 0;
    WHILE i < r DO
    	SET @valuesSql = (SELECT REPEAT(',(NULL,'''','''')', numOfRowsInInsert));
  		SET @insertSql = (SELECT CONCAT('INSERT INTO Users VALUES(NULL,'''','''')', @valuesSql, ';'));
  		PREPARE sqlcommand FROM @insertSql;
  		EXECUTE sqlcommand;
  		SET i = i + 1;
  	
   END WHILE;
END //

DROP PROCEDURE IF EXISTS CreateMerchants//

CREATE PROCEDURE CreateMerchants(
  IN numOfLoops INT,
  IN numOfRowsInInsert INT
)
BEGIN
	DECLARE r INT DEFAULT numOfLoops;
  DECLARE i INT DEFAULT 0;
    WHILE i < r DO
    	SET @valuesSql = (SELECT REPEAT(',(NULL,'''','''','''')', numOfRowsInInsert));
  		SET @insertSql = (SELECT CONCAT('INSERT INTO Merchants VALUES(NULL,'''','''','''')', @valuesSql, ';'));
  		PREPARE sqlcommand FROM @insertSql;
  		EXECUTE sqlcommand;
  		SET i = i + 1;
  	
   END WHILE;
END //

DROP PROCEDURE IF EXISTS CreateTransactions//

CREATE PROCEDURE CreateTransactions(
  IN numOfLoops INT,
  IN numOfRowsInInsert INT,
  IN numOfUsers INT,
  IN numOfMerchants INT
)
BEGIN
  DECLARE r INT DEFAULT numOfLoops;
  DECLARE i INT DEFAULT 0;
    WHILE i < r DO
    	SET @userIdSql = (SELECT (SELECT CONCAT('SELECT FLOOR(RAND()*(',numOfUsers,'-1)+1)')));
    	SET @merchantIdSql = (SELECT (SELECT CONCAT('SELECT FLOOR(RAND()*(',numOfMerchants,'-1)+1)')));
    	SET @valueSql = (SELECT CONCAT(',(NULL,(',@userIdSql,'),(SELECT TIMESTAMPADD(SECOND,FLOOR(RAND()*TIMESTAMPDIFF(SECOND,''2020-01-01 00:00:00'',''2021-01-01 00:00:00'')),''2020-01-01 00:00:00'')),(SELECT ROUND(RAND()*100,2)),'''',(',@merchantIdSql,'))'));
    	SET @valuesSql = (SELECT REPEAT(@valueSql, numOfRowsInInsert));
  		SET @insertSql = (SELECT CONCAT('INSERT INTO Transactions VALUES(NULL,(SELECT id FROM Users ORDER BY RAND() LIMIT 1),(SELECT TIMESTAMPADD(SECOND,FLOOR(RAND()*TIMESTAMPDIFF(SECOND,''2020-01-01 00:00:00'',''2021-01-01 00:00:00'')),''2020-01-01 00:00:00'')),(SELECT ROUND(RAND()*100,2)),'''',(SELECT id FROM Merchants ORDER BY RAND() LIMIT 1))', @valuesSql, ';'));
  	  	
  		PREPARE sqlcommand FROM @insertSql;
  		EXECUTE sqlcommand;
  	
  		SET i = i + 1;
   END WHILE;
END //

DELIMITER ;
