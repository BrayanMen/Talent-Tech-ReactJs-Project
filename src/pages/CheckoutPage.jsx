import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft } from 'lucide-react';
import './CheckoutPage.css';
import EmptyCart from '../components/EmptyCart';
import OrderComplete from '../components/OrderComplete';
import CheckoutForm from '../components/CheckoutForm';
import CheckoutSteps from '../components/CheckoutSteps';
import PaymentForm from '../components/PaymentForm';
import OrderSummary from '../components/OrderSummary';
import { useAuth } from '../context/AuthContext';
import toast from '../components/ui/Toast';

const CheckoutPage = () => {
  const { cart, totalCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || '',
    
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
  });
  
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateShippingInfo = () => {
    const { firstName, lastName, email, phone, address, city, state, zipCode, country } = formData;
    if (!firstName || !lastName || !email || !phone || !address || !city || !state || !zipCode || !country) {
      toast.show("Por favor, rellene todos los campos obligatorios","error");
      return false;
    }
    return true;
  };

  const validatePaymentInfo = () => {
    const { cardName, cardNumber, cardExpiry, cardCVV } = formData;
    if (!cardName || !cardNumber || !cardExpiry || !cardCVV) {
      toast.show("Por favor, rellene todos los datos de pago.","error");
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (step === 1 && validateShippingInfo()) {
      setStep(2);
    }
  };

  const prevStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePaymentInfo()) return;
    
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      clearCart();
    }, 2000);
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (cart.length === 0 && !isComplete) {
    return <EmptyCart onBrowseProducts={() => navigate('/products')} />;
  }

  if (isComplete) {
    return (
      <OrderComplete
        email={formData.email}
        onContinueShopping={handleContinueShopping}
      />
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <button 
            onClick={() => navigate(-1)}
            className="back-button"
          >
            <ArrowLeft size={16} className="back-icon" /> Atras
          </button>
          <h1 className="checkout-title">Checkout</h1>
        </div>
        
        <CheckoutSteps currentStep={step} />
        
        <div className="checkout-content">
          <div className="form-section">
            <div className="form-container">
              {step === 1 && (
                <CheckoutForm 
                  formData={formData}
                  onInputChange={handleInputChange}
                  onNext={nextStep}
                />
              )}
              
              {step === 2 && (
                <PaymentForm
                  formData={formData}
                  onInputChange={handleInputChange}
                  onSubmit={handleSubmit}
                  onPrevious={prevStep}
                  isProcessing={isProcessing}
                />
              )}
            </div>
          </div>
          
          <div className="summary-section">
            <OrderSummary
              cart={cart}
              totalCart={totalCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;