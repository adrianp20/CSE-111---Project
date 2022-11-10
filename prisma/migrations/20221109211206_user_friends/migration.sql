-- CreateTable
CREATE TABLE "_Friend" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Friend_AB_unique" ON "_Friend"("A", "B");

-- CreateIndex
CREATE INDEX "_Friend_B_index" ON "_Friend"("B");

-- AddForeignKey
ALTER TABLE "_Friend" ADD CONSTRAINT "_Friend_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Friend" ADD CONSTRAINT "_Friend_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
