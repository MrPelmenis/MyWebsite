import './App.css';
import MainPart from './MainPart/mainPart';
import SingUpWindow from './SignUpWindow/SignUpWindow';

import { Provider } from 'react-redux';
import store from './store';

import { DataLoader } from './DataLoader';


function App() {
  return (
    <div >
      <Provider store={store}>
        <DataLoader></DataLoader>
        <SingUpWindow></SingUpWindow>
      </Provider>
      <MainPart></MainPart>
    </div>
  );
}

export default App;