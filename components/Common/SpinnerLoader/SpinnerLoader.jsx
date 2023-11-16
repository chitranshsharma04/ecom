import styles from '@styles/loader.module.css';
//this is the starting point
const SpinnerLoader = ({loading}) => {
	return (
		<>
			<div
				className={
					loading
						? styles.loadingoverlayactive
						: styles.loadingoverlay
				}
			>
				<span className={styles.spinner} />
			</div>
		</>
	);
};

export default SpinnerLoader;
