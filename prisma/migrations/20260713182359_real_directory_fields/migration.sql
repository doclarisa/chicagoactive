/*
  Warnings:

  - You are about to drop the column `address` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `categories` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `enriched` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `tier` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `Listing` table. All the data in the column will be lost.
  - Added the required column `category` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `county` on table `Listing` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "address",
DROP COLUMN "categories",
DROP COLUMN "city",
DROP COLUMN "enriched",
DROP COLUMN "phone",
DROP COLUMN "tier",
DROP COLUMN "website",
DROP COLUMN "zip",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "neighborhood" TEXT,
ADD COLUMN     "sourceUrl" TEXT,
ADD COLUMN     "time" TEXT,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "county" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PUBLISHED';

-- DropEnum
DROP TYPE "Tier";

-- CreateIndex
CREATE INDEX "Listing_category_idx" ON "Listing"("category");
