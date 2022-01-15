USE emma;

CREATE TABLE `Users` (
  `id` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Merchants` (
  `id` varchar(255) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `icon_url` varchar(255) NOT NULL,
  `funny_gif_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Transactions` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `merchant_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `Users_Id` (`user_id`),
  KEY `Merchants_Id` (`merchant_id`),
  CONSTRAINT `Merchants_Id` FOREIGN KEY (`merchant_id`) REFERENCES `Merchants` (`id`),
  CONSTRAINT `Users_Id` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
