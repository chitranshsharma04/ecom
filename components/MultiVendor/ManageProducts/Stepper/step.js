import StyleStepper from '@styles/stepper.module.css';
//this is the starting point
export default function Step(props) {
	return (
		<div className={StyleStepper.stepBlock}>
			<div
				className={StyleStepper.circleWrapper}
				// onClick={() => props.updateStep(props.index + 1)}
			>
				<div
					className={
						props.selected
							? StyleStepper.selected
							: StyleStepper.circle
					}
				>
					{props.index + 1}
				</div>
			</div>
			<span
				className={
					props.selected
						? StyleStepper.circleLabelBefore
						: StyleStepper.circleLabelAfter
				}
			>
				{props.label}
			</span>
		</div>
	);
}
