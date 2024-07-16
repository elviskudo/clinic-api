/*
  Warnings:

  - Made the column `status` on table `Summary` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Summary` MODIFY `status` ENUM('waiting', 'diagnosed', 'checkout', 'completed', 'rejected') NOT NULL;
