-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "faqs" JSONB,
ADD COLUMN     "metaDescriptionOverride" TEXT,
ADD COLUMN     "metaTitleOverride" TEXT,
ADD COLUMN     "perk" TEXT,
ADD COLUMN     "programHighlights" JSONB,
ADD COLUMN     "upcomingEvent" TEXT;
