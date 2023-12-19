-- CreateTable
CREATE TABLE `Importations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `importationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `rawContent` TEXT NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `externalId` VARCHAR(500) NOT NULL,
    `importDate` DATETIME(3) NOT NULL,
    `title` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `publicationDate` DATETIME(3) NOT NULL,
    `link` TEXT NOT NULL,
    `mainPicture` TEXT NOT NULL,
    `importationId` INTEGER NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_importationId_fkey` FOREIGN KEY (`importationId`) REFERENCES `Importations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
