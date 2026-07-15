/*
  Warnings:

  - Made the column `sourceUrl` on table `Listing` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "accessibilityNotes" TEXT,
ADD COLUMN     "ageMinimum" INTEGER,
ADD COLUMN     "beginnerFriendly" BOOLEAN,
ADD COLUMN     "city" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "citySlug" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "dropIn" BOOLEAN,
ADD COLUMN     "lastVerified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lat" DOUBLE PRECISION,
ADD COLUMN     "lng" DOUBLE PRECISION,
ADD COLUMN     "nonResidentPrice" TEXT,
ADD COLUMN     "parkingNotes" TEXT,
ADD COLUMN     "registrationRequired" BOOLEAN,
ADD COLUMN     "registrationUrl" TEXT,
ADD COLUMN     "residentPrice" TEXT,
ADD COLUMN     "residentRequired" BOOLEAN,
ADD COLUMN     "transitNotes" TEXT,
ALTER COLUMN "sourceUrl" SET NOT NULL,
ALTER COLUMN "sourceUrl" SET DEFAULT '';

-- CreateIndex
CREATE INDEX "Listing_citySlug_idx" ON "Listing"("citySlug");
