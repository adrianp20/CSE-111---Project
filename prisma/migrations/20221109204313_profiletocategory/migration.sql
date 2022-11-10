-- CreateTable
CREATE TABLE "_CategoryToProfile" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToProfile_AB_unique" ON "_CategoryToProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToProfile_B_index" ON "_CategoryToProfile"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToProfile" ADD CONSTRAINT "_CategoryToProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProfile" ADD CONSTRAINT "_CategoryToProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
