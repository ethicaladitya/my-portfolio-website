import fs from "fs";
import path from "path";
import V2Client from "./V2Client";

export default async function V2Page() {
  // Fetch data server-side (at build time for static export)
  const filePath = path.join(process.cwd(), "public", "content.json");
  const fileData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(fileData);

  return <V2Client data={data} />;
}
