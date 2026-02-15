const fs = require("fs");
const path = require("path");

function deleteFolderRecursive(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
    console.log("Deleted:", dirPath);
  } else {
    console.log("Not found (skipping):", dirPath);
  }
}

const cachePaths = [
  path.resolve("/vercel/share/v0-project/.next"),
  path.resolve("/vercel/share/v0-next-shadcn/.next"),
];

for (const p of cachePaths) {
  console.log("Attempting to delete:", p);
  try {
    deleteFolderRecursive(p);
  } catch (err) {
    console.log("Error deleting", p, ":", err.message);
  }
}

console.log("Cache clear complete.");
