import React, { useState, useEffect } from "react";
import axios from "axios";

export const Features = () => {
  const [feature, setFeature] = useState("");

  useEffect(() => {
    const fetchFeature = async () => {
      const res = await axios.get("/features/");
      setFeature(res.data.data);
    };
    fetchFeature();
  }, []);

  return (
    <div id="features" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Features</h2>
        </div>
        <div className="row">
          {feature
            ? feature.map((data) => (
                <div key={data.id} className="col-xs-6 col-md-3">
                  {" "}
                  <i className={data.feature_icon}></i>
                  <h3>{data.feature_name}</h3>
                  <p className="feature-text">{data.feature_desc}</p>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};
