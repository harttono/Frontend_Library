import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthProvider} from './Components/Provider/authProvider';
import {ProductContextProvider} from './Components/Provider/productProvider';
import {AdminProductProvider} from './Components/Provider/AdminDataProvider';
import {BookMarkContextProvider} from './Components/Provider/bookmarkProvider';


ReactDOM.render(
          <AuthProvider>
            <BookMarkContextProvider>
              <AdminProductProvider>
                <ProductContextProvider>
                  <App/>
                </ProductContextProvider>
              </AdminProductProvider>
            </BookMarkContextProvider>
          </AuthProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
