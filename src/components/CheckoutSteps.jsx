const CheckoutSteps = ({ currentStep }) => {
    return (
        <div className="checkout-steps">
            <div className="steps-container">
                <div className={`step ${currentStep === 1 ? 'active' : ''}`}>1</div>
                <div className={`step-line ${currentStep > 1 ? 'completed' : ''}`}></div>
                <div className={`step ${currentStep === 2 ? 'active' : ''}`}>2</div>
            </div>
            <div className="steps-labels">
                <div className={`step-label ${currentStep === 1 ? 'active' : ''}`}>Envio</div>
                <div className={`step-label ${currentStep === 2 ? 'active' : ''}`}>Pago</div>
            </div>
        </div>
    );
};

export default CheckoutSteps;
