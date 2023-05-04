import styles from './task.module.css';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { TbTrash } from 'react-icons/tb';

interface item {
	id: string;
	title: string;
	isCompleted: boolean;
}

type titem = { 
	key: string; task: item; 
	onDelete: (taskId: string) => void; 
	onComplete: (taskId: string) => void; 
}

export function Task({ task, onDelete, onComplete }:titem) {
  return (
		<div>
			<hr />
			<div className={styles.task}>
				<button className={styles.checkContainer} onClick={() => onComplete(task.id)}>
					{task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
				</button>

				<p className={task.isCompleted ? styles.textCompleted : ""}>
					{task.title}
				</p>

				<button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
					<TbTrash size={20} />
				</button>
			</div>
		</div>
  )
}