import styles from './footer.module.css';
import { FaHeart } from "react-icons/fa";

export const Footer = () => {
	return (
		<div className={styles.body}>
			<span className={styles.span}>
				Made with <FaHeart className={styles.fa} /> by <a className={styles.a} href="https://github.com/Jenin82" target="_blank">Jenin</a>
			</span>
		</div>
	)
}
