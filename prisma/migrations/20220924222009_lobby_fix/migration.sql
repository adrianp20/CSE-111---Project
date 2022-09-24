-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_lobbyId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lobbyId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_lobbyId_fkey" FOREIGN KEY ("lobbyId") REFERENCES "Lobby"("id") ON DELETE SET NULL ON UPDATE CASCADE;
