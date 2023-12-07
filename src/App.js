import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import CreateDynamicForm from './components/createDynamicForm';
import { Provider } from 'react-redux';
import DisplayForm from './components/displayForm';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './readux-toolkit/store';
import EditDynamicForm from './components/editDynamicForm';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/addDynamicForm",
    element: <CreateDynamicForm />
  },
  {
    path: "/:slug",
    element: <DisplayForm />
  },
  {
    path: "/editForm/:slug",
    element: <EditDynamicForm />
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>

      </Provider>
    </>
  );
}

export default App;
