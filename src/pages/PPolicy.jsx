import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <>
      <div className="mad-breadcrumb with-bg" data-bg-image-src="/images/1920x400_bg2.jpg">
        <div className="container">
          <nav className="mad-breadcrumb-path">
            <span><Link to="/">Home</Link></span> / <span>Privacy Policy</span>
          </nav>
          <h1 className="mad-page-title">Yaara da Dhaba</h1>
        </div>
      </div>

      <div className="mad-content no-pd">
        <div className="container">
          <div className="mad-section no-pb mad-section--stretched">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="content-element-9">
                  <h2 className="align-center">Privacy Policy</h2>
                  <div className="row">
                    <div className="col-md-12 about-us">
                      <p>
                        This Privacy Policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. This Privacy Policy describes the policies and procedures on the collection, use, disclosure and protection of your information when you use our website www.yaaradadhaba.com. Please read this Policy before using the website Platform or submitting any personal information to us.
                      </p>
                      <p>
                        By using the website, you agree and consent to the collection, transfer, use, storage, disclosure and sharing of your information as described and collected by us in accordance with this Policy. When using our site, as appropriate, you may be asked to enter details such as your name, email address, and phone number to communicate with you on transaction details and providing you with updates and for analytics purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
