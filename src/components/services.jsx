import React, { useState, useEffect } from "react";

import ReadMoreModal from "./shareModal/ReadMoreModal";
import axios from "axios";
// import ServiceImage from "./../image/about.jpg";

export const Services = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const [service, setService] = useState([]);
  const [singleService, setSingleService] = useState([]);
  const [serviceImage, setServiceImage] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      const res = await axios.post("/services/status", { status: "active" });
      setService(res.data.data);
    };
    fetchServices();
  }, []);

  // read more

  const DisplayModal = async (id) => {
    JSON.stringify(localStorage.setItem("serviceId", id));
    setServiceImage(`https://picsum.photos/20${id}`);
    setModalOpened(true);

    try {
      await axios
        .get("/services/" + JSON.parse(localStorage.getItem("serviceId")))
        .then((res) => {
          setSingleService(res.data.data);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  // console.log(singleService);

  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>
            Our loan origination system service is designed to meet the needs of
            lenders of all sizes, from small community banks to large financial
            institutions.
          </p>
        </div>
        <div className="row">
          {service
            ? service.map((data) => (
                <div key={data.id} className="col-md-4">
                  {" "}
                  <i>
                    {/* <img
                      src={"https://picsum.photos/200"}
                      alt=""
                      className="service-img"
                    /> */}
                    <i className={"fa fa-language"}></i>
                  </i>
                  <div className="service-desc">
                    <h3>{data.service_name}</h3>
                    <p className="service-text">{data.service_desc}</p>
                    <button
                      className="apply-btn"
                      onClick={() => DisplayModal(data.id)}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))
            : "loading"}
        </div>

        {/* import modal */}
        <ReadMoreModal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          img={serviceImage}
          title={singleService.service_name}
          desc={singleService.service_desc}
        />
      </div>
    </div>
  );
};
