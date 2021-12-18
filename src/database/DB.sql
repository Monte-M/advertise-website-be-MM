-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2021 at 07:23 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ad_website`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category`) VALUES
(1, 'Laptops'),
(2, 'Mobile phones'),
(3, 'Smart watches'),
(4, 'Gaming consoles'),
(5, 'TV');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `favorite_item` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id`, `user_id`, `favorite_item`) VALUES
(189, 63, 61),
(191, 63, 66),
(192, 20, 66);

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `city` varchar(50) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `item_condition` varchar(20) NOT NULL,
  `image` varchar(255) NOT NULL,
  `post_timestamp` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `user_id`, `category_id`, `title`, `description`, `city`, `price`, `item_condition`, `image`, `post_timestamp`) VALUES
(57, 63, 1, 'Asus ROG for sale', 'Gaming computer for sale.', 'Kaunas', '900', 'New', '1639760873628-70079294.jpg', '2021-12-17 17:07:53'),
(58, 63, 3, 'Apple watch 6', 'Watch for sale. Good price', 'Kaunas', '300', 'Used', '1639760903448-353204893.jpg', '2021-12-17 17:08:23'),
(59, 20, 3, 'Samsung watch 4', 'Watch for sale. Good condition', 'Vilnius', '250', 'Used', '1639761004610-44684202.jpg', '2021-12-17 17:10:04'),
(60, 20, 4, 'Xbox 360 Pro', 'Good gaming console. Pro version', 'Vilnius', '200', 'Used', '1639762217753-198897921.jpg', '2021-12-17 17:38:22'),
(61, 65, 1, 'Asus vivobook', 'Laptop for sale', 'Alytus', '480', 'Used', '1639762290153-437709631.jpg', '2021-12-17 17:31:30'),
(62, 65, 5, 'Samsung TV', 'Samsung TV. Good condition', 'Alytus', '550', 'Used', '1639762343277-242294012.jpg', '2021-12-17 17:32:23'),
(64, 23, 2, 'Samsung S20', 'Samsung S20 for sale.', 'Klaipėda', '550', 'Used', '1639762483718-183800114.jpg', '2021-12-17 17:34:43'),
(65, 23, 2, 'Iphone XR', 'Good condition. Usedaa', 'Druskininkai', '360', 'Used', '1639762831030-592659320.jpg', '2021-12-17 17:41:52'),
(66, 23, 1, 'Lenovo Z70', 'New lenovo laptop', 'Druskininkai', '600', 'New', '1639762995477-437823508.jpg', '2021-12-17 17:43:15'),
(67, 20, 4, 'Playstation 5', 'PS5 for sale. Brand new', 'Vilnius', '570', 'New', '1639765311513-429532473.jpg', '2021-12-17 18:22:29');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `city` varchar(150) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `reg_timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `city`, `phone_number`, `password`, `image`, `reg_timestamp`) VALUES
(20, 'Justas', 'justas@gmail.com', 'Vilnius', '+37060685255', '$2a$10$axCtcd1RGgONBoq7EFTFMuodyZsKXYsHBwNDiE/WNog/vbA37lwXC', 'https://www.themodestman.com/wp-content/uploads/2021/03/home-hero.jpg', '2021-12-11 07:19:51'),
(23, 'Ignas', 'ignas@gmail.com', 'Klaipėda', '+37060685258', '$2a$10$K5uK6qarGMTaTghQMtFBHuOT6Km.6LEgEGw8dpMRI4g6To5rQ.X9m', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR6z_kO944stHlHumtPr3ULtRD8_2fw-di-3bPBky9ACAPATb7QkI4ggkR8ElA5IveM9I&usqp=CAU', '2021-12-12 13:01:13'),
(63, 'Mantas', 'mantas@gmail.com', 'Kaunas', '+37060685258', '$2a$10$JXpZsTs1wfL/XaYYT1NauOWCono.jjtaKHXdY1XuaBgqGYJ2U4HPi', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.logolynx.com%2Fimages%2Flogolynx%2F03%2F039b004617d1ef43cf1769aae45d6ea2.png&f=1&nofb=1', '2021-12-14 12:01:57'),
(64, 'Viktorija', 'viktorija@gmail.com', 'Kaunas', '+37060685222', '$2a$10$ox2pPiwRgcJSqAb7s2TU7.IDIKdwVCgjUL1d324IO8ZB9dQFQ9PsK', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Feasterneuropeantravel.com%2Fwp-content%2Fuploads%2F2017%2F09%2Fdating-lithuanian-women-ft.jpg&f=1&nofb=1', '2021-12-14 13:33:43'),
(65, 'Liepa', 'liepa@gmail.com', 'Alytus', '+37060685333', '$2a$10$Oj2c6o038IhrTGNNK1YCAOkGji2RFhmz8A18oxosCd02/MOyT2n/S', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flegitmailorderbride.com%2Fwp-content%2Fuploads%2F2019%2F12%2F2019-08-03_B0tSdtABSMA.jpg&f=1&nofb=1', '2021-12-14 16:58:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `favorites-to-user` (`user_id`),
  ADD KEY `favorites-to-items` (`favorite_item`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `items-to-categories` (`category_id`),
  ADD KEY `items-to-users` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=195;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites-to-items` FOREIGN KEY (`favorite_item`) REFERENCES `items` (`id`),
  ADD CONSTRAINT `favorites-to-user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items-to-categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `items-to-users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
