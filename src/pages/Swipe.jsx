import { useState, useEffect } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export default function Swipe() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [swiping, setSwiping] = useState(false)
  const [matchMsg, setMatchMsg] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    location: '', gymType: '', fitnessLevel: '', availableTime: ''
  })

  const fetchUsers = async (appliedFilters = {}) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const params = new URLSearchParams()
      Object.entries(appliedFilters).forEach(([key, val]) => {
        if (val) params.append(key, val)
      })
      const res = await axios.get(`${API}/api/swipe/suggested?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(res.data.users)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchUsers() }, [])

  const handleSwipe = async (targetId, action) => {
    setSwiping(true)
    try {
      const token = localStorage.getItem('token')
      const res = await axios.post(
        `${API}/api/swipe/${targetId}`,
        { action },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (res.data.message === "It's a match!") {
        setMatchMsg("🎉 It's a Match!")
        setTimeout(() => setMatchMsg(''), 3000)
      }
      setUsers(prev => prev.filter(u => u._id !== targetId))
    } catch (err) {
      console.log(err)
    } finally {
      setSwiping(false)
    }
  }

  const applyFilters = () => {
    setShowFilters(false)
    fetchUsers(filters)
  }

  const clearFilters = () => {
    setFilters({ location: '', gymType: '', fitnessLevel: '', availableTime: '' })
    setShowFilters(false)
    fetchUsers({})
  }

  const selectStyle = {
    backgroundColor: '#262626',
    border: '1px solid #333',
    color: '#fff'
  }

  const inputStyle = {
    backgroundColor: '#262626',
    border: '1px solid #333',
    color: '#fff'
  }

  const currentUser = users[0]

  return (
    <div style={{ backgroundColor: '#111111', minHeight: '100vh' }} className="flex flex-col items-center justify-center px-4">

     

      {/* Filter Button */}
      {/* <button
        onClick={() => setShowFilters(!showFilters)}
        style={{ backgroundColor: '#1e1e1e', border: '1px solid #333' }}
        className="mb-4 px-4 py-2 rounded-xl text-white text-sm hover:opacity-80 transition"
      >
        🔍 Filters
      </button> */}

      {/* Filters Panel */}
      {showFilters && (
        <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }} className="w-full max-w-sm rounded-2xl p-6 mb-4 space-y-3">
          <h3 className="text-white font-semibold mb-2">Filter Partners</h3>

          <input
            placeholder="Location (e.g. Delhi)"
            value={filters.location}
            onChange={e => setFilters({ ...filters, location: e.target.value })}
            style={inputStyle}
            className="w-full px-4 py-2.5 rounded-xl outline-none text-sm"
          />

          <select value={filters.gymType} onChange={e => setFilters({ ...filters, gymType: e.target.value })}
            style={selectStyle} className="w-full px-4 py-2.5 rounded-xl outline-none text-sm">
            <option value="">Any Gym Type</option>
            <option value="commercial">Commercial Gym</option>
            <option value="home">Home Gym</option>
            <option value="crossfit">CrossFit</option>
            <option value="outdoor">Outdoor</option>
          </select>

          <select value={filters.fitnessLevel} onChange={e => setFilters({ ...filters, fitnessLevel: e.target.value })}
            style={selectStyle} className="w-full px-4 py-2.5 rounded-xl outline-none text-sm">
            <option value="">Any Fitness Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <select value={filters.availableTime} onChange={e => setFilters({ ...filters, availableTime: e.target.value })}
            style={selectStyle} className="w-full px-4 py-2.5 rounded-xl outline-none text-sm">
            <option value="">Any Time</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>

          <div className="flex gap-3 mt-2">
            <button onClick={clearFilters}
              style={{ backgroundColor: '#262626', border: '1px solid #333' }}
              className="flex-1 py-2.5 rounded-xl text-white text-sm hover:opacity-80">
              Clear
            </button>
            <button onClick={applyFilters}
              style={{ backgroundColor: '#f97316' }}
              className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90">
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Match Message */}
      {matchMsg && (
        <div style={{ backgroundColor: '#f97316' }} className="px-6 py-3 rounded-2xl mb-4">
          <p className="text-white font-bold text-lg">{matchMsg}</p>
        </div>
      )}

      {/* Card */}
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : currentUser ? (
        <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }} className="relative w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl">
         <div className="flex h-[650px]">
  {/* LEFT SIDE PHOTO */}

 <div className="w-[58%] overflow-hidden">
  {currentUser.profileImage ? (
    <img
      src={currentUser.profileImage}
      alt={currentUser.name}
      className="w-full h-full object-cover"
    />
  ) : (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ backgroundColor: "#262626" }}
    >
      <span className="text-8xl font-bold text-orange-500">
        {currentUser.name?.charAt(0).toUpperCase()}
      </span>
    </div>
  )}
</div>

  {/* RIGHT SIDE DETAILS */}

  <div className="w-[42%] p-8 flex flex-col justify-center">
    <h2 className="text-4xl font-bold text-white mb-2">
      {currentUser.name}
      {currentUser.age ? `, ${currentUser.age}` : ""}
    </h2>

    <p className="text-gray-400 mb-8 text-lg">
      📍 {currentUser.location || "Location not set"}
    </p>

<div className="flex gap-2 flex-wrap mt-4 mb-6">
  {currentUser.gymType && (
    <span className="bg-[#262626] text-white px-4 py-2 rounded-full text-sm font-medium">
      🏋️ {currentUser.gymType.charAt(0).toUpperCase() + currentUser.gymType.slice(1)}
    </span>
  )}

  {currentUser.fitnessLevel && (
    <span className="bg-[#262626] text-white px-4 py-2 rounded-full text-sm font-medium">
      💪 {currentUser.fitnessLevel.charAt(0).toUpperCase() + currentUser.fitnessLevel.slice(1)}
    </span>
  )}
</div>
    

    <div className="space-y-3">
     <div className="mt-4">
  <p className="text-gray-400 text-sm">Goal</p>
  <p className="text-white text-2xl font-semibold mt-1 capitalize">
    {currentUser.goal || "Not set"}
  </p>
</div>
    
     <div className="mt-auto pt-6">
  <div className="mb-4">
    <span
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
      style={{
        backgroundColor: "rgba(249,115,22,0.15)",
        color: "#f97316",
        border: "1px solid rgba(249,115,22,0.4)",
      }}
    >
      🔥 {currentUser.compatibilityScore ?? 0}% Match
    </span>
  </div>
</div>

 
    </div>
  </div>
<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-8 z-20">
  <button
    onClick={() => handleSwipe(currentUser._id, "dislike")}
    disabled={swiping}
    className="w-16 h-16 rounded-full flex items-center justify-center
               bg-[#1f1f1f]
               border border-[#444]
               text-white text-3xl
               shadow-xl
               hover:scale-110 hover:border-red-500
               transition-all duration-300"
  >
    ✕
  </button>

  <button
    onClick={() => handleSwipe(currentUser._id, "like")}
    disabled={swiping}
    className="w-16 h-16 rounded-full flex items-center justify-center
               bg-orange-500
               text-white text-3xl
               shadow-xl
               hover:scale-110 hover:bg-orange-600
               transition-all duration-300"
  >
    💪
  </button>
</div>

</div>
     
        </div>
      ) : (
        <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }} className="w-full max-w-sm rounded-3xl p-8 text-center">
          <div className="text-5xl mb-4">🏋️</div>
          <h2 className="text-xl font-bold text-white mb-2">No more users!</h2>
          <p style={{ color: '#888' }} className="text-sm">Check back later for more gym partners</p>
        </div>
      )}

      
    </div>
  )
}