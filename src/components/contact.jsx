import { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import React from "react";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  message: "",
};
export const Contact = () => {
  const [{ name, email, message }, setState] = useState(initialState);
  const [response, setResponse] = useState("");
  const [setting, setSetting] = useState([]);
  useEffect(() => {
    const GetSetting = async () => {
      try {
        await axios.get("/settings/").then((res) => {
          setSetting(res.data.data);
          res.data.data.map((d) => setSetting(d));
        });
      } catch (error) {
        console.log(error);
      }
    };
    GetSetting();
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const clearState = () => setState({ ...initialState });

  // submit user message and send email
  (function () {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init("9bS4jvZwcJslY6dkp");
  })();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("/messages/", {
          name: name,
          email: email,
          message: message,
        })
        .then((res) => {
          if (res.data) {
            // send email

            const contactParams = {
              from_name: name,
              from_email: email,
              message: message,
            };
            emailjs
              .send("service_v6b1t71", "template_s81f8fa", contactParams)
              .then(() => {
                console.log("Email Sent");
              })
              .catch((error) => {
                console.log(error);
              });
            setResponse("Your Message has delivered Successfully");
            clearState();
          }
        })
        .catch((error) => {
          console.log(error.message);
          setResponse("Failed to send your Message");
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Get In Touch</h2>
                <p>
                  Contact us today to learn more about our loan origination
                  system and how we can help you achieve your financial goals.
                </p>
              </div>

              <form
                name="sentMessage"
                validate="validate"
                onSubmit={handleSubmit}
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    placeholder="Message"
                    required
                    onChange={handleChange}
                  ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div id="success">
                  <br />
                  {response !== "" && (
                    <span className="alert alert-info text-center w-100">
                      {response}
                    </span>
                  )}
                </div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>Contact Info</h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i> Address
                </span>
                {setting ? setting.site_address : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> Phone
                </span>{" "}
                {setting ? setting.site_mobile : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Email
                </span>{" "}
                {setting ? setting.site_email : "loading"}
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  <li>
                    <a href={setting ? setting.site_facebook_url : "/"}>
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href={setting ? setting.site_twitter_url : "/"}>
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href={setting ? setting.site_youtube_url : "/"}>
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>
            &copy; 2023 Loan Origination System. Design by{" "}
            <a href="https://coopbankoromia.com.et/" rel="nofollow">
              CoopBank
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
