import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Assets/Styles/global.css';
import './Assets/Styles/spacer.css';
import Spinner from './Layout/Loader/Spinner';
import AppRouting from './Routes/AppRouting';
import store from './Store/store';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
// import "react-pdf/dist/esm/Page/TextLayer.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    // <BreadcrumbProvider>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Suspense fallback={<Spinner />} >
          <ToastContainer
            limit={3}
            className="toaster"
            closeOnClick
            pauseOnHover
            theme="light"
            newestOnTop
            transition={Bounce}
            position="top-right" 
            autoClose={1000}
          />
          <AppRouting />
        </Suspense>
      </Provider>
    </QueryClientProvider>
    // </BreadcrumbProvider>

  );
}

export default App;
