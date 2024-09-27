'use client';

import React, { useEffect, useState } from 'react';
import Style from './booking.module.css';
import Link from 'next/link';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import SeatModal from '@/components/modal/seatmodal/page';
import { useRouter } from 'next/router';

interface TheaterMovie {
  movie: {
    id: string;
    title: string;
    releaseDate: string;
    genre: string;
    duration: string;
  };
  theater: {
    id: string;
    theaterName: string;
    location: string;
  };
  showtime: string;
}

interface Seat {
  row: string;
  number: number;
}

const TMDB_API_KEY = "667d4a1053a6fd04eb20ab964b6c4a1a";

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [theaterMovies, setTheaterMovies] = useState<TheaterMovie[]>([]);
  const [theaters, setTheaters] = useState<{ id: string, name: string }[]>([]);
  const [selectedTheater, setSelectedTheater] = useState('');
  const [availableShowtimes, setAvailableShowtimes] = useState<string[]>([]);
  const [selectedShowtime, setSelectedShowtime] = useState<string>('');
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [amount, setAmount] = useState('');
  const [movieDetails, setMovieDetails] = useState<TheaterMovie["movie"] | null>(null);
  const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const tmdbId = searchParams.get("tmdbId");
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchTheaterMovies = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/theatermovies/fetchonetheatermovie/${tmdbId}`);
        setTheaterMovies(response.data);

        const theaterSet = new Set(response.data.map((tm: TheaterMovie) => `${tm.theater.id},${tm.theater.theaterName}`));
        const theaterArray = Array.from(theaterSet).map((item: any) => {
          const [id, name] = item.split(',');
          return { id, name };
        });
        setTheaters(theaterArray);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchTheaterMovies();
  }, [tmdbId]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!tmdbId) {
        return;
      }
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_API_KEY}`
        );
        setMovieDetails({
          id: response.data.id,
          title: response.data.title,
          releaseDate: response.data.release_date,
          genre: response.data.genres.map((g: any) => g.name).join(", "),
          duration: response.data.runtime
            ? `${response.data.runtime} minutes`
            : "Unknown",
        });
      } catch (error) {
        console.error("Error fetching movie details from TMDB:", error);
        setMovieDetails(null);
      }
    };  
    fetchMovieDetails();
  }, [tmdbId]);

  useEffect(() => {
    if (selectedTheater) {
      const theaterTimes = theaterMovies
        .filter((tm) => tm.theater.id === selectedTheater)
        .map((tm) => tm.showtime);
      setAvailableShowtimes(theaterTimes);
    } else {
      setAvailableShowtimes([]);
    }
  }, [selectedTheater, theaterMovies]);

  const handleSubmit = async () => {
    const selectedTheaterData = theaterMovies.find(
      (tm) => tm.theater.id === selectedTheater
    )?.theater;
  
    if (!selectedTheaterData || !tmdbId || !movieDetails?.title || !selectedDate || !selectedShowtime) {
      alert("Please select a valid movie, theater, date, and time.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:8000/api/ticket/createticket",
        {
          theaterName: selectedTheaterData.theaterName,
          ticketPrice: totalPrice, // Use the totalPrice here
          date: selectedDate.toISOString().split("T")[0],
          showTime: selectedShowtime,
          moviename: movieDetails.title,
          seats: selectedSeats.length,
          movieId: tmdbId,
          theaterId: selectedTheaterData.id,
          seatnames: selectedSeats.map((seat) => `${seat.row}${seat.number}`),
        }
      );
  
      const ticketId = response.data._id;
  
      // Redirect to confirmation page with ticketId
      window.location.href = `/confirmationPage?ticketId=${ticketId}`;
    } catch (error) {
      console.error('Error booking:', error);
    }
  };

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleIconClick = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const handleSeatSelect = (seats: Seat[]) => {
    setSelectedSeats(seats);
    calculateAmount(seats.length);
  };

  const calculateAmount = (numberOfSeats: number) => {
    const price = numberOfSeats * 100;
    setAmount(price.toString());
    setTotalPrice(price); // Update totalPrice here
  };


  const handleDateChange = (date: Date | null) => {
    if (date) {
      // Adjust the date to UTC
      const adjustedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      setSelectedDate(adjustedDate);
    }
    setIsDatePickerOpen(false);
  };


  return (
    <div className={Style.container}>
      <div className={Style.headpart}>
        <h1>Book your ticket</h1>
        <div>
          {movieDetails && (
            <>
              <h2>{movieDetails.title}</h2>
              <p>Release Date: {movieDetails.releaseDate}</p>
              <p>Genre: {movieDetails.genre}</p>
              <p>Duration: {movieDetails.duration}</p>
            </>
          )}
        </div>
      </div>
      <div className={Style.text_module}>
        <select className={Style.textarea} value={selectedTheater} onChange={(e) => setSelectedTheater(e.target.value)}>
          <option value="">Select Theater</option>
          {theaters.map(theater => (
            <option key={theater.id} value={theater.id}>
              {theater.name}
            </option>
          ))}
        </select>
      </div>
      <div className={Style.text_module}>
        <select className={Style.textarea} value={selectedShowtime} onChange={(e) => setSelectedShowtime(e.target.value)}>
          <option value="">Select Showtime</option>
          {availableShowtimes.map((showtime, index) => (
            <option key={index} value={showtime}>
              {showtime}
            </option>
          ))}
        </select>
      </div>
      <div className={Style.text_module}>
        <div className={Style.date_shown_area}>
          <div className={Style.date_input_container}>
            <input
              type="text"
              value={selectedDate ? selectedDate.toLocaleDateString('en-CA') : ''}
              placeholder="Click to select a date"
              readOnly
              className={Style.date_input}
            />
            <FaCalendarAlt className={Style.calendar_icon} onClick={handleIconClick} />
          </div>
          {isDatePickerOpen && (
            <DatePicker
              selected={selectedDate}
            
              onChange={handleDateChange}
              dateFormat="yyyy/MM/dd"
              minDate={new Date()}
              className={Style.hidden_date_picker}
              inline
            />
          )}
        </div>
      </div>
      <div className={Style.text_module}>
        <button
          className={Style.selectSeatButton}
          onClick={() => setIsSeatModalOpen(true)}
        >
          Select Seat
        </button>
      </div>
      {selectedSeats.length > 0 && (
        <div className={Style.selectedSeatsInfo}>
          <p>Number of selected seats: {selectedSeats.length}</p>
          <p>Selected seats: {selectedSeats.map(seat => `${seat.row}${seat.number}`).join(', ')}</p>
          <p> Amount : {amount}</p>
        </div>
      )}
      <div>
        <button className={Style.continiue_button} onClick={handleSubmit}>
          Confirm ticket
        </button>
      </div>
      {isSeatModalOpen && <SeatModal onClose={() => setIsSeatModalOpen(false)} onSeatSelect={handleSeatSelect} />}
    </div>
  );
};

export default Booking;
