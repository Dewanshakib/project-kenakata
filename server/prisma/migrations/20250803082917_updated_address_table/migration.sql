/*
  Warnings:

  - You are about to drop the column `address_1` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `address_2` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `addresses` table. All the data in the column will be lost.
  - Added the required column `address` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."addresses" DROP COLUMN "address_1",
DROP COLUMN "address_2",
DROP COLUMN "first_name",
DROP COLUMN "last_name",
ADD COLUMN     "address" VARCHAR(191) NOT NULL,
ADD COLUMN     "username" VARCHAR(50) NOT NULL;
