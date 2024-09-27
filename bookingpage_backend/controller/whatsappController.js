import twilio from 'twilio';
import whatsappModel from '../model/whatsappModel.js';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromWhatsAppNumber = 'whatsapp:+14155238886';
const client = twilio(accountSid, authToken);

export const sendWhatsAppMessage = async (req, res) => {
  if (req.method === 'POST') {
    const { phoneNumber, ticket } = req.body;

    console.log('Received phoneNumber:', phoneNumber);
    console.log('Received Ticket:', ticket);

    if (!ticket) {
      console.log('Ticket data is missing');
      return res.status(400).json({ message: 'Ticket data is missing' });
    }

    const message = `
    Ticket Confirmation:
    Movie: ${ticket.moviename}
    Theater: ${ticket.theaterName}
    Date: ${ticket.date}
    Time: ${ticket.showTime}
    Seats: ${ticket.seats}
    Seat Names: ${ticket.seatnames.join(', ')}
    Price: ₹${ticket.ticketPrice}
    `;

    try {
      const msg = await client.messages.create({
        from: fromWhatsAppNumber,
        to: `whatsapp:${phoneNumber}`,
        body: message,
      });
      console.log('Message SID:', msg.sid);
      await whatsappModel.create({
        phoneNumber,
        sentAt: new Date(),
      });
      res.status(200).json({ message: 'WhatsApp message sent successfully' });
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      res.status(500).json({ message: 'Error sending WhatsApp message', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
