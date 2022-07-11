export default function Sidebar() {
  return (
     <div className="drawer-side">
       <label htmlFor="sidebar" className="drawer-overlay"></label>
       <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
         <li><a>Sidebar Item 1</a></li>
         <li><a>Sidebar Item 2</a></li>

       </ul>
     </div>
  );
}
