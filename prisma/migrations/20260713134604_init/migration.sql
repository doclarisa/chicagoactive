-- CreateEnum
CREATE TYPE "Cost" AS ENUM ('FREE', 'LOW_COST', 'PAID');

-- CreateEnum
CREATE TYPE "Tier" AS ENUM ('FREE', 'FEATURED');

-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('PUBLISHED', 'PENDING');

-- CreateTable
CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT,
    "city" TEXT NOT NULL,
    "county" TEXT,
    "zip" TEXT,
    "phone" TEXT,
    "website" TEXT,
    "categories" JSONB NOT NULL,
    "cost" "Cost" NOT NULL DEFAULT 'FREE',
    "days" JSONB,
    "enriched" JSONB,
    "tier" "Tier" NOT NULL DEFAULT 'FREE',
    "status" "ListingStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Listing_slug_key" ON "Listing"("slug");

-- CreateIndex
CREATE INDEX "Listing_county_idx" ON "Listing"("county");

-- CreateIndex
CREATE INDEX "Listing_status_idx" ON "Listing"("status");
