import '../styles/app.scss'
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import MachineStateUpdator from 'components/MachineStateUpdator';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export const defaultQuery = ({ queryKey, signal, }) => fetch(`http://10.0.0.94/api${ queryKey }`, { signal }).then(res => res.json());

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQuery,
    },
  },
})

function MyApp({ Component, pageProps }) {
  return (
     <QueryClientProvider client={ queryClient }>
       <div className="drawer">

         <input id="sidebar" type="checkbox" className="drawer-toggle"/>
         <div className="drawer-content bg-base-300">

           <label htmlFor="sidebar" className="btn"><i className="bi bi-list"/></label>
           <MachineStateUpdator/>
           <Header/>
           <div className="flex w-full">
             <div className="content flex-auto mx-8">
               <Component { ...pageProps } />
             </div>
           </div>
         </div>
         <ReactQueryDevtools initialIsOpen />
         <Sidebar/>
       </div>

     </QueryClientProvider>

  )
}

export default MyApp
