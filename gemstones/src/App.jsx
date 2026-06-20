import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GemstoneGrid from './components/GemstoneGrid';
import OrderForm from './components/OrderForm';
import PaymentConfirmation from './components/PaymentConfirmation';
import Footer from './components/Footer';

function App() {
  const [submittedOrder, setSubmittedOrder] = useState(null);

  const handleOrderSubmitted = (orderInfo) => {
    setSubmittedOrder(orderInfo);
    // Scroll to order section automatically
    const orderSection = document.getElementById('payment-confirmation') || document.getElementById('order-form');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDone = () => {
    // Soft reset within the SPA
    setSubmittedOrder(null);
    setTimeout(() => {
      const formSection = document.getElementById('order-form');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <>
      <Navbar />
      <Hero />
      <GemstoneGrid />
      
      {/* Switch between Form and QR Code Payment Panel */}
      {!submittedOrder ? (
        <OrderForm onSubmitSuccess={handleOrderSubmitted} />
      ) : (
        <PaymentConfirmation orderInfo={submittedOrder} onDone={handleDone} />
      )}
      
      <Footer />
    </>
  );
}

export default App;
