import { Tabs } from 'flowbite-react';
import JobTab from 'components/JobTabs/JobTab';

export default function JobTabs() {
  return (
     <Tabs.Group
        aria-label="Tabs with icons"
        style="underline"
     >
       <Tabs.Item
          active={true}
          title="Auto"
       >
         <JobTab />
       </Tabs.Item>
       <Tabs.Item
          title="MDI"
       >
         Dashboard content
       </Tabs.Item>
       <Tabs.Item
          title="Messages"
       >
         Settings content
       </Tabs.Item>
       <Tabs.Item
          title="Indicators"
       >
         Contacts content
       </Tabs.Item>
       <Tabs.Item
          disabled={true}
          title="Disabled"
       >
         Disabled content
       </Tabs.Item>
     </Tabs.Group>
  );
}
