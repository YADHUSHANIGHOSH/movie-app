'use client';

import React, { useState } from 'react';
import Style from './seatModal.module.css';

const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
const seatsPerRow = 10;

interface Seat {
  row: string;
  number: number;
}

const SeatModal = ({ onClose, onSeatSelect }: { onClose: () => void, onSeatSelect: (seats: Seat[]) => void }) => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const toggleSeatSelection = (seat: Seat) => {
    const isSelected = selectedSeats.some(
      (selectedSeat) => selectedSeat.row === seat.row && selectedSeat.number === seat.number
    );

    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat.row !== seat.row || selectedSeat.number !== seat.number));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleSubmit = () => {
    console.log('Selected seats:', selectedSeats);
    onSeatSelect(selectedSeats); // Pass the selected seats back to the Booking component
    onClose();
  };

  return (
    <div className={Style.modal}>
      <div className={Style.modalContent}>
        <h2>Select Seats</h2>
        <div className={Style.seatContainer}>
          {rows.map((row) => (
            <div key={row} className={Style.row}>
              {Array.from({ length: seatsPerRow }, (_, i) => i + 1).map((number) => (
                <div
                  key={number}
                  className={`${Style.seat} ${selectedSeats.some((seat) => seat.row === row && seat.number === number) ? Style.selected : ''}`}
                  onClick={() => toggleSeatSelection({ row, number })}
                >
                  {row}{number}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={Style.selectedSeatsInfo}>
          {selectedSeats.length > 0 ? (
            <>
              <p>Number of selected seats: {selectedSeats.length}</p>
              <p>Selected seats: {selectedSeats.map(seat => `${seat.row}${seat.number}`).join(', ')}</p>
            </>
          ) : (
            <p>No seats selected</p>
          )}
        </div>
        <div className={Style.modalActions}>
          <button className={Style.closeButton} onClick={onClose}>Close</button>
          <button className={Style.submitButton} onClick={handleSubmit}>Book</button>
        </div>
      </div>
    </div>
  );
};

export default SeatModal;
