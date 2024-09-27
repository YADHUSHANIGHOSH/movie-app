// import React, { useState } from 'react';
// import styles from './SeatSelector.module.css';

// const rows = 5; // Number of rows
// const cols = 10; // Number of columns

// const SeatSelector = () => {
//   const [selectedSeats, setSelectedSeats] = useState([]);

//   const toggleSeatSelection = (seatNumber) => {
//     setSelectedSeats((prevSelectedSeats) =>
//       prevSelectedSeats.includes(seatNumber)
//         ? prevSelectedSeats.filter((seat) => seat !== seatNumber)
//         : [...prevSelectedSeats, seatNumber]
//     );
//   };

//   const renderSeats = () => {
//     const seats = [];
//     for (let row = 1; row <= rows; row++) {
//       for (let col = 1; col <= cols; col++) {
//         const seatNumber = `${row}-${col}`;
//         seats.push(
//           <div
//             key={seatNumber}
//             className={`${styles.seat} ${
//               selectedSeats.includes(seatNumber) ? styles.selectedSeat : ''
//             }`}
//             onClick={() => toggleSeatSelection(seatNumber)}
//           >
//             {seatNumber}
//           </div>
//         );
//       }
//     }
//     return seats;
//   };

//   return (
//     <div>
//       <h2>Seat Selection</h2>
//       <div className={styles.seatContainer}>{renderSeats()}</div>
//       <div className={styles.seatInfo}>
//         <p>Total Seats: {rows * cols}</p>
//         <p>Selected Seats: {selectedSeats.length}</p>
//         <p>Available Seats: {rows * cols - selectedSeats.length}</p>
//         <input
//           type="text"
//           value={selectedSeats.join(', ')}
//           readOnly
//           placeholder="Selected seats"
//         />
//       </div>
//     </div>
//   );
// };

// export default SeatSelector;
