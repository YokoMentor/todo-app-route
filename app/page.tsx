'use client'
import { useState, useEffect, ChangeEvent } from 'react';
import styles from './page.module.css';
import { addToList, getTodos, deleteTodoItem, countItemsLeft, clearCompletedItems, updateTodoItem } from './actions'
import { TodoList } from './src/services/database'

export default function Page() {
  const darkBgStyle = `${styles.bg_dark} relative flex flex-col min-h-screen justify-center items-center bg-bg-dark bg-no-repeat bg-contain`;
  const lightBgStyle = `${styles.bg_light} relative flex flex-col min-h-screen justify-center items-center bg-bg-light bg-no-repeat bg-contain`;
  const darkContainerBg = 'bg-container-dark';
  const lightContainerBg = 'bg-container-light'
  const darkDivider = 'divide-primary-purple';
  const lightDivider = 'divide-primary-grey';
  const darkBorder = 'border-primary-purple';
  const lightBorder = 'border-primary-grey';
  const darkTxtCompleted = 'has-checked:text-primary-purple';
  const lightTxtCompleted = 'has-checked:text-primary-grey';
  const darkTxtActive = 'text-txt-hover';
  const lightTxtActive = 'text-primary-purple';
  const darkTxt = 'text-txt-dark';
  const lightTxt = 'text-txt-light';
  const darkInput = 'placeholder:text-txt-dark text-txt-hover';
  const lightInput = 'placeholder:text-txt-light text-primary-purple';
  const darkHover = 'hover:text-txt-hover';
  const lightHover = 'hover:text-primary-purple';

  const [darkTheme, setDarkTheme] = useState(true);
  const [themeSwitch, setThemeSwitch] = useState(true);
  const [todoItem, setTodoItem] = useState('');
  const [toDoList, setTodoList] = useState<TodoList[]>([]);
  const [activeLeft, setActiveLeft] = useState(3);
  const [fetchTodoStatus, setFetchTodoStatus] = useState('All');

  useEffect(() => {
    const init = async () =>  {
    const items = await getTodos(fetchTodoStatus);
    setTodoList(items);
    handleCountItemsLeft();
  }
  init();
  }, [])

  function handleThemeSwitcher() {
    if (themeSwitch) {
      setDarkTheme(true);
    } else {
      setDarkTheme(false);
    }
    setThemeSwitch(!themeSwitch);
  }

  function handleTodoItemChange(event: ChangeEvent<HTMLInputElement>){
    event.preventDefault();
    setTodoItem(event.target.value);
  }

  function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const init = async () =>  {
      await addToList(todoItem);
      const items = await getTodos(fetchTodoStatus);
      setTodoList(items);
      setTodoItem(''); //clearing item after submit
      handleCountItemsLeft();
    }
    init();
    }

  async function toggleChecked(id: string, status: string) {
    await updateTodoItem(id, status);
    const items = await getTodos(fetchTodoStatus);
    setTodoList(items);
    handleCountItemsLeft();
  }

  async function handleDelete(id: string) {
    await deleteTodoItem(id);
    const items = await getTodos(fetchTodoStatus);
    setTodoList(items);
    handleCountItemsLeft();
  };

  async function handleCountItemsLeft() {
    const items = await countItemsLeft();
    setActiveLeft(items);
  };

  async function handleClearCompleted(status: string) {
    await clearCompletedItems();
    const items = await getTodos(fetchTodoStatus);
    setTodoList(items);
    handleCountItemsLeft();
  };

  async function handleShowAll() {
    setFetchTodoStatus('All');
    const items = await getTodos('All');
    setTodoList(items);
  }

  async function handleShowActive() {
    setFetchTodoStatus('Active');
    const items = await getTodos('Active');
    setTodoList(items);
  }

  async function handleShowCompleted() {
    setFetchTodoStatus('Completed');
    const items = await getTodos('Completed');
    setTodoList(items);
  }

  return (
    <div className={`${darkTheme ? darkBgStyle : lightBgStyle}`}>
      <div className='absolute top-11 md:top-17 flex flex-col justify-center items-center w-[328px] md:w-[540px]'>
        <div className='flex justify-between items-baseline w-full mb-6 md:mb-8'>
          <h1 className='font-bold text-[27px] md:text-[40px] text-white tracking-[.36em]'>TODO</h1>
          <button className={`${darkTheme ? styles.icon_sun : styles.icon_moon} w-[20px] h-[20px] md:w-[27px] md:h-[27px] bg-no-repeat bg-center bg-contain cursor-pointer`} onClick={handleThemeSwitcher}></button>
        </div>
        <form className={`flex items-center w-full ${darkTheme ? darkContainerBg : lightContainerBg} rounded-md h-[48px] md:h-[64px] mb-4 md:mb-6`} onSubmit={handleSubmit}>
          <div className={`border ${darkTheme ? darkBorder : lightBorder} rounded-full w-[20px] h-[20px] md:w-[25px] md:h-[25px] ml-5 md:ml-6 mr-3 md:mr-6`}></div>
          <input  type="text" placeholder='Create a new todo...' value={todoItem} className={`${darkTheme ? darkInput : lightInput} text-xs md:text-lg focus:outline-none`} onChange={handleTodoItemChange} />
        </form>
        <div className={`w-full rounded-md overflow-hidden text-xs md:text-lg ${darkTheme ? darkDivider : lightDivider} divide-y-1`}>
          <ul className={`${darkTheme ? darkDivider : lightDivider} divide-y-1`}>
            {toDoList.map((todo, index) => (
              <li key={index}>
                <div className={`flex items-center w-full ${darkTheme ? darkContainerBg : lightContainerBg} h-[52px] md:h-[64px] ${darkTheme ? darkTxtActive : lightTxtActive} has-checked:line-through ${darkTheme ? darkTxtCompleted : lightTxtCompleted} justify-between`}>
                  <label htmlFor={index.toString()} className='flex items-center'>
                    <div className='relative flex items-center justify-center cursor-pointer'>
                      <input type="checkbox" checked={(todo.status!=='Active')} onChange={_=>toggleChecked(todo.id, todo.status)} name="action" id={index.toString()} className={`peer w-[20px] h-[20px] md:w-[25px] md:h-[25px] ml-5 md:ml-6  mr-3 md:mr-6 rounded-full appearance-none border ${darkTheme ? darkBorder : lightBorder} hover:border-checkbox-hover`}/>
                      <span className={`${styles.icon_check} bg-center absolute w-[20px] h-[20px] md:w-[25px] md:h-[25px] ml-5 md:ml-6 mr-3 md:mr-6 rounded-full opacity-0 peer-checked:opacity-100`}></span>
                    </div>
                    {todo.item}
                  </label>
                  <button className={`${styles.icon_cross} w-[12px] h-[12px] md:w-[19px] md:h-[19px] bg-no-repeat bg-center bg-contain mr-5 md:mr-6 cursor-pointer`} onClick={_=>handleDelete(todo.id)}></button>
                </div>
              </li>
            ))}
          </ul>
          <div className={`flex items-center w-full ${darkTheme ? darkContainerBg : lightContainerBg} h-[52px] has-checked:line-through ${darkTheme ? darkTxtCompleted : lightTxtCompleted} justify-between ${darkTheme ? darkTxt : lightTxt}`}>
            <button className='ml-5 md:ml-6 text-xs md:w-[180px] text-left'>{activeLeft} items left</button>
            <div className={`invisible md:visible rounded-md text-sm ${darkTheme ? darkTxt : lightTxt} font-bold flex items-center justify-center w-[0px] md:w-[180px]`}>
              <button className={`focus:text-txt-active ${darkTheme ? darkHover : lightHover} cursor-pointer outline-none`} autoFocus={fetchTodoStatus==='All'} onClick={handleShowAll}>All</button>
              <button className={`mx-5 focus:text-txt-active ${darkTheme ? darkHover : lightHover} cursor-pointer`} autoFocus={fetchTodoStatus==='Active'} onClick={handleShowActive}>Active</button>
              <button className={`focus:text-txt-active ${darkTheme ? darkHover : lightHover} cursor-pointer`} autoFocus={fetchTodoStatus==='Completed'} onClick={handleShowCompleted}>Completed</button>
            </div>
            <button className={`mr-5 md:mr-6 text-xs focus:text-txt-active ${darkTheme ? darkHover : lightHover} cursor-pointer md:w-[180px] text-right`} onClick={handleClearCompleted}>Clear Completed</button>
          </div>
        </div>
        <div className={`visible md:invisible rounded-md text-sm ${darkTheme ? darkTxt : lightTxt} font-bold flex items-center justify-center w-full ${darkTheme ? darkContainerBg : lightContainerBg} h-[49px] md:h-[0px] mt-4`}>
          <button className={`focus:text-txt-active cursor-pointer outline-none`} autoFocus={fetchTodoStatus==='All'} onClick={handleShowAll}>All</button>
          <button className={`mx-5 focus:text-txt-active cursor-pointer`} autoFocus={fetchTodoStatus==='Active'} onClick={handleShowActive}>Active</button>
          <button className={`focus:text-txt-active cursor-pointer`} autoFocus={fetchTodoStatus==='Completed'} onClick={handleShowCompleted}>Completed</button>
        </div>
        <div className={`text-sm ${darkTheme ? darkTxt : lightTxt} flex items-center justify-center w-full h-[52px] mt-6 md:mt-3`}>
          Drag and drop to reorder list
        </div>
      </div>
    </div>
  );
}
