-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('Pending', 'Success', 'Cancelled');

-- DropForeignKey
ALTER TABLE "public"."addresses" DROP CONSTRAINT "addresses_userId_fkey";

-- CreateTable
CREATE TABLE "public"."orders" (
    "id" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_price" DOUBLE PRECISION NOT NULL,
    "ordered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "public"."Status" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_id_key" ON "public"."orders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_userId_key" ON "public"."orders"("userId");

-- AddForeignKey
ALTER TABLE "public"."addresses" ADD CONSTRAINT "addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
