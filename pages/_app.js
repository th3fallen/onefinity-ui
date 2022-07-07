import '../styles/app.scss'
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import { SWRConfig } from 'swr';
import { Card, DarkThemeToggle, Flowbite } from 'flowbite-react';
import MachineStateUpdator from 'components/MachineStateUpdator';


function MyApp({ Component, pageProps }) {
  return (
     <Flowbite>
       <DarkThemeToggle/>
       <SWRConfig value={ {
         fetcher: (resource, init) => fetch(resource, init).then(res => res.json()),
       } }>
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
       </SWRConfig>
     </Flowbite>
  )
}

export default MyApp
