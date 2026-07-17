-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "activities" JSONB,
ADD COLUMN     "operatorType" TEXT;

-- CreateIndex
CREATE INDEX "Listing_operatorType_idx" ON "Listing"("operatorType");
