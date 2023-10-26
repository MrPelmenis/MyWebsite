import './App.css';
import MainPart from './MainPart/mainPart';
import SingUpWindow from './SignUpWindow/SignUpWindow';
import NewPostWindow from './NewPostWindow/NewPostWindow';
import CommentWindow from './CommentWindow/CommentWindow';

import { Provider } from 'react-redux';
import store from './store';

import { DataLoader } from './DataLoader';


function App() {
  return (
    <div >
      <Provider store={store}>
        <DataLoader></DataLoader>
        <SingUpWindow></SingUpWindow>
        <NewPostWindow></NewPostWindow>
        <CommentWindow></CommentWindow>
        <MainPart></MainPart>
      </Provider>
      
    </div>
  );
}

export default App;