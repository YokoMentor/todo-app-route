import { fetchActiveItems } from "@/app/src/services/database"

export async function GET() {
  const items = fetchActiveItems();
  return Response.json(items)
} 