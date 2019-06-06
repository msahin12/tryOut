import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer-section">
      <div className="break-line" />

      <div className="upper-footer">

        <div className="footer-name"> &copy; 2019 TOKI AIRLINES</div>
        <div className="social-logins">
        
          <a
            href="https://facebook.com/"
            className=" fab fa-facebook"
          />
          <a href="https://twitter.com/" className=" fab fa-twitter" />
          <a
            href="https://www.linkedin.com/"
            className=" fab fa-linkedin"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
