SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `aspen` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `aspen` ;

-- -----------------------------------------------------
-- Table `aspen`.`Users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `aspen`.`Users` ;

CREATE TABLE IF NOT EXISTS `aspen`.`Users` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `github_id` VARCHAR(45) NULL,
  `studentNumber` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role_admin` TINYINT(1) NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL DEFAULT now(),
  `updatedAt` DATETIME NOT NULL,
  `deleteFlag` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aspen`.`Lectures`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `aspen`.`Lectures` ;

CREATE TABLE IF NOT EXISTS `aspen`.`Lectures` (
  `id` INT NOT NULL,
  `name` TEXT NOT NULL,
  `startAt` DATETIME NOT NULL DEFAULT now(),
  `deleteFlag` TINYINT(1) NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aspen`.`Subjects`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `aspen`.`Subjects` ;

CREATE TABLE IF NOT EXISTS `aspen`.`Subjects` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `url` VARCHAR(255) NULL DEFAULT NULL,
  `content` LONGTEXT NOT NULL,
  `lecture_id` INT NOT NULL,
  `startAt` DATETIME NULL DEFAULT NULL,
  `endAt` VARCHAR(45) NULL,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `deleteFlag` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`, `lecture_id`),
  INDEX `fk_subject_lecture_idx` (`lecture_id` ASC),
  CONSTRAINT `fk_subject_lecture`
    FOREIGN KEY (`lecture_id`)
    REFERENCES `aspen`.`Lectures` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aspen`.`LecturesUsers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `aspen`.`LecturesUsers` ;

CREATE TABLE IF NOT EXISTS `aspen`.`LecturesUsers` (
  `LectureId` INT NOT NULL,
  `UserId` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`LectureId`, `UserId`),
  INDEX `fk_lecture_has_user_user1_idx` (`UserId` ASC),
  INDEX `fk_lecture_has_user_lecture1_idx` (`LectureId` ASC),
  CONSTRAINT `fk_lecture_has_user_lecture1`
    FOREIGN KEY (`LectureId`)
    REFERENCES `aspen`.`Lectures` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_lecture_has_user_user1`
    FOREIGN KEY (`UserId`)
    REFERENCES `aspen`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aspen`.`SubmitStatuses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `aspen`.`SubmitStatuses` ;

CREATE TABLE IF NOT EXISTS `aspen`.`SubmitStatuses` (
  `UserId` INT NOT NULL,
  `SubjectId` INT NOT NULL,
  `id` INT NOT NULL,
  `status` INT NULL DEFAULT 0 COMMENT '0: Not yet, 1: Submitted, 2: Succeed',
  `content` LONGTEXT NULL DEFAULT NULL,
  `createdAt` DATETIME NULL DEFAULT now(),
  `updatedAt` TIMESTAMP NULL DEFAULT NULL,
  `deleteFlag` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`UserId`, `SubjectId`, `id`),
  INDEX `fk_user_has_subject_subject1_idx` (`SubjectId` ASC, `id` ASC),
  INDEX `fk_user_has_subject_user1_idx` (`UserId` ASC),
  CONSTRAINT `fk_user_has_subject_user1`
    FOREIGN KEY (`UserId`)
    REFERENCES `aspen`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_subject_subject1`
    FOREIGN KEY (`SubjectId` , `id`)
    REFERENCES `aspen`.`Subjects` (`id` , `lecture_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
