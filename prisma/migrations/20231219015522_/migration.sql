/*
  Warnings:

  - A unique constraint covering the columns `[externalId]` on the table `Items` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Items_externalId_key` ON `Items`(`externalId`);
