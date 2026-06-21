import { clearCompleted } from "@/app/src/services/database"

export async function POST(request: Request) {
  clearCompleted()
  return new Response(null, {
    status: 200,
  })
}