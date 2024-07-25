import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../styles/payment.css'

const PaymentForm = () => {

  const location = useLocation();
  const formData = location.state?.formData;
  const navigate = useNavigate();
  const randomId = Math.floor(10000000 + Math.random() * 90000000);
  // const [cardError, setCardError] = useState('');
  const { price } = 0;
  
  const [payData, setPaydat]=useState({
    id: randomId,
    cardName: '',
    cardNo: '',
    cardExp: '',
    cvv: '',
    vprice: price
  });
  // const validateCardNumber = (number) => {
  //   const digits = Array.from(number.toString()).map(Number);
  //   let sum = 0;
  //   for (let i = digits.length - 1; i >= 0; i -= 2) {
  //     sum += digits[i];
  //   }
  //   for (let i = digits.length - 2; i >= 0; i -= 2) {
  //     const doubled = digits[i] * 2;
  //     sum += (doubled > 9) ? doubled - 9 : doubled;
  //   }
  //   return sum % 10 === 0;
  // };
  // const formatCardNumber = (number) => {
  //   // Format number for display, e.g., "1234 5678 9012 3456"
  //   const numberWithoutSpaces = number.replace(/\\\\s+/g, '');
  //   return numberWithoutSpaces.replace(/(\\\\d{4})/g, '$1 ').trim();
  // };
  const cc_format = (value) => {
    const v = value.replace(/[^0-9]/gi, "").substr(0, 16);

    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substr(i, 4));
    }
    return parts.length > 1? parts.join("-") : value;
  };
  const expriy_format = (value) => {
    const expdate = value;
    const expDateFormatter =
      expdate.replace(/\//g, "").substring(0, 2) +
      (expdate.length > 2? "/" : "") +
      expdate.replace(/\//g, "").substring(2, 4);

    return expDateFormatter;
  };
  const handleChange = (e) =>{
      const { name, value } = e.target;
      // let formattedValue = value;
      setPaydat((prevData)=>({
        ...prevData,
          [name]: value,
      }));
      // if (name === "cardNo"){
      //   formattedValue = formatCardNumber(e.value);
      //   if (!validateCardNumber(formattedValue)) {
      //     const err_msg = "Invalid Card";
      //     setCardError(err_msg);
      //   }
      //   else
      //     // formattedValue = formatCardNumber(value);
      //     setPaydat({...payData, cardNo: formattedValue});
      // }
      
  };
  const pop_msg = (msg,type) => {
    Swal.fire({
      position: "center",
      icon: type,
      title: msg,
      showConfirmButton: false,
      timer: 4500
    });
}

  // const [cardname, setCardname] = useState('');
  // const [cardno, setCardno] = useState('');
  // const [expMonth, setExpMonth] = useState('');
  // const [expYear, setExpYear] = useState('');
  // const [cvv, setCvv] = useState('');
  // const [vprice, setVprice] = useState(0);
  
  // const handleVpriceChange = (event) => {
  //   setVprice(event.target.value);
  // };
// console.log(formData);
  const handlePaymentSuccess = async (event) => {
    event.preventDefault();
    try {
      // Make an API call to save booking details
      await axios.post('http://localhost:8081/api/bookings', formData);
      await axios.post('http://localhost:8081/api/payments',payData);
      pop_msg("Payment success😊😍 Detials have been sent to your mail.");
      navigate("/cars")
      console.log('Booking data sent to backend');
    } catch (error) {
      console.error('Error sending booking data:', error);
    }
  };

  return (
    <div className="container-payment">
      <form onSubmit={handlePaymentSuccess}>
        <div className="row">
          <div className="col">
            <h3 className="title">Payment</h3>
            <div className="inputBox-payment">
              <span>Amount</span>
              <input type="text" name='vprice' value={payData.vprice} onChange={handleChange} placeholder={""} />
            </div>
            <div className="inputBox-payment">
              <span>Cards Accepted :</span>
              <img src={require("../../assets/all-imges/card_img.png")} alt="" />
            </div>
            <div className="inputBox-payment">
              <span>Name on Card :</span>
              <input
                type="text"
                name='cardName'
                value={payData.cardName}
                onChange={handleChange}
                placeholder="Mr. John Deo"
              />
            </div>
            <div className="inputBox-payment">
              <span>Credit Card Number :</span>
              <input
                type="text"
                name='cardNo'
                value={cc_format(payData.cardNo)}
                onChange={handleChange}
                data-mask="0000 0000 0000 0000"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                maxLength={19}
                />
            </div>
            {/* {cardError && <div style={{ color: 'red', fontSize: '10px'}}>{cardError}</div>} */}
            <div className="inputBox-payment">
              <span>Expiration Date :</span>
              <input
                type="text"
                name='cardExp'
                value={expriy_format(payData.cardExp)}
                onChange={handleChange}
                placeholder="MM/YY"
                pattern="[0-9]{2}/[0-9]{2}"
                maxLength="5"
              />
            </div>
            {/* <div className="inputBox-payment">
              <span>Exp Month :</span>
              <input
                type="text"
                name='expMonth'
                value={payData.expMonth}
                onChange={handleChange}
                placeholder="January"
              />
            </div> */}

            <div className="flex">
              {/* <div className="inputBox-payment">
                <span>Exp Year :</span>
                <input
                  type="year"
                  name='expYear'
                  value={payData.expYear}
                  onChange={handleChange}
                  placeholder="2022"
                />
              </div> */}
              <div className="inputBox-payment">
                <span>CVV :</span>
                <input
                  type="text"
                  name='cvv'
                  value={payData.cvv}
                  onChange={handleChange}
                  placeholder="cvv"
                  maxLength="3"
                />
              </div>
            </div>
          </div>
        </div>

<input type="submit" onSubmit={handlePaymentSuccess} value="Proceed to Checkout" className="submit-btn" />
      </form>
    </div>
  );
};

export default PaymentForm;