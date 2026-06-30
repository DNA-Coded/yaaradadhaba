import React from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO.js';

export default function About() {
  useSEO({
    title: "About Yaara Da Dhaba | Our Story & Food Quality",
    description: "Learn about Yaara Da Dhaba, our heritage of serving affordable and freshly prepared meals in Kolkata since inception. Quality street food and dining experience."
  });

  return (
    <>
      {/* Breadcrumb section */}
      <div className="mad-breadcrumb with-bg" data-bg-image-src="/images/1920x400_bg2.jpg">
        <div className="container">
          <nav className="mad-breadcrumb-path">
            <span><Link to="/">Home</Link></span> / <span>About Us</span>
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
                  <h2 className="align-center">Yaara da Dhaba</h2>
                  <div className="row">
                    <div className="col-md-12 about-us">
                      <p>
                        Yaara da Dhaba in Agarpara, Kolkata, is a culinary haven for lovers of North Indian, Chinese, and street food.
                        Known for its authentic flavors, this eatery offers a diverse menu, including popular rolls, delectable desserts, and
                        refreshing beverages. The dhaba’s ambiance is a blend of traditional and modern, making it a perfect spot for both
                        casual dining and family outings. Whether you’re in the mood for a hearty North Indian meal or a quick street food
                        snack, Yaara da Dhaba delivers quality and taste with every bite. Don’t miss their signature rolls and rich desserts!
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
