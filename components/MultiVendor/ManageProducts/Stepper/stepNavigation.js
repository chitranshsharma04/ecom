import Step from './step';
import StyleStepper from '@styles/stepper.module.css';
//this is the starting point
export default function StepNavigation(props) {
	return (
		<div className={StyleStepper.stepWrapper}>
			{props.labelArray.map((item, index) => (
				<Step
					key={index}
					index={index}
					label={item}
					updateStep={props.updateStep}
					selected={props.currentStep === index + 1}
				 />
			))}
		</div>
	);
}
