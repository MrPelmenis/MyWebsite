import './App.css';
import MainPart from './MainPart/mainPart';
import SingInWindow from './SignInWindow/SignInWindow';

import { Provider } from 'react-redux'
import store from './store'


function App() {
  return (
    <div >
      <Provider store={store}>
        <SingInWindow></SingInWindow>
      </Provider>
      <MainPart></MainPart>
    </div>
  );
}

export default App;