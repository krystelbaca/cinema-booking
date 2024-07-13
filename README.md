# Cinema API

### Overview

Cinema Booking allows book seats for various schedules in different auditoriums. The system maintains the relationship between bookings and bookers.

#### Tech Stack

  1. Node.js
  2. Express.js
  3. Mongo DB
  4. Mongoose

### Project structure

```
cine-agenda/
├── node_modules/
├── src/
│   ├── models/
│   │   ├── Auditorium.js
│   │   ├── Booking.js
│   │   ├── Booker.js
│   │   └── Seat.js
│   ├── data/
│   │   └── seeder.js
│   ├── controllers/
│   │   ├── BookingController.js
│   │   └── AuditoriumController.js
│   ├── services/
│   │   ├── AuditoriumService.js
│   │   ├── BookingService.js
│   ├── middleware/
│   │   └── Authentication.js
│   ├── utils/
│   │   ├── jtw.js
│   │   ├── random.js
│   ├── App.js
│   └── Router.js
├── package.json
└── package-lock.json
```

#### Models

<table>
  <tr>
    <td>
      <strong>Model</strong>
    </td>
    <td>
      <strong>Description</strong>
    </td>
    <td>
      <strong>Properties</strong>
    </td>
  </tr>
  <tr>
    <td>
      <strong><code>Auditorium</code></strong>
    </td>
    <td>
      The Auditorium model represents an auditorium in the cinema.
    </td>
    <td>
    <ul>
        <li><strong>name:</strong> The name of the auditorium.</li>
        <li><strong>capacity:</strong> The seating capacity of the auditorium.</li>
        <li><strong>seats:</strong> An array of seat objects.</li>
        <li><strong>schedules:</strong> An array of schedules available for the auditorium.</li>
    </ul>
</td>
  </tr>
    <tr>
    <td>
      <strong><code>Seat</code></strong>
    </td>
    <td>
      The Seat model represents a seat in an auditorium.
    </td>
    <td>
    <ul>
        <li><strong>number:</strong> The seat number.</li>
        <li><strong>booked:</strong> A map indicating whether the seat is booked for different schedules.</li>
    </ul>
</td>
  </tr>
  <tr>
    <td>
      <strong><code>Booking</code></strong>
    </td>
    <td>
     The Booking model represents a booking made by a user.
    </td>
    <td>
    <ul>
        <li><strong>email:</strong> The email of the person who made the booking.</li>
        <li><strong>reservationCode:</strong> The unique reservation code.</li>
        <li><strong>auditorium:</strong> The name of the auditorium.</li>
        <li><strong>schedule:</strong> The schedule of the booking.</li>
        <li><strong>seats:</strong> The seats booked.</li>
        <li><strong>booker:</strong> The booker ID who made the booking.</li>
        <li><strong>createdAt:</strong> The date when the booking was created.</li>
    </ul>
</td>

  </tr>
   <tr>
    <td>
      <strong><code>Booker</code></strong>
    </td>
    <td>
      The Booker model represents a user who can make bookings.
    </td>
    <td>
      <ul>
          <li><strong>email:</strong> The email of the booker (unique).</li>
          <li><strong>password:</strong> The hashed password of the booker.</li>
          <li><strong>bookings:</strong> An array of booking IDs associated with the booker.</li>
          <li><strong>createdAt:</strong> The date when the booker was created.</li>
      </ul>
    </td>
  </tr>
</table>

#### Endpoints

    BASE URI: '/cinema'

Get Availability By Seats:

    GET: '/cinema'
    Query params: seats

Create a Booker:

    POST: /cinema/create-account
    Body:
    {
      "email": "your_email@test.com",
      "password": "your_password"
    }

Login:

    POST: '/cinema/login'
    Body:
    {
      "email": "your_email@test.com",
      "password": "your_password"
    }

Create a booking:

    POST: '/cinema/book'
    Headers: Authorization Bearer <token>
    Body:
      {
        "auditorium": "B",
        "schedule": "3:00 PM",
        "numberOfSeats": 4
    }

Get my booking information:

    GET: '/cinema/booking'
    Query params: reservationCode

### Getting started

#### Pre-requisites

- MongoDB
- Node v14^

#### Run the project

1. Install dependencies:

        npm install


2. Create a `.env` file and copy the values from the `.env.example` file

3. Use the endpoint: `/cinema/create-account` to create a user

4. Seed data:

        npm run seed

5. Run the server:

         npm start

Server should be running at `PORT 3001`.


----

###### Author
Krystel Baca