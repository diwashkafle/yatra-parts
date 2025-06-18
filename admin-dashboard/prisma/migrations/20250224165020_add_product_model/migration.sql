/*
  Warnings:

  - You are about to drop the column `description` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - Added the required column `costPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `crossedPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extraSizes` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numOfProduct` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regularSizes` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellingPrice` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "price",
ADD COLUMN     "costPrice" INTEGER NOT NULL,
ADD COLUMN     "crossedPrice" INTEGER NOT NULL,
ADD COLUMN     "extraSizes" INTEGER NOT NULL,
ADD COLUMN     "numOfProduct" INTEGER NOT NULL,
ADD COLUMN     "regularSizes" INTEGER NOT NULL,
ADD COLUMN     "sellingPrice" INTEGER NOT NULL;
