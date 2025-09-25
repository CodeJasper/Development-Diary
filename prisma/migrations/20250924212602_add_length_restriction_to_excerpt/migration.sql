/*
  Warnings:

  - You are about to alter the column `excerpt` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "excerpt" SET DATA TYPE VARCHAR(255);
