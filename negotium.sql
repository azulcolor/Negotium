-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 25, 2022 at 09:55 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `negotium`
--

-- --------------------------------------------------------

--
-- Table structure for table `comentarios`
--

CREATE TABLE `comentarios` (
  `idNota` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `nota` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comentarios`
--

INSERT INTO `comentarios` (`idNota`, `idUsuario`, `nota`) VALUES
(7, 25, 'Ya funciona la página'),
(8, 26, 'mañana no laboramos');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('7t-FeQ3x6W2v9XFNKqxFQIGL23ZeXnrc', 1650674652, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{\"error\":[\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\",\"Missing credentials\"]},\"passport\":{\"user\":26}}');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `idStatus` int(11) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`idStatus`, `status`) VALUES
(1, 'por hacer'),
(2, 'en progreso'),
(3, 'terminada'),
(4, 'expirada');

-- --------------------------------------------------------

--
-- Table structure for table `tareas`
--

CREATE TABLE `tareas` (
  `idTarea` int(10) UNSIGNED NOT NULL,
  `tarea` varchar(100) NOT NULL,
  `fechaCreacion` date NOT NULL DEFAULT current_timestamp(),
  `fechaExpiracion` date NOT NULL DEFAULT current_timestamp(),
  `idUsuario` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `importancia` varchar(50) NOT NULL,
  `idStatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tareas`
--

INSERT INTO `tareas` (`idTarea`, `tarea`, `fechaCreacion`, `fechaExpiracion`, `idUsuario`, `descripcion`, `importancia`, `idStatus`) VALUES
(3, 'arquitectura', '2022-04-17', '2022-04-22', 1, 'terminar el proyecto 2', 'Normal', 3),
(4, 'calculo', '2022-04-17', '2022-04-20', 1, 'terminar la tarea de calculo 10', 'Urgente', 3),
(7, 'diseño de loggin', '2022-04-19', '2022-04-21', 1, 'terminar el diseño ', 'Normal', 4),
(8, 'Investigar la experiencia de usuario', '2022-04-21', '2022-04-26', 25, 'Hay que realizar la experiencia de usuario de la página', 'Alta', 1),
(9, 'proyecto final', '2022-04-21', '2022-04-28', 26, 'utilizar rest api', 'Alta', 1);

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `nombreUsuario` varchar(100) NOT NULL,
  `correoUsuario` varchar(100) NOT NULL,
  `password` varchar(60) NOT NULL,
  `privilegio` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nombreUsuario`, `correoUsuario`, `password`, `privilegio`) VALUES
(1, 'jonathan valdes', 'jony@gmail.com', '1234', 1),
(24, 'moni', 'moni@gmail.com', '$2a$10$YAsdPUETC06ScKZldPRsTeI21yzXtGrhUieg1Yirl7ubbBmRlW.Sm', 1),
(25, 'Manuel', 'manuel@gmail.com', '$2a$10$hjnPz1vU/QSlDEFgmSsPRehVK3i0oOX3Y2GV2kAUmK0WnjGVBBGaG', 2),
(26, 'pastelin', 'eduardo@gmail.com', '$2a$10$p58DViTPcf2yczE5ZD1Ub.RagNEpvfoNzEhuuME3O36fjzkiR72d6', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`idNota`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`idStatus`);

--
-- Indexes for table `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`idTarea`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idStatus` (`idStatus`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `idNota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `idStatus` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tareas`
--
ALTER TABLE `tareas`
  MODIFY `idTarea` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tareas`
--
ALTER TABLE `tareas`
  ADD CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `tareas_ibfk_2` FOREIGN KEY (`idStatus`) REFERENCES `status` (`idStatus`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
