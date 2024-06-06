// Reg
import React, { useState } from "react";
import auth from "../../firebase.init";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Reg = () => {
  const [phone, setPhone] = useState("+880");
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const sendOtp = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);

      setUser(confirmation);
    } catch (err) {
      console.log(err);
    }
  };

  const verifyOtp = async () => {
    try {
      const data = await user.confirm(otp);
      console.log(data);
      navigate("/register");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mx-10">
      
      <div class="flex w-1/2 justify-center items-center bg-white mx-auto mt-20">
        <div class="bg-white">
          <h1 class="text-gray-800 font-bold text-2xl mb-1">Register Now</h1>
          <div class="flex items-center border-2 py-2 px-3 rounded-2xl mt-10">
            <input
              class="pl-2 bg-gray-100 rounded-lg focus:outline-none placeholder:text-black"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="Email Phone Number"
            />
          </div>
          <div id="recaptcha"></div>
          <button
          onClick={sendOtp}
            type="submit"
            class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Send Otp
          </button>
          <div class="flex items-center border-2 py-2 px-3 rounded-2xl mt-4">
            <input
              class="pl-2 bg-gray-100 rounded-lg focus:outline-none placeholder:text-black"
              value={otp}
              type="text"
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
          </div>
          <button
          onClick={verifyOtp}
            type="submit"
            class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Verify OTP
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Reg;
