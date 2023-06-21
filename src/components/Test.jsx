import React, { useState, useEffect } from "react";
import axios from "axios";

const Test = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: "About Us",
      text: "At our company, we understand that the loan origination process can be time-consuming, complex, and frustrating for both lenders and borrowers. That's why we offer a loan origination system service that streamlines the process, reduces errors, and provides a seamless experience for all parties involved.Our loan origination system service is designed to meet the needs of lenders of all sizes, from small community banks to large financial institutions. Our service is flexible and customizable, allowing lenders to choose the features and functionality that best meet their specific needs.",
      lists:
        "Personal Loan, Mortgage Loan, Student loan,Auto loan,Payday loan,Pawn shop loan, Small business loan,Holiday loan",
      
    };

    if (file) {
      const formData = new FormData();
      const filename = Date.now() + file.name;
      formData.append("name", filename);
      formData.append("file", file);
      data.img = filename;

      // upload image
      try {
        await axios
          .post("http://10.100.150.37:5010/api/v1/upload/", formData)
          .then(() => console.log("Image uploaded"));
      } catch (error) {
        console.log("Failed to upload image");
      }
    }

    await axios
      .patch("http://10.100.150.37:5010/api/v1/about/", data)
      .then((res) => {
        console.log(res.data.data);
        alert("about updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [about, setAbout] = useState([]);
  useEffect(() => {
    const getAbout = async () => {
    const results = await axios
        .get("http://10.100.150.37:5010/api/v1/about/");
        if(results){
          setAbout(results.data.data)
        }
    };
    getAbout();
  });

  // console.log('about', about[0])

  return (
    <>
    <div className="container" style={{margin:50}}>
      <form action="" className="mt-2">
        <div className="form-group">
          <input
            type="file"
            className="form-control"
            name="img"
            onChange={(e) => setFile(e.target.files[0])}
          />
       

        </div>
       <div className="form-group w-100">
       <button
            className="form-control btn btn-md btn-info mt-2 "
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
       </div>
      </form>
    </div>

    <div className="container text-center">
     {about.length?
          <img style={{width:500,height:240,objectFit:"cover",margin:30}} src={"http://10.100.150.37:5010/images/" + about[0].about_img} alt="" />
        : "Loading image..."}
    </div>
    </>
  );
};

export default Test;
