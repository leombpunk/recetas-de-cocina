-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-11-2024 a las 03:37:03
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

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id`, `idReceta`, `idUsuario`, `comentario`, `createAt`) VALUES
(1, 2, 1, 're manija esa receta ameo', '2024-10-08 14:40:03'),
(2, 2, 3, 'soy la primer respuesta al comentario principal', '2024-10-08 18:05:40'),
(3, 2, 5, 'soy la segunda respuesta a la primer respuesta del comentario princial', '2024-10-09 20:05:22'),
(4, 2, 3, 'soy el segundo comentario principal', '2024-10-09 01:39:10'),
(5, 2, 3, 'soy la segunda respuesta al comentario principal', '2024-10-09 01:41:50'),
(6, 2, 1, 'terrible receta qliao, me gusto mucho equisde', '2024-10-09 17:00:20'),
(8, 2, 1, 'capo soy yo de nuevo, se la pase a unos amigos y les encanto', '2024-10-09 17:18:01');

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

--
-- Volcado de datos para la tabla `guardadas`
--

INSERT INTO `guardadas` (`id`, `idUsuario`, `idReceta`, `createAt`) VALUES
(4, 6, 1, '2024-11-08 19:53:40'),
(5, 6, 2, '2024-11-08 19:53:40'),
(6, 6, 3, '2024-11-08 19:53:40'),
(7, 6, 4, '2024-11-08 19:53:40'),
(14, 6, 25, '2024-11-08 19:53:40'),
(15, 6, 28, '2024-11-08 19:53:40'),
(19, 6, 33, '2024-11-08 19:53:40');

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

--
-- Volcado de datos para la tabla `likes`
--

INSERT INTO `likes` (`id`, `idUsuario`, `idReceta`, `createAt`) VALUES
(9, 1, 2, '2024-10-06 17:22:25');

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
  `visibilidad` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `comensales` varchar(20) NOT NULL,
  `duracion` varchar(20) NOT NULL,
  `checked` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '0=no verificado 1=verificado',
  `ingredientes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[{"name":""}]',
  `pasos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[{"paso":"","imagen":""}]',
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `deleteAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `recetas`
--

INSERT INTO `recetas` (`id`, `idUsuario`, `titulo`, `detalle`, `imagen`, `visibilidad`, `comensales`, `duracion`, `checked`, `ingredientes`, `pasos`, `createAt`, `updateAt`, `deleteAt`) VALUES
(1, 1, 'Pastafrola de membrillo', 'primero compras el pan, lo cortas con un cuchillo, abrís la manteca y la untas sobre el pan', 'file-1731713274793.webp', 1, '4 personas', '50 minutos', 1, '[{\"name\":\"750 gr de membrillo en barra\"}]', '[{\"paso\":\"mezcle mezcle\",\"imagen\":\"\"}]', '2024-11-01 18:06:01', '2024-11-15 20:27:57', NULL),
(2, 1, 'Bizcochuelo marmolado', 'mezcla todo como venga', 'file-1731712647760.jpg', 1, '5 persianas', '30 minutos', 1, '[{\"name\":\"1kg de harina\"},{\"name\":\"50gr de leudante\"}]', '[{\"paso\":\"merzclar las weas en un recipiente limpio\",\"imagen\":\"\"}]', '2024-11-01 19:06:08', '2024-11-15 20:17:30', NULL),
(3, 1, 'Tarta de jamón y queso', 'mezcla todo como venga', 'file-1731712731247.webp', 1, '4 personas', '50 minutos', 1, '[{\"name\":\"250 gr de queso\"}]', '[{\"paso\":\"jamón y queso gil\",\"imagen\":\"\"}]', '2024-11-02 18:06:28', '2024-11-15 20:19:49', NULL),
(4, 1, 'Ñoquis de papa con pollito', 'mezcla todo como venga', 'file-1731713443052.jpg', 0, '2 personas', '1 hora', 1, '[{\"name\":\"2 papas medianas\"}]', '[{\"paso\":\"comer, comiendo\",\"imagen\":\"\"}]', NULL, '2024-11-15 20:31:41', NULL),
(25, 1, 'Chipa guasu', 'test', 'file-1731712912189.webp', 1, '4 personas', '2 horas', 1, '[{\"name\":\"500 gr de choclo\"},{\"name\":\"250 gr de queso\"}]', '[{\"paso\":\"mezcla las weas pe\",\"imagen\":\"\"}]', '2024-11-03 18:06:34', '2024-11-15 20:22:45', NULL),
(28, 1, 'Canelones de carne con salsa blanca', 'es un te con leche pa', 'file-1731710980348.jpg', 1, '2 personas', '45 minutos', 1, '[{\"name\":\"1/2 de carne molida\"}]', '[{\"paso\":\"cocinar bien todo po wn\",\"imagen\":\"\"}]', '2024-11-09 18:06:37', '2024-11-15 19:49:44', NULL),
(33, 2, 'Pastel de papas', 'soy un pastel de papas', 'file-1731722132996.webp', 1, '5 personas', '40 minutos', 1, '[{\"name\":\"3 papas grandes\"}]', '[{\"paso\":\"y pisas las papas amigo\",\"imagen\":\"\"}]', '2024-10-08 15:04:58', '2024-11-15 22:55:34', NULL);

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

