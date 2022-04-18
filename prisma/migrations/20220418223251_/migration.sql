/*
  Warnings:

  - You are about to drop the column `user_id` on the `todo` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `todo` DROP FOREIGN KEY `todo_user_id_fkey`;

-- AlterTable
ALTER TABLE `todo` DROP COLUMN `user_id`,
    ADD COLUMN `done` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `user`;
