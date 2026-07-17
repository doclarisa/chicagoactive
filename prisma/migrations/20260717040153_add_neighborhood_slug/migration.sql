-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "neighborhoodSlug" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE INDEX "Listing_neighborhoodSlug_idx" ON "Listing"("neighborhoodSlug");
