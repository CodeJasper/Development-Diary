/*
  Warnings:

  - Added the required column `fullPath` to the `PostImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `PostImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PostImage" ADD COLUMN     "fullPath" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL;
