import React, { useState, useEffect } from "react";
import axios from "axios";
export const Testimonials = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/testimonials/random/");
      setData(res.data.data);
    };
    fetchData();
  }, []);

  return (
    <div id="testimonials">
      <div className="container">
        <div className="section-title text-center">
          <h2>What our clients say</h2>
        </div>
        <div className="row">
          {data
            ? data.map((d) => (
                <div key={d.id} className="col-md-4">
                  <div className="testimonial">
                    <div className="testimonial-image">
                      {" "}
                      <img
                        src={"http://picsum.photos/20/" + d.id}
                        alt=""
                      />{" "}
                    </div>
                    <div className="testimonial-content">
                      <p>"{d.comment}"</p>
                      <div className="testimonial-meta"> - {d.username} </div>
                    </div>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
