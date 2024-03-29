import './App.css';
import SingUpWindow from './SignUpWindow/SignUpWindow';
import NewPostWindow from './NewPostWindow/NewPostWindow';
import CommentWindow from './CommentWindow/CommentWindow';
import ChangeNameWindow from './ChangeNameWindow/ChangeNameWindow';
import MainPart from './MainPart/mainPart';
import EditPostWindow from './EditPostWindow/EditPostWindow';
import DeletePostWindow from './DeletePostWindow/DeletePostWindow';

import { Provider } from 'react-redux';
import store from './store';

import { DataLoader } from './DataLoader';


function App() {
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
        <MainPart></MainPart>
      </Provider>
      
    </div>
  );
}

export default App;