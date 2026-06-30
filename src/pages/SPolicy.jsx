import React from 'react';
import { Link } from 'react-router-dom';

export default function ShippingPolicy() {
  return (
    <>
      <div className="mad-breadcrumb with-bg" data-bg-image-src="/images/1920x400_bg2.jpg">
        <div className="container">
          <nav className="mad-breadcrumb-path">
            <span><Link to="/">Home</Link></span> / <span>Shipping Policy</span>
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
                  <h2 className="align-center">Shipping Policy</h2>
                  <div className="row">
                    <div className="col-md-12 about-us">
                      <p>
                        For online orders, delivery is handled by our local delivery riders or third-party logistics. Delivery times typically range between 30 to 60 minutes depending on the location and order volume. Please ensure someone is available at the provided delivery address to receive the order.
                      </p>
                      <p>
                        Delivery fees may vary depending on the distance between the restaurant and the delivery location. Any delivery updates or delays will be communicated to you by our customer service or delivery partner.
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
