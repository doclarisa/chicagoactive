-- CreateEnum
CREATE TYPE "CandidateStatus" AS ENUM ('UNVERIFIED', 'NO_PROGRAM', 'NEEDS_REVIEW', 'PROMOTED');

-- CreateTable
CREATE TABLE "Candidate" (
    "id" TEXT NOT NULL,
    "orgName" TEXT NOT NULL,
    "city" TEXT,
    "county" TEXT NOT NULL,
    "officialUrl" TEXT,
    "rosterSource" TEXT NOT NULL,
    "category" TEXT,
    "status" "CandidateStatus" NOT NULL DEFAULT 'UNVERIFIED',
    "reviewNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Candidate_county_idx" ON "Candidate"("county");

-- CreateIndex
CREATE INDEX "Candidate_status_idx" ON "Candidate"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_orgName_county_key" ON "Candidate"("orgName", "county");
