import React from "react";
import img from "../../data/headerLogo/Logo.png";
import Mapp from "../../components/Map/map";
import facebook from "../../data/footer/Facebook.svg";
import instagram from "../../data/footer/Instagram.svg";
import twitter from "../../data/footer/Twitter.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__first">
          <ul className="footer__blocks">
            <li>
              <ul className="footer__blocks-footLog">
                <li>
                  <img src={img} alt="img" />
                </li>
                <li>
                  <h2>MangoRead</h2>
                  <p>Читай мангу с нами</p>
                </li>
              </ul>
            </li>
            <li>
              <ul className="footer__blocks-links">
                <li className="footer__blocks-links_item">
                  <img src={facebook} alt="" />
                  <p>Facebook</p>
                </li>
                <li className="footer__blocks-links_item">
                  <img src={instagram} alt="" />
                  <p>Instagram</p>
                </li>
                <li className="footer__blocks-links_item">
                  <img src={twitter} alt="" />
                  <p>Twitter</p>
                </li>
              </ul>
            </li>
            <li>
              <Mapp />
            </li>
          </ul>
        </div>
        <div className="footer__second">
          <ul className="footer__second-blocks">
            <li>©2022, All right reserved.</li>
            <li className="footer__second-blocks_under">Privacy Policy</li>
            <li className="footer__second-blocks_under">Terms of Service</li>
            <li className="footer__second-blocks_under">Cookies Settings</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
