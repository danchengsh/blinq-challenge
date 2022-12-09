import { useState } from 'react';
import Button from '../button/button.component';

import './homepage.styles.css';

const Homepage = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
      <div className="homepage-container">
        <div className="homepage-content-container">
          {isPopupOpen && (
            <div></div>
          )}
          <div className="title">A better way to enjoy every day.</div>
          <div className="subtitle">Be the first to know when we launch.</div>
          <Button type="button" onClick={() => setIsPopupOpen(true)}>Request an invite</Button>
        </div>
      </div>
    );
};

export default Homepage;
