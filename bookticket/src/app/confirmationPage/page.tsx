// 'use client';

// import React, { useEffect, useState } from 'react';
// import Style from './confirmationPage.module.css';
// import axios from 'axios';
// import { useSearchParams } from 'next/navigation';
// import toast, { Toaster } from "react-hot-toast";
// import twilio from 'twilio';

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// export interface Ticket {
//   _id: string;
//   theaterName: string;
//   ticketPrice: number;
//   date: string;
//   showTime: string;
//   moviename: string;
//   seats: number;
//   seatnames: string[];
//   phoneNumber:string,
// }

// const Confirmation = () => {
//   const searchParams = useSearchParams();
//   const ticketId = searchParams.get('ticketId');
//   const [ticket, setTicket] = useState<Ticket | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const[phoneNumber,setPhoneNumber]=useState<string>('')

//   useEffect(() => {
//     const fetchTicket = async () => {
//       if (!ticketId) {
//         setError('No ticket ID provided.');
//         setLoading(false);
//         return;
//       }
//       try {
//         const response = await axios.get(`http://localhost:8000/api/ticket/fetchoneticket/${ticketId}`);
//         setTicket(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching booking details:', error);
//         setError('Failed to fetch booking details.');
//         setLoading(false);
//       }
//     };

//     if (ticketId) {
//       fetchTicket();
//     }
//   }, [ticketId]);

//   useEffect(() => {
//     // Dynamically load the Razorpay script
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.async = true;
//     script.onload = () => {
//       console.log('Razorpay script loaded');
//     };
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   const handlePayment = async () => {
//     if (!ticket) {
//       console.error('Ticket data is not available');
//       return;
//     }

//     try {
//         const res = await fetch(`http://localhost:8000/api/payment/order`, {
//             method: "POST",
//             headers: {
//                 "content-type": "application/json"
//             },
//             body: JSON.stringify({
//                 amount: ticket.ticketPrice 
//             })
//         });

//         const data = await res.json();
//         console.log(data);
//         handlePaymentVerify(data.data)
//     } catch (error) {
//         console.log(error);
//     }
//   }

//   const handlePaymentVerify = async (data: { amount: any; currency: any; id: any; }) => {
//     if (window.Razorpay) {
//       const options = {
//           key: process.env.RAZORPAY_KEY_ID,
//           amount: data.amount,
//           currency: data.currency,
//           name: "BookMyTicket",
//           description: "Test Mode",
//           order_id: data.id,
//           handler: async (response: { razorpay_order_id: any; razorpay_payment_id: any; razorpay_signature: any; }) => {
//               console.log("response", response)
//               try {
//                   const res = await fetch(`http://localhost:8000/api/payment/verify`, {
//                       method: 'POST',
//                       headers: {
//                           'content-type': 'application/json'
//                       },
//                       body: JSON.stringify({
//                           razorpay_order_id: response.razorpay_order_id,
//                           razorpay_payment_id: response.razorpay_payment_id,
//                           razorpay_signature: response.razorpay_signature,
//                       })
//                   })

//                   const verifyData = await res.json();

//                   if (verifyData.message) {
//                       toast.success(verifyData.message)
//                   }
//               } catch (error) {
//                   console.log(error);
//               }
//           },
//           theme: {
//               color: "#5f63b8"
//           }
//       };
//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     } else {
//       console.error('Razorpay SDK not loaded');
//     }
//   }



//   // const sendWhatsAppMessage = async () => {
//   //   if (!phoneNumber) {
//   //     alert('Please enter a phone number.');
//   //     return;
//   //   }
//   //   try {
//   //     const response = await axios.post('http://localhost:8000/api/send-whatsapp', {
//   //       phoneNumber,
//   //       ticket,
//   //     });
//   //     if (response.status === 200) {
//   //       alert('WhatsApp message sent successfully.');
//   //     } else {
//   //       alert('Error sending WhatsApp message.');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error sending WhatsApp message:', error);
//   //     alert('Error sending WhatsApp message.');
//   //   }
//   // };
//   // const sendWhatsAppMessage = async () => {
//   //   if (!ticket || !ticket.phoneNumber) {
//   //     console.error('Ticket data or phone number is not available');
//   //     return;
//   //   }
  
//   //   console.log('Sending ticket data:', ticket); // Log the ticket data
  
//   //   try {
//   //     const response = await axios.post('http://localhost:8000/api/whatsapp/send-whatsapp', {
//   //       phoneNumber: ticket.phoneNumber,
//   //       ticket,
//   //     });
  
//   //     if (response.status === 200) {
//   //       toast.success('WhatsApp message sent successfully.');
//   //     } else {
//   //       toast.error('Error sending WhatsApp message.');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error sending WhatsApp message:', error);
//   //     toast.error('Error sending WhatsApp message.');
//   //   }
//   // };
  

//   const sendWhatsAppMessage = async () => {
//     if (!phoneNumber) {
//       alert('Please enter a phone number.');
//       return;
//     }
//     try {
//       const response = await axios.post('http://localhost:8000/api/send-whatsapp', {
//         phoneNumber,
//         ticket,
//       });
//       if (response.status === 200) {
//         alert('WhatsApp message sent successfully.');
//       } else {
//         alert('Error sending WhatsApp message.');
//       }
//     } catch (error) {
//       console.error('Error sending WhatsApp message:', error);
//       alert('Error sending WhatsApp message.');
//     }
//   };

//   return (
//     <div className={Style.container}>
//       <Toaster />
//       <h1>Booking Confirmation</h1>
//       {ticket && (
//         <div className={Style.details}>
//           <p><strong>Movie Name:</strong> {ticket.moviename}</p>
//           <p><strong>Theater Name:</strong> {ticket.theaterName}</p>
//           <p><strong>Show Time:</strong> {ticket.showTime}</p>
//           <p><strong>Date:</strong> {ticket.date}</p>
//           <p><strong>Number of Tickets:</strong> {ticket.seats}</p>
//           <p><strong>Seat Numbers:</strong> {ticket.seatnames.join(', ')}</p>
//           <p><strong>Amount:</strong> ₹{ticket.ticketPrice}</p>
//         </div>
//       )}
//       <button className={Style.proceedButton} onClick={handlePayment}>      
//         Proceed
//       </button>
//       <input type="text"
//       placeholder='enter phone number'
//       value={phoneNumber}
//       onChange={(e)=>setPhoneNumber(e.target.value)} />
//       <button className={Style.proceedButton} onClick={sendWhatsAppMessage}>      
//         send ticket
//       </button>
//     </div>
//   );
// };

// export default Confirmation;


'use client';

import React, { useEffect, useState } from 'react';
import Style from './confirmationPage.module.css';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import toast, { Toaster } from "react-hot-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface Ticket {
  _id: string;
  theaterName: string;
  ticketPrice: number;
  date: string;
  showTime: string;
  moviename: string;
  seats: number;
  seatnames: string[];
}

