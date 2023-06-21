import React, { useState } from "react";
import leftImage from "./../../image/bg1.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

import sweatAlert from "sweetalert2";
import { CirclesWithBar } from "react-loader-spinner";
import { Account } from "../../data/account.js";

function Register() {
  const [hide, setHide] = useState(1);
  let [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [userOTP, setUserOTP] = useState("");
  const [userData, setUserData] = useState({});
  const [pass, setPass] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [branch, setBranch] = useState("");
  const [loading, setLoading] = useState(false);

  const no_page = (
    <div className="alert alert-info">
      404 ! The page you are looking for is not found
    </div>
  );

  // check account page and function
  const handleSubmit = async (e) => {
    e.preventDefault();

    // verify account
    if (hide === 1) {
      // check user entered account number

      if (mobile === "") {
        setMessage("Mobile Number is Required");
      } else if (mobile.length < 9) {
        setMessage("Minimum Mobile Number length must be 9");
      } else {
        if (mobile.substring(0, 1) === "0") {
          mobile = mobile.substring(1, 10);
        } else if (mobile.substring(0, 1) === "+") {
          mobile = mobile.substring(4, 13);
        } else if (mobile.substring(0, 1) === "2") {
          mobile = mobile.substring(3, 12);
        }
        const options = {
          url: "http://localhost:5000/api/v1/account/mobile_no/" + mobile,
        };
        try {
          setLoading(true);
          const res = await axios.get(options.url);
          console.log(res);
          if (res) {
            setUserData(res.data);
            setHide(2);
            setLoading(false);
            setMessage("");
          } else {
            setMessage("No Account Found With This Mobile Number!");
            setLoading(false);
          }
        } catch (error) {
          console.log(error.response.data);
          if (error.response.data.status === "empty") {
            setMessage("No Account Found With This Mobile Number!");
            setLoading(false);
          }
          setLoading(false);
        }
      }
    } else if (hide === 2) {
      // confirm account detail
      console.log(branch);
      if (!branch) {
        setMessage("Please Select at least One Branch");
      } else {
        setMessage("");
        setHide(3);
      }
    } else if (hide === 3) {
      // verify otp
      const randomOTP = 12345;
      if (userOTP === "") {
        setMessage("OTP is Required");
      } else if (userOTP != randomOTP) {
        setMessage("You have Entered invalid OTP!!");
      } else if (userOTP == randomOTP) {
        sweatAlert.fire({
          title:
            "WOW! Your OTP successfully matched ! Now you can set your password",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        setHide(4);
        setMessage("");
        console.log(userData);
      } else {
        setMessage("");
      }
    } else if (hide === 4) {
      // set password
      if (pass.length < 8) {
        setMessage("Password length must be of minimum 8");
      } else if (pass !== passConfirm) {
        setMessage("The two password Field must match!");
      } else {
        //     // add data to db
        const data = {
          full_name: userData.name,
          email: userData.email,
          mobile: userData.mobile,
          password: pass,
          gender: userData.gender,
          dob: userData.dob,
          branch: branch.split("-")[0],
          account_no: branch.split("-")[1],
          account_status: userData.account_status,
          account_type: userData.account_type,
        };
        try {
          setLoading(true);
          const res = await axios.post("/customers", data);
          console.log(res.data.data.insertId);
          if (res) {
            const address = {
              customer_id: res.data.data.insertId,
              city: userData?.address[0],
              subcity: userData?.address[1],
              state: userData?.address[2],
              country: userData?.address[3],
              werada: userData?.address[4],
              kebele: userData?.address[5],
              house_no: userData?.address[6],
            };
            console.log(address);
            const res2 = await axios.post("/address", address);
            if (res2) {
              setPass("");
              setPassConfirm("");
              sweatAlert.fire({
                title: "Congratulation",
                icon: "success",
                text: "Your Account Has Been Created Successfully !",
                allowEnterKey: true,
                didClose: window.location.replace("/login"),
              });
              setLoading(false);
            } else {
              setMessage("Account Created but Can't Add Associated Address");
              setLoading(false);
            }
          }
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    } else {
      window.location.replace("/login");
    }
  };
  // confirm info

  const OtpGenerator = () => {
    // generate random OTP
    const randomOTP = Math.floor(Math.random() * 90000) + 10000;
    return randomOTP;
  };

  // confirm user otp with generated value

  return (
    <div className="login">
      <div className="a-right col-md-6 col-lg-6 col-sm-12 col-xs-12">
        <Link to="/" className="Link">
          <button className="btn  back-btn">
            <i className="fa fa-arrow-left"></i> back
          </button>
        </Link>
        <br />
        <br />

        <h1 className="text-center login-title">
          {hide === 1
            ? "Registration"
            : hide === 2
            ? "Account Confirmation"
            : hide === 3
            ? "Verify OTP"
            : hide === 4
            ? "Set Password"
            : ""}
        </h1>
        <span className="sub-text">
          {hide === 1
            ? "Please Enter your Coop Bank Mobile number for verification"
            : hide === 2
            ? "Please Confirm Your Account Detail To Continue"
            : hide === 3
            ? "Please Enter One time password sent to your mobile number"
            : hide === 4
            ? "Your Account is verified, please set your password here"
            : ""}
        </span>

        {message !== "" && (
          <span className="alert alert-danger m-2 text-center alert-dismissible alert-message">
            {message}
          </span>
        )}
        <form className="login-form">
          {/* get account by mobile */}
          {hide === 1 ? (
            <input
              type="text"
              placeholder="Enter Mobile Number"
              style={{ width: "100%" }}
              className="login-input"
              onChange={(e) => setMobile(e.target.value)}
            />
          ) : // confirm account detail
          hide === 2 ? (
            <div class="row">
              <hr />
              <div className="col-md-6">
                <label className="input-label">Full Name</label>
                <input
                  type="text"
                  disabled={true}
                  value={userData?.name}
                  style={{ width: "100%" }}
                  className="login-input confirm-input"
                />
              </div>
              <div className="col-md-6">
                <label className="input-label">Email Address</label>
                <input
                  type="text"
                  value={userData?.email}
                  disabled={true}
                  style={{ width: "100%" }}
                  className="login-input confirm-input"
                />
              </div>
              <div className="col-md-6">
                <label className="input-label">Mobile Number</label>
                <input
                  type="text"
                  value={userData?.mobile}
                  disabled={true}
                  style={{ width: "100%" }}
                  className="login-input confirm-input"
                />
              </div>

              <div className="col-md-6">
                <label className="input-label">Address</label>
                <input
                  type="text"
                  disabled={true}
                  value={userData.address}
                  style={{ width: "100%" }}
                  className="login-input confirm-input"
                />
              </div>
              <div className="col-md-12">
                <label className="input-label">Select Account</label>
                <select
                  type="text"
                  className="login-input"
                  // style={{ color: "black", backgroundColor: "gray" }}
                  required
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                >
                  <option value="">Select Branch</option>

                  {userData.account_detail.details.map((data) => (
                    <option
                      value={data.branch + "-" + data.account_no}
                      key={data.account_no}
                    >
                      {data.branch + " - " + data.account_no}
                    </option>
                  ))}
                  {/* <option value="Branch One">
                    {userData.account_detail.details[0].branch +
                      " - " +
                      userData.account_detail.details[0].account_no}
                  </option>
                  <option value="Branch Two">
                    {userData.account_detail.details[1].branch +
                      " - " +
                      userData.account_detail.details[1].account_no}
                  </option> */}
                </select>
              </div>
            </div>
          ) : // verify otp
          hide === 3 ? (
            <input
              type="password"
              className="login-input"
              placeholder="Enter Your OTP Here"
              onChange={(e) => setUserOTP(e.target.value)}
            />
          ) : // set Password
          hide === 4 ? (
            <div>
              <input
                type="password"
                className="login-input"
                placeholder="Enter Your password"
                onChange={(e) => setPass(e.target.value)}
              />
              <input
                type="password"
                className="login-input"
                placeholder="Confirm Your password"
                onChange={(e) => setPassConfirm(e.target.value)}
              />
            </div>
          ) : (
            ""
          )}
          <>
            <button
              className={hide === 2 ? "confirm" : "login-btn"}
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              {hide === 1
                ? "SUBMIT"
                : hide === 2
                ? "CONFIRM"
                : hide === 3
                ? "VERIFY"
                : hide === 4
                ? "SET PASSWORD"
                : ""}
            </button>
            {hide === 2 && (
              <button
                className="cancel"
                type="submit"
                onClick={(e) => setHide(1)}
              >
                CANCEL
              </button>
            )}
          </>

          <Link className="Link" to="/login">
            <h6 className="no-account ">Already have an account ? LOGIN</h6>
          </Link>

          {loading && <LoadingIndicator />}
        </form>
      </div>
    </div>
  );
}
// loading indicator
function LoadingIndicator() {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "80",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 5,
        }}
      >
        <CirclesWithBar
          type="ThreeDots"
          color="#c7163c"
          height="60"
          width="60"
        />
      </div>
      <h6 style={{ color: "#1c0d05" }} className="text-center">
        Account Fetching in progress please wait a moment!
      </h6>
    </>
  );
}

export default Register;
