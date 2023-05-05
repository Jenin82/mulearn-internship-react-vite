import styles from './header.module.css';
import { useState } from 'react';

export function Header({ handleAddTask }:any) {
  const [title, setTitle] = useState('');

  function handleSubmit(event:any) {
    event.preventDefault();

    handleAddTask(title);
    setTitle('');
  }

  function onChangeTitle(event:any) {
    setTitle(event.target.value);
  }

  return (
		<div className={styles.container}>
			<div className={styles.bg_image_container}>
				<img className={styles.bg_image} src="https://wallpaperaccess.com/full/1630412.jpg" alt="" />
			</div>
			<header className={styles.header}>
				<div className={styles.headerText}>
					<h1 className={styles.Text}>TODO</h1>
				</div>
				<form onSubmit={handleSubmit} className={styles.newTaskForm}> 
					<input placeholder="Add a new task" type="text" onChange={onChangeTitle} value={title} />
				</form>
			</header>
		</div>
  )
}