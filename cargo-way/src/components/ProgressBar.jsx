import React from 'react';

const ProgressBar = ({ currentStep, steps=[] }) => {

    return (
        <div className="progress-bar">
            {steps.map((item, index) => (
                <React.Fragment key={index}>
                    <div
                        className={`progress-bar__step ${index < currentStep
                                ? "progress-bar__step--completed"
                                : index === currentStep
                                    ? "progress-bar__step--current"
                                    : ""
                            }`}
                    >
                        {item}
                    </div>
                    {index < steps.length - 1 && (
                        <div
                            className={`progress-bar__line ${index < currentStep ? "progress-bar__line--completed" : ""
                                }`}
                        ></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}

export default ProgressBar;