import React, { useState, useEffect } from "react";
import axios from "axios";

export const About = () => {
  const [data, setData] = useState([]);
  const [lists, setLists] = useState([]);
  useEffect(() => {
    const GetSetting = async () => {
      try {
        await axios.get("/about/").then((res) => {
          res.data.data.map((d) => setData(d));
          setLists(data.about_lists.split(","));
        });
      } catch (error) {
        console.log(error);
      }
    };
    GetSetting();
  });

  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src="img/about.jpg" className="img-responsive" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>{data ? data.about_title : "loading..."}</h2>
              <p>{data ? data.about_text : "loading..."}</p>
              <h3>What We Offer?</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {lists
                      ? lists
                          .slice(0, lists.length / 2)
                          .map((list) => <li key={list}>{list}</li>)
                      : "loading"}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {lists
                      ? lists
                          .slice(lists.length / 2, lists.length)
                          .map((list) => <li key={list}>{list}</li>)
                      : "loading"}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
