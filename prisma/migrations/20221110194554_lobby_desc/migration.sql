/*
  Warnings:

  - You are about to drop the column `Description` on the `Lobby` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lobby" DROP COLUMN "Description",
ADD COLUMN     "description" TEXT;
