-- DropForeignKey
ALTER TABLE "Hobby" DROP CONSTRAINT "Hobby_eventId_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "minCapacity" DROP NOT NULL,
ALTER COLUMN "maxCapacity" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_EventToHobby" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EventToHobby_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_EventToHobby_B_index" ON "_EventToHobby"("B");

-- AddForeignKey
ALTER TABLE "_EventToHobby" ADD CONSTRAINT "_EventToHobby_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToHobby" ADD CONSTRAINT "_EventToHobby_B_fkey" FOREIGN KEY ("B") REFERENCES "Hobby"("id") ON DELETE CASCADE ON UPDATE CASCADE;
