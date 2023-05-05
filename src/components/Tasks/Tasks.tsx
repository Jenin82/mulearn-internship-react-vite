import { Task } from '../Task/Task';
import styles from './tasks.module.css';

interface item {
	id: string;
	title: string;
	isCompleted: boolean;
}

type nitem = { 
	tasks: item[]; 
	onDelete: (taskId: string) => void; 
	onComplete: (taskId: string) => void; 
}

export function Tasks({ tasks, onDelete, onComplete }:nitem) {
  const tasksQuantity = tasks.length;
  const completedTasks = tasks.filter((task:any) => task.isCompleted).length;

  return (
    <section className={styles.tasks}>
      <header className={styles.header}>
        <div>
          <p>Created tasks</p>
          <span>{tasksQuantity}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Completed tasks</p>
          <span>{completedTasks} of {tasksQuantity}</span>
        </div>
      </header>
      <div className={styles.list}>
        {tasks.map((task) => (
					<Task key={task.id} task={task} onDelete={onDelete} onComplete={onComplete} />
					))}
      </div>
    </section>
  )
}