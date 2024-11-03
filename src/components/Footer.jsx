import React from "react";
import{Link} from "react-router-dom";

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <section id="footer">
        
            <div class="container py-2">
                <p class="text-center">IIT BHILAI © {currentYear}</p>
            </div>

        </section>
    );
}

export default Footer;


