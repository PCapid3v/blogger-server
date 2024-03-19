-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'Uncategorized',
ADD COLUMN     "subCategory" TEXT[];
