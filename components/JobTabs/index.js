import JobTab from 'components/JobTabs/JobTab';

export default function JobTabs() {
  return (
     <div className="tabs" aria-label="Tabs with icons">
       <a className="tab tab-bordered tab-active" title="Auto">
         <JobTab/>
       </a>
       <a className="tab tab-bordered" title="MDI">
         Dashboard content
       </a>
       <a className="tab tab-bordered"
          title="Messages"
       >
         Settings content
       </a>
       <a className="tab tab-bordered"
          title="Indicators"
       >
         Contacts content
       </a>
       <a className="tab tab-bordered"
          title="Disabled"
       >
         Disabled content
       </a>
     </div>
  );
}
