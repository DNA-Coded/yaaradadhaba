import React from 'react';
import { Link } from 'react-router-dom';

export default function RefundCancellation() {
  return (
    <>
      <div className="mad-breadcrumb with-bg" data-bg-image-src="/images/1920x400_bg2.jpg">
        <div className="container">
          <nav className="mad-breadcrumb-path">
            <span><Link to="/">Home</Link></span> / <span>Refund and Cancellation</span>
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
                  <h2 className="align-center">Refund and Cancellation</h2>
                  <div className="row">
                    <div className="col-md-12 about-us">
                      <p>
                        Buyer may choose to cancel Order only within the first five to ten minutes of the Order being placed.
                      </p>
                      <p>
                        Buyer may be entitled to a refund for the Orders. The Buyer shall also be entitled to a refund of proportionate value in the event packaging of an item in an Order or the complete Order, is either tampered or damaged and the Buyer refuses to accept at the time of delivery.
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
