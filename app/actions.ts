import { TodoList } from "./src/services/database";

export const addToList = async (item: string) => {
  try {
    const response = await fetch('/api/todo', {
      method: 'POST',
      body: JSON.stringify({item: item})
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};

export const getTodos = async(status: string): Promise<TodoList[]> => {
  const response = await fetch('http://localhost:3000/api/todo');
  if (response.ok) {
    const items = await response.json();
    if(status === 'All'){
      return items;
    } else if (status === 'Active') {
      const activeItems = items.filter(item => item.status === 'Active');
      return activeItems;
    } else if(status === 'Completed') {
      const completedItems = items.filter(item => item.status === 'Completed');
      return completedItems;
    }
  }
  return [];
}

export const deleteTodoItem = async (id: string) => {
  try {
    const response = await fetch(`/api/todo`, {
      method: 'DELETE',
      body: JSON.stringify({id: id})
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};

export const clearCompletedItems = async () => {
  try {
    const response = await fetch('/api/todo/clear', {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};

export const countItemsLeft = async () => {
  try {
    const response = await fetch('/api/todo/count');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};

export const updateTodoItem = async (id: string, status: string) => {
  try {
    if (status === 'Active') {
      const response = await fetch('/api/todo/update', {
        method: 'POST',
        body: JSON.stringify({ id: id, status: 'Completed' })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } else {
      const response = await fetch('/api/todo/update', {
        method: 'POST',
        body: JSON.stringify({ id: id, status: 'Active' })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    }

  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};



