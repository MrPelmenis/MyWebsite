import './App.css';
import MainPart from './MainPart/mainPart';
import SingInWindow from './SignInWindow/SignInWindow';
import SinglePost from './SinglePost/singlePost';
import TopBar from './topBar/topBar';
import ReactDOM from "react-dom";

import { Provider } from 'react-redux'
import store from './store'


function App() {
  return (
    <div >
      <Provider store={store}>
        <SingInWindow></SingInWindow>
      </Provider>
      <TopBar></TopBar>
      <MainPart></MainPart>
    </div>
  );
}

export default App;