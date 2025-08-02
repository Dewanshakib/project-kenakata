-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('User', 'Admin');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(191) NOT NULL,
    "username" VARCHAR(191) NOT NULL,
    "email" VARCHAR(191) NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'User',
    "avater" TEXT,
    "avater_id" TEXT,
    "phone" VARCHAR(13),
    "resetPasswordToken" VARCHAR(64),
    "resetPasswordExpiry" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."addresses" (
    "id" TEXT NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50),
    "address_1" VARCHAR(191) NOT NULL,
    "address_2" VARCHAR(191),
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "public"."users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_id_key" ON "public"."addresses"("id");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_userId_key" ON "public"."addresses"("userId");

-- AddForeignKey
ALTER TABLE "public"."addresses" ADD CONSTRAINT "addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