--
-- Volcado de datos para la tabla `respuestas`
--

INSERT INTO `respuestas` (`id`, `idComentario`, `idUsuario`, `idUsuarioMension`, `respuesta`, `createAt`) VALUES
(5, 1, 2, 1, 'chupala ameo no sabes una chota', '2024-10-09 15:25:40'),
(6, 3, 1, 2, 'no se, soy una respuesta, jiji', '2024-10-09 18:05:14'),
(7, 1, 1, 2, 'no se, soy una respuesta, jiji', '2024-10-09 18:05:34'),
(8, 3, 1, 5, 'ola k ase amigo de los ninios', '2024-10-15 18:40:48'),
(9, 5, 1, 3, 'pero que', '2024-10-15 21:11:20'),
(10, 8, 1, 1, 'respuesta al ola k ase', '2024-10-15 21:11:39'),
(11, 3, 1, 1, 'intento 2 respuesta al ola k ase', '2024-10-15 21:31:33'),
(13, 3, 1, 5, 'respuesta con el nuevo componente \"reply\"', '2024-10-16 19:42:11'),
(14, 3, 3, 5, 'relaja la raja', '2024-10-18 19:56:38'),
(15, 3, 2, 5, 're mas capito equisde', '2024-10-07 20:26:52'),
(16, 2, 1, 3, 'jaja jas, que copados! equisdes', '2024-10-18 19:39:53'),
(17, 4, 1, 3, 'mamamia mas calsone', '2024-10-18 19:48:07'),
(18, 4, 1, 3, 'tremendamente original tu comentario amigo', '2024-10-18 19:52:09'),
(19, 4, 1, 3, 'otro intento pe', '2024-10-18 19:55:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int(11) UNSIGNED NOT NULL,
  `usuario` varchar(16) NOT NULL,
  `contrasena` varchar(255) NOT NULL COMMENT 'pass: usuario123',
  `apellidos` varchar(100) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `createAt` datetime DEFAULT NULL,
  `deleteAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `contrasena`, `apellidos`, `nombres`, `mail`, `imagen`, `createAt`, `deleteAt`) VALUES
(1, 'usuario123', '$2a$10$KXf7W6z9q1K3sbnezjq2KuhIytGXDExScqcP.3JwHx.ps0BUHqShG', 'jiji jiji', 'pepito', 'mail_123@update.com', 'usuario123-1729711637629.webp', NULL, NULL),
(2, 'usuario456', '$2a$10$L7FWKsh6xWsJqRuK1rqml.9.REB/b1gZcWgKOCtiuPS2We9yLeeUW', '', '', 'usu456@ario.com', NULL, NULL, NULL),
(3, 'usuario124', '$2a$10$L7FWKsh6xWsJqRuK1rqml.9.REB/b1gZcWgKOCtiuPS2We9yLeeUW', '', '', 'mail@testeo.com', NULL, NULL, NULL),
(5, 'usuarioTest', '$2a$10$DiZim3xEPrsAmcuZuqx6pepMxXDfxwf8Q7aFkscnKZ9WENCR8LI3i', '', '', 'mail_equisde@testeo.com', NULL, NULL, NULL),
(6, 'paquito5', '$2a$10$L7FWKsh6xWsJqRuK1rqml.9.REB/b1gZcWgKOCtiuPS2We9yLeeUW', 'paqueton', 'paquete', 'test@example.us', 'file-1731005679250.jpg', '2024-11-07 15:44:26', NULL);

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
  ADD KEY `ix_usuario` (`idUsuario`) USING BTREE;

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
  ADD KEY `ix_usuario` (`usuario`) USING BTREE,
  ADD KEY `ix_mail` (`mail`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `guardadas`
--
ALTER TABLE `guardadas`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `recetas`
--
ALTER TABLE `recetas`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
