/*
  Warnings:

  - You are about to drop the column `eventId` on the `Hobby` table. All the data in the column will be lost.
  - You are about to drop the column `departamentId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Departament` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `departmentId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `fullname` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companyId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_companyId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_departamentId_fkey";

-- AlterTable
ALTER TABLE "Hobby" DROP COLUMN "eventId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "departamentId",
ADD COLUMN     "departmentId" TEXT NOT NULL,
ALTER COLUMN "fullname" SET NOT NULL,
ALTER COLUMN "companyId" SET NOT NULL;

-- DropTable
DROP TABLE "Departament";

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
