import React, { useState, useEffect } from 'react';
import { 
    PaymentContainer, 
    PaymentTitle, 
    PaymentOptionsContainer,
    PaymentOption, 
    RadioButton, 
    RadioInput, 
    RadioCircle, 
    PaymentIcon, 
    PaymentName,
} from './styles/PaymentMethodSelection.styles.jsx';

export const PaymentMethodSelection = ({ allow, pagamentoMetodo }) => {
    const [paymentMethod, setPaymentMethod] = useState(null);

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(currentMethod => currentMethod === method ? null : method);
        pagamentoMetodo(method === paymentMethod ? null : method);
    };

    useEffect(() => {
        if (paymentMethod) {
            allow(true);
        } else {
            allow(false);
        }
    }, [paymentMethod, allow]);

    return (
        <PaymentContainer>
            <PaymentTitle>Escolha como pagar</PaymentTitle>

            <PaymentOptionsContainer>
                <PaymentOption
                    selected={paymentMethod === 'pix'}
                    onClick={() => handlePaymentMethodChange('pix')}
                >
                    <RadioButton>
                        <RadioInput
                            type="radio"
                            checked={paymentMethod === 'pix'}
                            onChange={() => handlePaymentMethodChange('pix')}
                        />
                        <RadioCircle selected={paymentMethod === 'pix'} />
                    </RadioButton>
                    <PaymentIcon>
                        <i className="fas fa-qrcode"></i>
                    </PaymentIcon>
                    <PaymentName>Pix</PaymentName>
                </PaymentOption>

                <PaymentOption
                    selected={paymentMethod === 'credito'}
                    onClick={() => handlePaymentMethodChange('credito')}
                    highlight
                >
                    <RadioButton>
                        <RadioInput
                            type="radio"
                            checked={paymentMethod === 'credito'}
                            onChange={() => handlePaymentMethodChange('credito')}
                        />
                        <RadioCircle selected={paymentMethod === 'credito'} />
                    </RadioButton>
                    <PaymentIcon>
                        <i className="far fa-credito-card"></i>
                    </PaymentIcon>
                    <PaymentName>Cartão de crédito</PaymentName>
                </PaymentOption>

                <PaymentOption
                    selected={paymentMethod === 'boleto'}
                    onClick={() => handlePaymentMethodChange('boleto')}
                >
                    <RadioButton>
                        <RadioInput
                            type="radio"
                            checked={paymentMethod === 'boleto'}
                            onChange={() => handlePaymentMethodChange('boleto')}
                        />
                        <RadioCircle selected={paymentMethod === 'boleto'} />
                    </RadioButton>
                    <PaymentIcon>
                        <i className="fas fa-barcode"></i>
                    </PaymentIcon>
                    <PaymentName>Boleto</PaymentName>
                </PaymentOption>
            </PaymentOptionsContainer>
        </PaymentContainer>
    );
};

export default PaymentMethodSelection;