const Confirmation = () => {
  const searchParams = useSearchParams();
  const ticketId = searchParams.get('ticketId');
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  useEffect(() => {
    const fetchTicket = async () => {
      if (!ticketId) {
        setError('No ticket ID provided.');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8000/api/ticket/fetchoneticket/${ticketId}`);
        setTicket(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching booking details:', error);
        setError('Failed to fetch booking details.');
        setLoading(false);
      }
    };

    if (ticketId) {
      fetchTicket();
    }
  }, [ticketId]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay script loaded');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handlePayment = async () => {
    if (!ticket) {
      console.error('Ticket data is not available');
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/api/payment/order`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          amount: ticket.ticketPrice
        })
      });

      const data = await res.json();
      handlePaymentVerify(data.data)
    } catch (error) {
      console.log(error);
    }
  }

  const handlePaymentVerify = async (data: { amount: any; currency: any; id: any; }) => {
    if (window.Razorpay) {
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "BookMyTicket",
        description: "Test Mode",
        order_id: data.id,
        handler: async (response: { razorpay_order_id: any; razorpay_payment_id: any; razorpay_signature: any; }) => {
          try {
            const res = await fetch(`http://localhost:8000/api/payment/verify`, {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              })
            })

            const verifyData = await res.json();

            if (verifyData.message) {
              toast.success(verifyData.message)
            }
          } catch (error) {
            console.log(error);
          }
        },
        theme: {
          color: "#5f63b8"
        }
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } else {
      console.error('Razorpay SDK not loaded');
    }
  }

  const sendWhatsAppMessage = async () => {
    if (!phoneNumber) {
      alert('Please enter a phone number.');
      return;
    }
  
    if (!ticket) {
      console.error('Ticket data is not available');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8000/api/whatsapp/send-whatsapp', 
        {
        phoneNumber,
        ticket,
      });
  console.log("response",response);
  
      if (response.status === 200) {
        toast.success('WhatsApp message sent successfully.');
      } else {
        toast.error('Error sending WhatsApp message.');
      }
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      toast.error('Error sending WhatsApp message.');
    }
  };
  

  return (
    <div className={Style.container}>
      <Toaster />
      <h1>Booking Confirmation</h1>
      {ticket && (
        <div className={Style.details}>
          <p><strong>Movie Name:</strong> {ticket.moviename}</p>
          <p><strong>Theater Name:</strong> {ticket.theaterName}</p>
          <p><strong>Show Time:</strong> {ticket.showTime}</p>
          <p><strong>Date:</strong> {ticket.date}</p>
          <p><strong>Number of Tickets:</strong> {ticket.seats}</p>
          <p><strong>Seat Numbers:</strong> {ticket.seatnames.join(', ')}</p>
          <p><strong>Amount:</strong> ₹{ticket.ticketPrice}</p>
        </div>
      )}
      <button className={Style.proceedButton} onClick={handlePayment}>
        Proceed
      </button>
      <input
        type="text"
        placeholder='Enter phone number'
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button className={Style.proceedButton} onClick={sendWhatsAppMessage}>
        Send Ticket
      </button>
    </div>
  );
};

export default Confirmation;
