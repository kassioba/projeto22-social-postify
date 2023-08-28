/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Media` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[postId]` on the table `Publication` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Publication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Publication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "text" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Publication" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "postId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Media_username_key" ON "Media"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Publication_postId_key" ON "Publication"("postId");

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
