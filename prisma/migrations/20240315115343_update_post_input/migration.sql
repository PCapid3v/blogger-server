-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "authorName" TEXT,
ALTER COLUMN "category" DROP NOT NULL,
ALTER COLUMN "category" DROP DEFAULT;
