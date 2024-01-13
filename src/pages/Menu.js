import React from 'react';
import Button from 'react-bootstrap/Button';

const Menu = ({ items }) => {
  return (
    <div>
    {/* <article key={id} className="menu-item">
            <img src={img} alt={title} className="photo" />
            <div className="item-info">
              <header>
                <h4>{title}</h4>
                <h4 className="price">${price}</h4>
              </header>
              <p className="item-text">{desc}</p>
            </div>
          </article> */}
      {items.map(menuItem => {
        const { id, title, img, desc, price } = menuItem;
        
        return (
            <div key={id} className="Rcontainer">
            <div className="Rcard">
                <div className="Rimage">
                    <img src={img} alt="Product" />
                </div>
                <div className="Rcontent">
                    <h3>{title}</h3>
                    <p>$ {price}</p>
                    <p>{desc}</p>
                    <Button variant="outline-success" size="sm">Add</Button>
                </div>
            </div>      
        </div>
          
        );
      })}
    </div>
  );
};

export default Menu;
