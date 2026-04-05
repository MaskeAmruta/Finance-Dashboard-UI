import SummaryCards from "./SummaryCards";
import Charts from "./Charts";
import Transactions from "./Transactions";
import Insights from "./Insights";
import RoleSwitcher from "./RoleSwitcher";

export default function Dashboard() {
  return (
    <div className="container">
        <div className="navbar">
            <h1>Finance Dashboard</h1><span><RoleSwitcher /></span>       
        </div > 
            <SummaryCards />
        <div className="chart-sec"><Charts /></div>
          
        
        <div className="sec" >
             <div className="big"><Transactions /></div>
            <div className="small"><Insights /></div>
        </div>
           
    </div>
  );
}