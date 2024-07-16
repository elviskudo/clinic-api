-- AlterTable
ALTER TABLE `Record` ADD COLUMN `city_id` BIGINT NULL;

-- AddForeignKey
ALTER TABLE `Record` ADD CONSTRAINT `Record_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `wilayah`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
