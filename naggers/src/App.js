import './App.css';
import MainPart from './MainPart/mainPart';
import SingUpWindow from './SignUpWindow/SignUpWindow';
import NewPostWindow from './NewPostWindow/NewPostWindow';
import CommentWindow from './CommentWindow/CommentWindow';
import ChangeNameWindow from './ChangeNameWindow/ChangeNameWindow';
import MainPartBackground from './MainPartBackground/MainPartBackground';
import EditPostWindow from './EditPostWindow/EditPostWindow';
import DeletePostWindow from './DeletePostWindow/DeletePostWindow';

import { Provider } from 'react-redux';
import store from './store';

import { DataLoader } from './DataLoader';


function App() {
  //mainPartBackground includes main part
  return (
    <div >
      <Provider store={store}>
        <DataLoader></DataLoader>
        <ChangeNameWindow></ChangeNameWindow>
        <SingUpWindow></SingUpWindow>
        <NewPostWindow></NewPostWindow>
        <CommentWindow></CommentWindow>
        <EditPostWindow></EditPostWindow>
        <DeletePostWindow></DeletePostWindow>
        <MainPartBackground> 
        </MainPartBackground>
        
      </Provider>
      
    </div>
  );
}

export default App;