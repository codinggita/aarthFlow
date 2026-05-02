import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const areaData = [
  { name: 'Jan', volume: 4000, apps: 2400 },
  { name: 'Feb', volume: 3000, apps: 1398 },
  { name: 'Mar', volume: 2000, apps: 9800 },
  { name: 'Apr', volume: 2780, apps: 3908 },
  { name: 'May', volume: 1890, apps: 4800 },
  { name: 'Jun', volume: 2390, apps: 3800 },
  { name: 'Jul', volume: 3490, apps: 4300 },
];

const pieData = [
  { name: 'Funded', value: 860, color: '#15803d' }, // success
  { name: 'In Review', value: 231, color: '#b45309' }, // warning
  { name: 'Pending', value: 141, color: '#1d4ed8' }, // info
  { name: 'Delayed', value: 52, color: '#b91c1c' }, // danger
];

const ReportCharts = () => {
  return (
    <div className="report-charts-grid">
      <div className="chart-card-v2 large">
        <div className="chart-header-v2">
          <div>
            <h4>Funding Volume Over Time</h4>
            <p>Growth analysis across active funding cycles</p>
          </div>
          <div className="chart-filters">
            <button className="active">MONTH</button>
            <button>QUARTER</button>
            <button>YEAR</button>
          </div>
        </div>
        <div style={{ width: '100%', height: '300px', marginTop: '20px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={areaData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d4a8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00d4a8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="apps" stroke="#64748b" fillOpacity={1} fill="url(#colorApps)" />
              <Area type="monotone" dataKey="volume" stroke="#00d4a8" fillOpacity={1} fill="url(#colorVolume)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card-v2">
        <h4>Invoice Status Breakdown</h4>
        <p>Current cycle distribution</p>
        <div style={{ width: '100%', height: '220px', position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            <strong style={{ display: 'block', fontSize: '20px', color: '#0f172a' }}>1,284</strong>
            <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold', letterSpacing: '1px' }}>TOTAL</span>
          </div>
        </div>
        <div className="donut-legend">
          <div className="legend-item"><span><i className="dot" style={{background: '#15803d'}}></i> Funded (67%)</span></div>
          <div className="legend-item"><span><i className="dot" style={{background: '#b45309'}}></i> In Review (18%)</span></div>
          <div className="legend-item"><span><i className="dot" style={{background: '#1d4ed8'}}></i> Pending (11%)</span></div>
          <div className="legend-item"><span><i className="dot" style={{background: '#b91c1c'}}></i> Delayed (4%)</span></div>
        </div>
      </div>
    </div>
  );
};

export default ReportCharts;
