import { fetchTodo, insertTodo, deleteTodo } from "@/app/src/services/database"

export async function GET() {
  const items = fetchTodo();
  return Response.json(items)
} 

export async function POST(request: Request) {
  const data = await request.json();
  const { item } = data;
  insertTodo(item);
  return new Response(null, {
    status: 200,
  })
}

export async function DELETE(request: Request) {
  const data = await request.json();
  const { id } = data;
  deleteTodo(id);
  return new Response(null, {
    status: 200,
  });
}