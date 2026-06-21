import Database from "better-sqlite3";
import path from "path";

export const todoDB = new Database(
  path.join(process.cwd(), "db", "todo.db"),
  { readonly: false, fileMustExist: true }
);

export interface TodoList {
  id: string;
  item: string;
  status: string;
  created: string
};

export function insertTodo(item: string): TodoList {
    const id = crypto.randomUUID()
    const todo: TodoList = {id: id, item: item, status: 'Active', created: ''};
    const query = "insert into TODO_ITEM (id, item, status) values (?, ?, ?)"
    runQuery(todoDB, query, [todo.id, todo.item, todo.status])
    return todo;
}

export function fetchTodo(): TodoList[] {
    return fetchAll(todoDB, "select id, item, status, created from TODO_ITEM", []) as TodoList[];
}

export function deleteTodo(id: string) {
  runQuery(todoDB, "delete from TODO_ITEM where id = ?", [id]);
} 

export function fetchActiveItems(): TodoList[] {
    return fetchAll(todoDB, "select id, item, status, created from TODO_ITEM where status = 'Active'", []) as TodoList[];
}

export function clearCompleted() {
  runQuery(todoDB, "delete from TODO_ITEM where status = 'Completed'", []);
} 

export function updateTodo(id: string, status: string) {
  runQuery(todoDB, "update TODO_ITEM SET status = ? where id = ?", [status, id]);
}

export const fetchAll = (db: InstanceType<typeof Database>, sql: string, params: any[] = []) => {
  return db.prepare(sql).all(...params);
};

export const runQuery = (
  db: InstanceType<typeof Database>,
  sql: string,
  params: any[] = []
) => {
  return db.prepare(sql).run(...params);
};