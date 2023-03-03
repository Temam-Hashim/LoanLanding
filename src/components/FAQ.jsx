import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import axios from "axios";

function FAQ() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const getData = async () => {
      try {
        await axios.get("/faq/random").then((res) => {
          setData(res.data.data);
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, []);

  return (
    <div id="faq">
      <div className="container">
        <div className="section-title text-center">
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="row">
          {data
            ? data.map((d) => (
                <div
                  className="col-md-6 mb-5"
                  key={d.id}
                  style={{ marginBottom: 10 }}
                >
                  <Accordion sx={{ background: "lightgray" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography sx={{ fontSize: 22 }}>
                        {d.question} ?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ fontSize: 18 }}>
                        {d.answer} ?
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              ))
            : "Loading"}
        </div>
      </div>
    </div>
  );
}

export default FAQ;
