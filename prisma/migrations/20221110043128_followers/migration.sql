/*
  Warnings:

  - You are about to drop the `_Friend` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Friend" DROP CONSTRAINT "_Friend_A_fkey";

-- DropForeignKey
ALTER TABLE "_Friend" DROP CONSTRAINT "_Friend_B_fkey";

-- DropTable
DROP TABLE "_Friend";

-- CreateTable
CREATE TABLE "_Follow" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Follow_AB_unique" ON "_Follow"("A", "B");

-- CreateIndex
CREATE INDEX "_Follow_B_index" ON "_Follow"("B");

-- AddForeignKey
ALTER TABLE "_Follow" ADD CONSTRAINT "_Follow_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Follow" ADD CONSTRAINT "_Follow_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
