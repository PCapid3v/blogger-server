-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "subCategory" DROP NOT NULL,
ALTER COLUMN "subCategory" SET DATA TYPE TEXT;
