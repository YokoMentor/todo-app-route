import { updateTodo } from "@/app/src/services/database"

export async function POST(request: Request) {
  const data = await request.json(); //Get the json data from the request
  const { id, status } = data; //Extract id and status from the data
  updateTodo(id, status);
  return new Response(null, {
    status: 200,
  })
}