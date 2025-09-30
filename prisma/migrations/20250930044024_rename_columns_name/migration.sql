/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `PostImage` table. All the data in the column will be lost.
  - Added the required column `url` to the `PostImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PostImage" DROP COLUMN "imageUrl",
ADD COLUMN     "url" TEXT NOT NULL;
