import DogPicture from "./DogPicture.jsx"
import SearchWidget from "./SearchWidget.jsx"
import CartWidget from "./CartWidget.jsx"
import ProfileWidget from "./ProfileWidget.jsx"



import { createChatBotMessage } from 'react-chatbot-kit';
const botName = 'Campdel bot';

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}, what can i do for you today?`)],
  state: {
    searchTerm : ""
  },
  widgets: [
    {
      widgetName: 'dogPicture',
      widgetFunc: (props) => <DogPicture {...props} />,
    }, 
    {
      widgetName: 'cartWidget',
      widgetFunc: (props) => <CartWidget {...props} />,
    },
    {
      widgetName: 'profileWidget',
      widgetFunc: (props) => <ProfileWidget {...props} />,
    },
    
      {
        widgetName: 'searchWidget',
        widgetFunc: (props) => <SearchWidget {...props} />,
        mapStateToProps: [
          "searchTerm"
        ],
      },
  ],
};

export default config;