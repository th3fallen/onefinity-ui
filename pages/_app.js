import '../styles/app.scss'
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import { Card, DarkThemeToggle, Flowbite } from 'flowbite-react';
import MachineStateUpdator from 'components/MachineStateUpdator';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export const defaultQuery = ({ queryKey, signal }) => fetch(`http://10.0.0.94/api${queryKey}`, {signal}).then(res => res.json());

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQuery,
    }
  }
})

function MyApp({ Component, pageProps }) {
  return (
     <Flowbite>
       <DarkThemeToggle/>
       <QueryClientProvider client={queryClient}>
         <div className="w-full mx-auto">
           <MachineStateUpdator/>
           <Header/>
           <div className="flex">
             <div className="sidebar flex-2">
               <Sidebar/>
             </div>
             <div className="content flex-auto w-full">
               <Card>
                 <Component { ...pageProps } />
               </Card>
             </div>
           </div>
         </div>
         <ReactQueryDevtools initialIsOpen />
       </QueryClientProvider>
     </Flowbite>
  )
}

export default MyApp
