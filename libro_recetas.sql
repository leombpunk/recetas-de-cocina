-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-02-2025 a las 17:29:21
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `libro_recetas`
--
CREATE DATABASE IF NOT EXISTS `libro_recetas` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `libro_recetas`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
CREATE TABLE `comentarios` (
  `id` int(11) UNSIGNED NOT NULL,
  `idReceta` int(11) UNSIGNED NOT NULL,
  `idUsuario` int(11) UNSIGNED NOT NULL,
  `comentario` varchar(1000) NOT NULL,
  `createAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `guardadas`
--

DROP TABLE IF EXISTS `guardadas`;
CREATE TABLE `guardadas` (
  `id` int(11) UNSIGNED NOT NULL,
  `idUsuario` int(11) UNSIGNED NOT NULL,
  `idReceta` int(11) UNSIGNED NOT NULL,
  `createAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE `likes` (
  `id` int(11) UNSIGNED NOT NULL,
  `idUsuario` int(11) UNSIGNED NOT NULL,
  `idReceta` int(11) UNSIGNED NOT NULL,
  `createAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recetas`
--

DROP TABLE IF EXISTS `recetas`;
CREATE TABLE `recetas` (
  `id` int(11) UNSIGNED NOT NULL,
  `idUsuario` int(11) UNSIGNED NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `detalle` varchar(500) NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `urlPublica` varchar(500) NOT NULL,
  `visibilidad` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `almacenamiento` enum('local','cloud') NOT NULL,
  `comensales` varchar(20) NOT NULL,
  `duracion` varchar(20) NOT NULL,
  `checked` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '0=no verificado 1=verificado',
  `ingredientes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[{"name":""}]',
  `pasos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[{"paso":"","imagen":"","urlPublica":""}]',
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `deleteAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

DROP TABLE IF EXISTS `respuestas`;
CREATE TABLE `respuestas` (
  `id` int(11) UNSIGNED NOT NULL,
  `idComentario` int(11) UNSIGNED NOT NULL COMMENT 'id del comentario origen',
  `idUsuario` int(11) UNSIGNED NOT NULL,
  `idUsuarioMension` int(11) UNSIGNED NOT NULL,
  `respuesta` varchar(1000) NOT NULL,
  `createAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int(11) UNSIGNED NOT NULL,
  `googleId` varchar(30) DEFAULT NULL,
  `usuario` varchar(16) NOT NULL,
  `contrasena` varchar(255) DEFAULT NULL COMMENT 'pass: usuario123',
  `apellidos` varchar(100) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `urlPublica` varchar(500) DEFAULT NULL,
  `carpeta` varchar(100) DEFAULT NULL,
  `createAt` datetime DEFAULT NULL,
  `deleteAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_receta_comentario` (`idReceta`),
  ADD KEY `fk_usuario_comentario` (`idUsuario`);

--
-- Indices de la tabla `guardadas`
--
ALTER TABLE `guardadas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_usuario_receta` (`idUsuario`,`idReceta`) USING BTREE,
  ADD KEY `ix_idUsuario` (`idUsuario`) USING BTREE,
  ADD KEY `ix_idReceta` (`idReceta`) USING BTREE;

--
-- Indices de la tabla `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_usuario_receta` (`idUsuario`,`idReceta`) USING BTREE,
  ADD KEY `ix_idUsuario` (`idUsuario`) USING BTREE,
  ADD KEY `ix_idReceta` (`idReceta`) USING BTREE;

--
-- Indices de la tabla `recetas`
--
ALTER TABLE `recetas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ix_usuario` (`idUsuario`) USING BTREE,
  ADD KEY `ix_almacenamiento` (`almacenamiento`);

--
-- Indices de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ix_comentario` (`idComentario`),
  ADD KEY `ix_usuario` (`idUsuario`),
  ADD KEY `ix_idUsuarioMension` (`idUsuarioMension`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_usuario` (`usuario`) USING BTREE,
  ADD UNIQUE KEY `uq_mail` (`mail`) USING BTREE,
  ADD UNIQUE KEY `uq_googleId` (`googleId`),
  ADD KEY `ix_usuario` (`usuario`) USING BTREE,
  ADD KEY `ix_mail` (`mail`) USING BTREE,
  ADD KEY `ix_googleId` (`googleId`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `guardadas`
--
ALTER TABLE `guardadas`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `recetas`
--
ALTER TABLE `recetas`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `fk_receta_comentario` FOREIGN KEY (`idReceta`) REFERENCES `recetas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuario_comentario` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `guardadas`
--
ALTER TABLE `guardadas`
  ADD CONSTRAINT `fk_receta_favorito` FOREIGN KEY (`idReceta`) REFERENCES `recetas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuario_favorito` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `fk_recetas_likes` FOREIGN KEY (`idReceta`) REFERENCES `recetas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuarios_likes` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `recetas`
--
ALTER TABLE `recetas`
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD CONSTRAINT `fk_comentario_respuesta` FOREIGN KEY (`idComentario`) REFERENCES `comentarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuario_mension` FOREIGN KEY (`idUsuarioMension`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuario_respuesta` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
