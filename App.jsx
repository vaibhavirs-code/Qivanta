import { useEffect, useState } from 'react'
import { Activity, ArrowUpRight, CheckCircle2, Clock3, DoorOpen, RefreshCw, ShieldCheck, Users } from 'lucide-react'

const API = 'http://localhost:8080/api'

function App() {
  const [gates, setGates] = useState([])
  const [recommendation, setRecommendation] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function refresh() {
    setError('')
    try {
      const response = await fetch(`${API}/gates`)
      if (!response.ok) throw new Error('Backend returned an error')
      setGates(await response.json())
    } catch {
      setError('Cannot reach the backend. Start the Spring Boot server on port 8080.')
    }
  }

  async function recommend() {
    setLoading(true)
    setError('')
    setRecommendation(null)
    try {
      const response = await fetch(`${API}/gates/recommend`, { method: 'POST' })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'No gate available')
      setRecommendation(data)
    } catch (e) {
      setError(e.message || 'Could not calculate a recommendation.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refresh() }, [])

  const totalVisitors = gates.reduce((sum, gate) => sum + gate.currentVisitors, 0)
  const totalCapacity = gates.reduce((sum, gate) => sum + gate.capacity, 0)
  const overall = totalCapacity ? Math.round(totalVisitors / totalCapacity * 100) : 0

  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="#"><span className="brand-mark">Q</span><span>QIVANTA<span className="brand-dot">.</span><small>SMART QUEUE ECOSYSTEM</small></span></a>
        <span className="stage-pill"><span className="pulse" /> STAGE 3 FOUNDATION</span>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">INTELLIGENT ENTRY & CROWD FLOW</p>
          <h1>Every entry.<br /><em>Smarter.</em></h1>
          <p className="hero-copy">A live control view for queue distribution, gate occupancy and smarter visitor movement.</p>
          <button className="primary" onClick={recommend} disabled={loading}>
            {loading ? 'Calculating…' : 'Recommend best gate'} <ArrowUpRight size={17} />
          </button>
        </div>
        <div className="hero-orbit"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit-core"><DoorOpen size={42} /><span>SMART<br />ENTRY</span></div><span className="orbit-tag tag-a">QR VERIFY</span><span className="orbit-tag tag-b">LIVE FLOW</span></div>
      </section>

      {error && <div className="notice error">{error}</div>}
      {recommendation && <div className="notice success"><CheckCircle2 size={20} /><div><strong>Recommended: {recommendation.gateName}</strong><span>{recommendation.occupancyPercent}% occupied · {recommendation.reason}</span></div></div>}

      <section className="metrics">
        <article className="metric"><span className="metric-icon"><Users /></span><span className="metric-label">Visitors inside</span><strong>{totalVisitors}</strong><small>Across configured gates</small></article>
        <article className="metric"><span className="metric-icon"><DoorOpen /></span><span className="metric-label">Configured capacity</span><strong>{totalCapacity}</strong><small>Total demo capacity</small></article>
        <article className="metric"><span className="metric-icon"><Activity /></span><span className="metric-label">Overall occupancy</span><strong>{overall}%</strong><small>Current demo snapshot</small></article>
        <article className="metric"><span className="metric-icon"><ShieldCheck /></span><span className="metric-label">Gate status</span><strong>{gates.length}</strong><small>Gate records loaded</small></article>
      </section>

      <section className="section-head"><div><p className="eyebrow">VENUE OPERATIONS</p><h2>Gate overview</h2></div><button className="refresh" onClick={refresh}><RefreshCw size={16} /> Refresh</button></section>
      <section className="gate-grid">
        {gates.map(gate => {
          const pct = gate.occupancyPercent
          const tone = pct >= 80 ? 'high' : pct >= 55 ? 'medium' : 'low'
          return <article className="gate-card" key={gate.id}>
            <div className="gate-top"><span>{gate.name}</span><span className={`status ${gate.status.toLowerCase()}`}>{gate.status}</span></div>
            <div className="occupancy"><strong>{pct}%</strong><span>occupancy</span></div>
            <div className="progress"><span className={tone} style={{width: `${Math.min(pct, 100)}%`}} /></div>
            <div className="gate-foot"><span><Users size={14} /> {gate.currentVisitors} visitors</span><span>{gate.capacity} capacity</span></div>
          </article>
        })}
        {!gates.length && !error && <div className="empty">Loading gate data…</div>}
      </section>

      <footer><span><Clock3 size={14} /> Demo data · Not connected to a live venue</span><span>QIVANTA 2.0 <b>•</b> BUILDING THE FUTURE OF QUEUES</span></footer>
    </main>
  )
}

export default App
