-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tokenExpiresAt" TIMESTAMP(3),
ADD COLUMN     "verificationToken" TEXT;
