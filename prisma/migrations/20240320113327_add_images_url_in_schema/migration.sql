/*
  Warnings:

  - Added the required column `authorAvatar` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "authorAvatar" TEXT NOT NULL,
ADD COLUMN     "cover" TEXT;
