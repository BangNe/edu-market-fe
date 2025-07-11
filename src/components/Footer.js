import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer-wrapper'>
      <div className='footer-inner'>
        <div className='footer-top'>
          <div className='footer-top-list'>
            <div className='footer-top-list-title'>
              <h5>
                Get to know us
              </h5>
            </div>
            <div className='footer-top-list-box'>
              <Link className='footer-top-list-box-item'>
                About Us
              </Link>
              <Link className='footer-top-list-box-item'>
                Contact Us
              </Link>
              <Link className='footer-top-list-box-item'>
                FAQ
              </Link>
              <Link className='footer-top-list-box-item'>
                Reviews
              </Link>
              <Link className='footer-top-list-box-item'>
                Safety
              </Link>
              <Link className='footer-top-list-box-item'>
                Security
              </Link>
              <Link className='footer-top-list-box-item'>
                In the News
              </Link>
            </div>
          </div>
          <div className='footer-top-list'>
            <div className='footer-top-list-title'>
              <h5>
              Learn with us
              </h5>
            </div>
            <div className='footer-top-list-box'>
              <Link className='footer-top-list-box-item'>
                Find a Tutor
              </Link>
              <Link className='footer-top-list-box-item'>
                Request a Tutor
              </Link>
              <Link className='footer-top-list-box-item'>
                Online Tutoring
              </Link>
              <Link className='footer-top-list-box-item'>
                Get Math Help
              </Link>
              <Link className='footer-top-list-box-item'>
                Learning Resources
              </Link>
              <Link className='footer-top-list-box-item'>
                Blog
              </Link>
              <Link className='footer-top-list-box-item'>
                Tell Us What You Think
              </Link>
            </div>
          </div>
          <div className='footer-top-list'>
            <div className='footer-top-list-title'>
              <h5>
              Work with us
              </h5>
            </div>
            <div className='footer-top-list-box'>
              <Link className='footer-top-list-box-item'>
                Careers at Wyzant
              </Link>
              <Link className='footer-top-list-box-item'>
                Apply to Tutor
              </Link>
              <Link className='footer-top-list-box-item'>
                Tutor Job Board
              </Link>
              <Link className='footer-top-list-box-item'>
                Affiliates
              </Link>
            </div>
          </div>
          <div className='footer-top-download'>
            <h5 className='footer-top-download-title'>
              Download our free app
            </h5>
            <div className='footer-top-download-box'>
              <Link className='footer-top-download-box-item'>
                <span>
                  <i className="fa-brands fa-apple"></i>
                </span>
                <p> App Store</p>
              </Link>
              <Link className='footer-top-download-box-item'>
                <span>
                  <i className="fa-brands fa-google-play"></i>
                </span>
                <p> Google Play</p>
              </Link>
            </div>
          </div>
        </div>
        <div className='footer-mid'>
          <div className='footer-mid-box'>
            <h5 className='footer-mid-box-title'>
              Let's keep in touch
            </h5>
            <div className='footer-mid-box-icon'>
              <Link>
                <i className="fa-brands fa-facebook-f"></i>
              </Link>
              <Link>
                <i className="fa-brands fa-instagram"></i>
              </Link>
              <Link>
                <i className="fa-brands fa-linkedin-in"></i>
              </Link>
            </div>
          </div>
          <div className='footer-mid-box'>
            <h5 className='footer-mid-box-title'>
              Need more help?
            </h5>
            <Link className='footer-mid-box-decs'
              >Learn more about how it works
            </Link>
          </div>
        </div>
        <div className='footer-bottom'>
          <p className='footer-bottom-info'>
            © 2005 -2025 Wyzant, Inc, a division of IXL Learning - All Rights Reserved
          </p>
          <div className='footer-bottom-nav'>
            <Link className='footer-bottomm-nav-item'>
              Sitemap
            </Link>
            <Link className='footer-bottomm-nav-item'>
              Terms of Use
            </Link>
            <Link className='footer-bottomm-nav-item'>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
