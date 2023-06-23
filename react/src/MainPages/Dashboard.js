// React imports
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Standard imports
import Navbar from "../SharedComponents/Navbar";

// API endpoints imports
import { ChargeCurrentGet, ChargeHistoryGet } from '../API/API';

export default function Dashboard() {
  const userEmail = localStorage.getItem("user_email");

  const [chargeCurrentDetails, setChargeCurrentDetails] = useState(null);
  const [chargeHistoryDetails, setChargeHistoryDetails] = useState(null);

  // Function that gets user's current charge. Called on page load, populates chargeCurrentDetails.
  async function fetchUserChargeCurrentAndHistory() {
    const ResponseCurrent = await ChargeCurrentGet(userEmail);

    // result is boolean of status
    if (ResponseCurrent.success) {
      setChargeCurrentDetails(ResponseCurrent.content);
      console.log(ResponseCurrent.content);
    }
    
    const ResponseHistory = await ChargeHistoryGet(userEmail, 'in_progress');

    // result is boolean of status
    if (ResponseHistory.success) {
      setChargeHistoryDetails(ResponseHistory.content);
      console.log(ResponseHistory.content);
    }
  }

  useEffect(() => {
    fetchUserChargeCurrentAndHistory();
  }, []);

  return (
    <div className="h-screen bg-gray-300">
      <Navbar transparent />

      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center"
          style={{
            height: "75vh"
          }}>

          <div className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: "url('landing-image.jpg')"
            }}>
            <span id="blackOverlay" className="w-full h-full absolute opacity-75 bg-black"></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    The best EV charging experience.
                  </h1>
                  <p className="mt-4 text-lg text-gray-300">
                    All your expenses in one place. Mark your favourite chargers, and get recommended charging locations while you're on the go.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>



        <section className="bg-gray-300 -mt-24">

          {/* Charging status */}
          <div className="container mx-auto px-4 -mt-52">
            <div className="flex justify-center w-full">
              <div className="w-full md:w-1/2 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-lime-100 mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <h6 className="text-lg font-semibold uppercase text-center">Current charging status</h6>

                    <div className="space-y-1 grid grid-cols-2 text-center">
                      <div>Vehicle: Vehicle Name (S/N)</div>
                      <div>Current percentage: 50%</div>
                      <div>Started at: 1/6/2023, 2pm</div>
                      <div>Time elapsed: 50 mins</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Three boxes - charging history, favourites, map */}
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <Link to="/ChargingHistory" className="relative flex flex-col min-w-0 break-words bg-white hover:bg-blue-50 cursor-pointer w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                      <i className="fas fa-dollar-sign"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Track your expenses</h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Tracking your charging time, location, and expenses<br></br>no matter which charger brand you use.
                    </p>
                  </div>
                </Link>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <Link to="/Favourites" className="relative flex flex-col min-w-0 break-words bg-white hover:bg-red-50 cursor-pointer w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <i class="fa-solid fa-heart" style={{ color: "#ffffff" }}></i>
                    </div>
                    <h6 className="text-xl font-semibold">
                      Favourite chargers
                    </h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Save the location of your favourite EV chargers<br></br>with just a click.
                    </p>
                  </div>
                </Link>
              </div>

              <div className="md:pt-6 w-full md:w-4/12 px-4 text-center">
                <Link to="/Recommendations" className="relative flex flex-col min-w-0 break-words bg-white hover:bg-green-50 cursor-pointer w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <h6 className="text-xl font-semibold">
                      Get recommendations on the go
                    </h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Don't know where to find chargers? Use our map,<br></br>complete with recommendations for you!
                    </p>
                  </div>

                </Link>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
