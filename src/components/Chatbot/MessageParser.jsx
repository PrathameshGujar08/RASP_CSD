// in MessageParser.jsx
import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes('hello')) {
      actions.handleHello();
    }

    if (message.includes('dog')) {
        actions.handleDog();
      }
    
      if (message.includes('search')) {
        actions.handleSearch(message);
      }
  
      if (message.includes('cart')) {
        actions.handleCart();
      }
      if (message.includes('profile') || message.includes('history')) {
        actions.handleProfile();
      }
      
  
        
        
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;