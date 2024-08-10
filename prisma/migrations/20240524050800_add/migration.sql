/*
  Warnings:

  - Added the required column `category` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Translate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Translate` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "groupId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "shorttag" TEXT NOT NULL,
    "text" TEXT,
    CONSTRAINT "Settings_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Languages" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Settings" ("groupId", "id", "languageId", "name", "published", "shorttag", "sortOrder", "text") SELECT "groupId", "id", "languageId", "name", "published", "shorttag", "sortOrder", "text" FROM "Settings";
DROP TABLE "Settings";
ALTER TABLE "new_Settings" RENAME TO "Settings";
CREATE UNIQUE INDEX "Settings_shorttag_languageId_key" ON "Settings"("shorttag", "languageId");
CREATE TABLE "new_Translate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "groupId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "shorttag" TEXT NOT NULL,
    "text" TEXT,
    CONSTRAINT "Translate_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Languages" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Translate" ("groupId", "id", "languageId", "name", "published", "shorttag", "sortOrder", "text") SELECT "groupId", "id", "languageId", "name", "published", "shorttag", "sortOrder", "text" FROM "Translate";
DROP TABLE "Translate";
ALTER TABLE "new_Translate" RENAME TO "Translate";
CREATE UNIQUE INDEX "Translate_shorttag_languageId_key" ON "Translate"("shorttag", "languageId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
