import React, { useState, useEffect } from "react";
import axios from "axios";

export const Header = () => {
  const [setting, setSetting] = useState([]);
  useEffect(() => {
    const GetSetting = async () => {
      try {
        await axios.get("/settings/").then((res) => {
          res.data.data.map((d) => setSetting(d));
        });
      } catch (error) {
        console.log(error);
      }
    };
    GetSetting();
  });
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  {setting ? setting.site_name : "Loading"}
                  <span></span>
                </h1>
                <p>{setting ? setting.site_hero_text : "Loading"}</p>
                <a
                  href="#features"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  Learn More
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
