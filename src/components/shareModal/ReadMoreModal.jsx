
import { Modal, useMantineTheme } from "@mantine/core";
import { Link } from "react-router-dom";
import "./ReadMoreModal.css";

function ReadMoreModal({ modalOpened, setModalOpened, title, img, desc }) {
  const theme = useMantineTheme();

  return (
    <>
      <Modal
        centered
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        overlayOpacity={0.55}
        overlayBlur={3}
        size={window.innerWidth >= 670 ? "55%" : "100%"}
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
      >
        {/* Modal content */}
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src={img} className="img-responsive modal-img" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>{title}</h2>
              <span className="modal-desc">{desc}</span>
              <Link className="Link" to="/login">
                <button className="apply-btn">Apply for this Loan</button>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ReadMoreModal;
