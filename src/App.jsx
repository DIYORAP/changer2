import React, { useState, useEffect } from "react";
import axios from "axios";

const SeatReservation = () => {
  const [seats, setSeats] = useState([3]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    // Fetch seats from the API
    const fetchSeats = async () => {
      try {
        //   const response = await axios.get('/api/seats'); // Adjust the endpoint as needed
        // setSeats(response.data);
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };

    fetchSeats();
  }, []);

  const handleSeatClick = async (seat) => {
    if (seat.seat_status === "available") {
      try {
        //  await axios.post('/api/reserve', { seat_number: seat.seat_number });
        setSeats((prevSeats) =>
          prevSeats.map((s) =>
            s.seat_number === seat.seat_number
              ? { ...s, seat_status: "reserved" }
              : s
          )
        );
        setSelectedSeat(seat.seat_number);
      } catch (error) {
        console.error("Error reserving seat:", error);
      }
    }
  };

  return (
    <div>
      <h1>Seat Reservation</h1>
      <div className="seats-container">
        {seats.map((seat) => (
          <div
            key={seat.seat_number}
            className={`seat ${seat.seat_status}`}
            onClick={() => handleSeatClick(seat)}
          >
            {seat.seat_number}
          </div>
        ))}
      </div>
      {selectedSeat && <p>Seat {selectedSeat} reserved!</p>}
      <style jsx>{`
        .seats-container {
          display: flex;
          flex-wrap: wrap;
          max-width: 600px;
          margin: 0 auto;
        }
        .seat {
          width: 50px;
          height: 50px;
          margin: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background-color: lightgrey;
          border: 1px solid grey;
        }
        .seat.available {
          background-color: lightgreen;
        }
        .seat.reserved {
          background-color: lightcoral;
        }
        .seat.sold {
          background-color: grey;
        }
      `}</style>
    </div>
  );
};

export default SeatReservation;
