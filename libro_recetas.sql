-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-09-2024 a las 22:42:44
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
-- Estructura de tabla para la tabla `archivos`
--

DROP TABLE IF EXISTS `archivos`;
CREATE TABLE `archivos` (
  `id` int(11) UNSIGNED NOT NULL,
  `idUsuario` int(11) UNSIGNED NOT NULL,
  `imagen` varchar(100) NOT NULL,
  `createAt` datetime DEFAULT NULL,
  `deleteAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `archivos`
--

INSERT INTO `archivos` (`id`, `idUsuario`, `imagen`, `createAt`, `deleteAt`) VALUES
(1, 1, '865032.jpg', '2024-09-16 16:37:35', '2024-09-16 16:18:16'),
(2, 1, 'file-1726103142309.jpg', '2024-09-16 16:37:35', NULL),
(3, 1, 'file-1726253487234.PNG', '2024-09-16 16:37:35', NULL),
(4, 1, 'file-1726499238700.jpg', '2024-09-16 12:19:06', NULL),
(5, 1, 'file-1726499929764.jpg', '2024-09-16 15:18:49', NULL),
(6, 1, 'file-1726503803359.png', '2024-09-16 16:23:23', NULL),
(7, 1, 'file-1726510057563.jpg', '2024-09-16 18:07:37', NULL),
(8, 1, 'file-1726510198561.jpg', '2024-09-16 18:09:58', NULL),
(9, 1, 'file-1726510766090.jpg', '2024-09-16 15:19:26', NULL),
(10, 1, 'file-1726510957757.jpg', '2024-09-16 15:22:37', NULL),
(11, 1, 'file-1726512526382.webp', '2024-09-16 15:48:46', NULL);

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
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE `likes` (
  `id` int(11) UNSIGNED NOT NULL,
  `idUsuario` int(11) UNSIGNED NOT NULL,
  `idReceta` int(1) UNSIGNED NOT NULL,
  `fecha` date NOT NULL
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
  `visibilidad` tinyint(1) UNSIGNED NOT NULL DEFAULT 0,
  `comensales` varchar(20) NOT NULL,
  `duracion` varchar(20) NOT NULL,
  `checked` tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '0=no verificado 1=verificado',
  `ingredientes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[{"name":""}]',
  `pasos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[{"paso":"","imagen":""}]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `recetas`
--

INSERT INTO `recetas` (`id`, `idUsuario`, `titulo`, `detalle`, `imagen`, `visibilidad`, `comensales`, `duracion`, `checked`, `ingredientes`, `pasos`) VALUES
(1, 1, 'pan con manteca', 'primero compras el pan, lo cortas con un cuchillo, abrís la manteca y la untas sobre el pan', '', 1, '', '', 1, '[]', '[]'),
(2, 1, 'bizcochuelo marmolado', 'mezcla todo como venga', 'file-1688405770766..jpg', 0, '', '', 1, '[]', '[]'),
(3, 1, 'bizcochuelo marmolado', 'mezcla todo como venga', '', 0, '', '', 1, '[]', '[]'),
(4, 1, 'bizcochuelo marmolado', 'mezcla todo como venga', '', 0, '', '', 1, '[]', '[]'),
(5, 1, 'bizcochuelo marmolado', 'mezcla todo como venga', '', 0, '', '', 1, '[]', '[]'),
(6, 1, 'bizcochuelo marmolado', 'mezcla todo como venga', '', 0, '', '', 1, '[]', '[]'),
(7, 1, 'bizcochuelo marmolado', 'mezcla todo como venga', '', 0, '', '', 1, '[]', '[]'),
(8, 1, 'bizcochuelo marmolado', 'mezcla todo como venga', '', 0, '', '', 1, '[]', '[]'),
(9, 1, 'bizcochuelo marmolado', 'mezcla todo como venga', '', 0, '', '', 1, '[]', '[]'),
(10, 1, 'bizcochuelo marmolado', 'mezcla todo como venga', '', 0, '', '', 1, '[]', '[]'),
(12, 1, 'bizcochuelo marmolado', 'mezcla todo como venga', '', 0, '', '', 1, '[]', '[]'),
(13, 1, 'bizcochuelo marmolado', 'mezcla todo como venga', '', 0, '', '', 1, '[]', '[]'),
(25, 1, 'receta test', 'test', '', 1, '2 weones', '2 horas', 1, '[]', '[]'),
(26, 1, 'bizcochuelo marmolado test', 'mezcla todo como venga ameo', '', 1, '5 personas', '1 hora', 1, '[]', '[]'),
(28, 1, 'te con leche', 'es un te con leche pa', '', 1, '2 personas', '15 minutos', 1, '[]', '[]'),
(29, 1, 'bizcochuelo marmolado test', 'mezcla todo como venga ameo', '', 1, '5 personas', '1 hora', 1, '[]', '[]'),
(30, 1, 'test middleware', '', '', 0, '', '', 1, '[]', '[]'),
(31, 1, 'test middleware', '', '', 0, '', '', 1, '[]', '[]'),
(32, 1, 'test middleware', '', '', 0, '', '', 1, '[]', '[]'),
(33, 1, 'test middleware', '', '', 0, '', '', 1, '[]', '[]'),
(34, 1, 'test middleware', '', '', 0, '', '', 1, '[]', '[]'),
(35, 1, 'salsa bolognesa', '', '', 0, '', '', 1, '[\"carne picada\"]', '[{\"paso\":\"\",\"imagen\":\"\"}]'),
(36, 1, 'test middleware', 'mezcla todo como venga ameo', '', 1, '5 personas', '1 hora', 0, '[{\"name\":\"15 cucharadas de azúcar\"},{\"name\":\"15 cucharadas de harina leudante\"},{\"name\":\"1 huevo\"},{\"name\":\"100 gramos de margarina repostera\"},{\"name\":\"3 cucharaditas de vainilla líquida\"},{\"name\":\"5 cucharadas de chocolate en polvo\"}]', '[{\"paso\":\"paso2 blabla blabla\",\"imagen\":\"\"},{\"paso\":\"paso1 blabla blabla\",\"imagen\":\"\"}]');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int(11) UNSIGNED NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `usuario` varchar(16) NOT NULL,
  `contrasena` varchar(255) NOT NULL COMMENT 'pass: usuario123',
  `mail` varchar(50) NOT NULL,
  `imagen` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `apellidos`, `nombres`, `usuario`, `contrasena`, `mail`, `imagen`) VALUES
(1, '', '', 'usuario123', '$2a$10$733Dv09gafNx74PombmlW.9CtTu2HolqqTxJ3bW2lRxLkTbN5vYEu', 'mail_123@update.com', NULL),
(2, '', '', 'usuario456', '$2a$10$733Dv09gafNx74PombmlW.9CtTu2HolqqTxJ3bW2lRxLkTbN5vYEu', 'usu456@ario.com', NULL),
(3, '', '', 'usuario124', '$2a$10$733Dv09gafNx74PombmlW.9CtTu2HolqqTxJ3bW2lRxLkTbN5vYEu', 'mail@testeo.com', NULL),
(5, '', '', 'usuarioTest', '$2a$10$DiZim3xEPrsAmcuZuqx6pepMxXDfxwf8Q7aFkscnKZ9WENCR8LI3i', 'mail_equisde@testeo.com', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `archivos`
--
ALTER TABLE `archivos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ix_usuario` (`idUsuario`) USING BTREE;

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `recetas`
--
ALTER TABLE `recetas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ix_usuario` (`idUsuario`) USING BTREE;

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_usuario` (`usuario`) USING BTREE,
  ADD UNIQUE KEY `uq_mail` (`mail`) USING BTREE,
  ADD KEY `ix_usuario` (`usuario`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `archivos`
--
ALTER TABLE `archivos`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
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
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `archivos`
--
ALTER TABLE `archivos`
  ADD CONSTRAINT `fk_usuario2` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `recetas`
--
ALTER TABLE `recetas`
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
