import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';
import './Chat.css';

// import { socket, privateMessenger } from './config/socketConfig';
import io from "socket.io-client";
const ENDPOINT = '192.168.43.98:8080';

let socket;



function App() {

  const [fuelLevel, setFuelLevel] = useState('00');
  const [avgConsumption, setAvgConsumption] = useState('00');
  const [totalAmountSpent, setTotalAmountSpent] = useState('00');
  const [longi, setLongi] = useState('00');
  const [lati, setLati] = useState('00');

  const mapStyles = {
    width: '100%',
    height: '100%'
  };
  


  useEffect(() => {

    socket = io(ENDPOINT);


    socket.on("data", (data) => {
      console.log(data);
    })
  }, [ENDPOINT]);

  useEffect(() => {

    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position.coords.longitude);
        console.log(position.coords.latitude);
      });
    } else {
      console.log("Not Available");
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position)
      });
    }

    socket.on('data', message => {
      setFuelLevel(message.level);
      setTotalAmountSpent(message.totalSpent);
      setAvgConsumption(message.avgConsumption);
      setLongi(message.longitude);
      setLati(message.latitude);
    });

    // socket.on("roomData", ({ users }) => {
    //   setUsers(users);
    // });
  }, []);

  return (
    <div className="App">

      <div className="header-bar">
        <p>SMART FUEL GUAGE, FUTO ©.   |   All rights reserved.</p>
      </div>

      <div className="container">
        <div className="centralizer">
          <div className="card">
            <h1>#{totalAmountSpent || "00"}</h1>
            <p>Total Amount Spent</p>
          </div>
          <div className="card">
            <h1>{fuelLevel || "00"}Ltrs</h1>
            <p>Fuel Level</p>
          </div>
          <div className="card">
            <h1>{avgConsumption || "00"}L</h1>
            <p>Average Fuel Usasge</p>
          </div>
        </div>
      </div>

      {/* <div>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: YOUR_LATITUDE,
            lng: YOUR_LONGITUDE
          }}
        >
          <Marker
            onClick={this.onMarkerClick}
            name={'This is test name'}
          />
        </Map>
      </div> */}

{/* <a href={`https://google.com/maps?q=${5.3927248},${6.9838999}`}> <p>CLICK HERE TO TRACK CAR LOCATION</p></a> */}
<a href={`https://google.com/maps?q=${longi},${lati}`}> <p>CLICK HERE TO TRACK CAR LOCATION</p></a>

      <div className="snack-bar">
        <p>2020 EEE FINAL YEAR PROJECT, FUTO ©.   |   All rights reserved.</p>
      </div>
    </div>
  );
}

export default App;
// export default GoogleApiWrapper({
//   apiKey: 'API_KEY'
// })(App);
