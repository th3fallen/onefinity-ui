import { Sidebar as FlowSidebar } from 'flowbite-react';
export default function Sidebar() {
  return (
       <FlowSidebar aria-label="Sidebar">
         <FlowSidebar.Items>
           <FlowSidebar.ItemGroup>
             <FlowSidebar.Item label="Dashboard" />
             <FlowSidebar.Item label="Macros" />
             <FlowSidebar.Item label="Settings" />

           </FlowSidebar.ItemGroup>
         </FlowSidebar.Items>
       </FlowSidebar>
  );
}
