import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ComposedChart, Scatter
} from 'recharts';

export default function BiosignalAnalyzer() {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('🔍 Buscando signal_data.json...');
    
    fetch('/signal_data.json')
      .then(res => {
        console.log('📡 Respuesta:', res.status);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(jsonData => {
        console.log('✅ Datos cargados:', jsonData.data.length, 'puntos');
        
        const chartData = jsonData.data.slice(0, 2000).map(item => ({
          time: item.time.toFixed(2),
          original: parseFloat(item.original.toFixed(4)),
          filtered: parseFloat(item.filtered.toFixed(4)),
          isAnomaly: item.is_anomaly,
          residual: parseFloat(item.residual.toFixed(4))
        }));

        setData(chartData);
        setStats(jsonData.metadata);
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{padding: '40px', textAlign: 'center'}}>⏳ Cargando...</div>;
  if (error) return <div style={{padding: '40px', color: 'red'}}>❌ Error: {error}</div>;
  if (data.length === 0) return <div style={{padding: '40px', color: 'red'}}>❌ Sin datos</div>;

  const anomalyPoints = data.filter(d => d.isAnomaly);

  return (
    <div style={{maxWidth: '1000px', margin: '40px auto', padding: '20px'}}>
      <h2 style={{color: '#00ffcc', textAlign: 'center'}}>🧬 Biosignal-AI Analytics</h2>
      
      {/* STATS */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '40px'}}>
        <div style={{background: '#f5f5f5', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #00ffcc'}}>
          <div style={{fontSize: '12px', color: '#999'}}>Duración</div>
          <div style={{fontSize: '20px', fontWeight: 'bold', color: '#00ffcc'}}>{stats?.signal_duration_seconds}s</div>
        </div>
        <div style={{background: '#f5f5f5', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #00ffcc'}}>
          <div style={{fontSize: '12px', color: '#999'}}>Frecuencia</div>
          <div style={{fontSize: '20px', fontWeight: 'bold', color: '#00ffcc'}}>{stats?.sampling_rate_hz} Hz</div>
        </div>
        <div style={{background: '#f5f5f5', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #00ffcc'}}>
          <div style={{fontSize: '12px', color: '#999'}}>Anomalías</div>
          <div style={{fontSize: '20px', fontWeight: 'bold', color: '#ff4444'}}>{stats?.anomaly_count}</div>
        </div>
        <div style={{background: '#f5f5f5', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #00ffcc'}}>
          <div style={{fontSize: '12px', color: '#999'}}>Muestras</div>
          <div style={{fontSize: '20px', fontWeight: 'bold', color: '#00ffcc'}}>{data.length}</div>
        </div>
      </div>

      {/* GRÁFICO 1 */}
      <div style={{marginBottom: '40px', padding: '20px', border: '1px solid #e5e5e5', borderRadius: '8px'}}>
        <h3 style={{margin: '0 0 15px 0'}}>Señal Original vs Filtrada</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid />
            <XAxis dataKey="time" tick={{fontSize: 11}} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="original" stroke="#3b82f6" dot={false} isAnimationActive={false} />
            <Line type="monotone" dataKey="filtered" stroke="#f97316" dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* GRÁFICO 2 */}
      <div style={{marginBottom: '40px', padding: '20px', border: '1px solid #e5e5e5', borderRadius: '8px'}}>
        <h3 style={{margin: '0 0 15px 0'}}>Anomalías Detectadas</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data}>
            <CartesianGrid />
            <XAxis dataKey="time" tick={{fontSize: 11}} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="filtered" stroke="#f97316" dot={false} isAnimationActive={false} />
            <Scatter name="Anomalías" data={anomalyPoints} fill="#ef4444" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* GRÁFICO 3 */}
      <div style={{padding: '20px', border: '1px solid #e5e5e5', borderRadius: '8px'}}>
        <h3 style={{margin: '0 0 15px 0'}}>Residuales</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid />
            <XAxis dataKey="time" tick={{fontSize: 11}} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="residual" stroke="#ec4899" dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}