import React from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO.js';

export default function Contact() {
  useSEO({
    title: "Contact Yaara Da Dhaba | Order Online & Table Booking",
    description: "Get in touch with Yaara Da Dhaba. Find our location in Agarpara, Kolkata, call us at 9903005932, or message us on WhatsApp to order fresh hot food."
  });

  return (
    <>
      {/* Breadcrumb section */}
      <div className="mad-breadcrumb with-bg" data-bg-image-src="/images/1920x400_bg3.jpg">
        <div className="container">
          <nav className="mad-breadcrumb-path">
            <span><Link to="/">Home</Link></span> / <span>Contact Us</span>
          </nav>
          <h1 className="mad-page-title">Yaara da Dhaba</h1>
        </div>
      </div>

      <div className="mad-content mad-content--no-pt pad-3">
        <div className="container">
          <div className="mad-section pad-0">
            <div className="content-element-lg">
              <div className="row vr-size-2">
                <div className="col-xl-12">
                  {/* Google Map Embedded Iframe */}
                  <div className="content-element-6" style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.355106192837!2d88.37583767523912!3d22.691456179427613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89d4600000001%3A0x6b84089e5746b198!2sYaara%20Da%20Dhaba!5e0!3m2!1sen!2sin!4v1719744578923!5m2!1sen!2sin" 
                      width="100%" 
                      height="450" 
                      style={{ border: 0 }} 
                      allowFullScreen="" 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Yaara da Dhaba Location"
                    ></iframe>
                  </div>

                  <div className="row" style={{ marginTop: '40px' }}>
                    <div className="col-lg-4">
                      <h4>Address</h4>
                      <ul className="mad-our-info size-2">
                        <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                          <i className="material-icons">location_on</i>
                          <span>
                            81, Nilgunj Road, Panjavila, Jagarata Pally, Deshpriya Nagar, Agarpara, Kolkata, West Bengal 700109
                          </span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="col-lg-4">
                      <h4>Contact Details</h4>
                      <ul className="mad-our-info size-2">
                        <li style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                          <i className="material-icons">phone</i>
                          <span><a href="tel:+919903005932">+91 9903005932</a></span>
                        </li>
                        <li style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                          <i className="material-icons">phone</i>
                          <span><a href="tel:+919875521685">+91 9875521685</a></span>
                        </li>
                      </ul>
                    </div>

                    <div className="col-lg-4">
                      <h4>Timings</h4>
                      <ul className="mad-our-info size-2">
                        <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                          <i className="material-icons">access_time</i>
                          <span>
                            Monday - Sunday : 10:00 AM - 10:00 PM
                          </span>
                        </li>
                      </ul>
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
