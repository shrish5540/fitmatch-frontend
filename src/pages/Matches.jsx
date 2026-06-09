import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export default function Matches() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`${API}/api/swipe/matches`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setMatches(res.data.matches)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchMatches()
  }, [])

  const getOtherUser = (match) => {
    const myId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id
    return match.users.find(u => u._id !== myId)
  }

  if (loading) return (
    <div style={{ backgroundColor: '#111111', minHeight: '100vh' }} className="flex items-center justify-center">
      <p className="text-gray-400">Loading...</p>
    </div>
  )

  return (
    <div style={{ backgroundColor: '#111111', minHeight: '100vh' }} className="px-4 py-8">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white">💪 My Matches</h1>
        <p style={{ color: '#888' }} className="text-sm mt-1">{matches.length} gym partners found</p>
      </div>

      {/* Matches List */}
      {matches.length === 0 ? (
        <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }} className="max-w-sm mx-auto rounded-2xl p-8 text-center">
          <div className="text-5xl mb-4">🏋️</div>
          <h2 className="text-xl font-bold text-white mb-2">No matches yet!</h2>
          <p style={{ color: '#888' }} className="text-sm">Keep swiping to find your gym partner</p>
          <button onClick={() => navigate('/swipe')}
            style={{ backgroundColor: '#f97316' }}
            className="mt-4 px-6 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90">
            Start Swiping
          </button>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-5">
          {matches.map(match => {
            const other = getOtherUser(match)
            console.log(other)
            if (!other) return null
            return (
              <div key={match._id}
                onClick={() => navigate(`/chat/${match._id}`)}
                style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', cursor: 'pointer' }}
                className="rounded-3xl
p-6
flex items-center
gap-5
min-h-[120px]
hover:border-orange-500/30
hover:scale-[1.02]
transition-all duration-300">

                
                {/* Avatar */}
<div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border border-[#333]">
  {other.profileImage ? (
    <img
      src={other.profileImage}
      alt={other.name}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full bg-orange-500 flex items-center justify-center">
      <span className="text-xl font-bold text-white">
        {other.name?.charAt(0).toUpperCase()}
      </span>
    </div>
  )}
</div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{other.name}</h3>
                  <p style={{ color: '#888' }} className="text-xs mt-0.5">{other.goal || 'No goal set'} · {other.gymType || 'No gym set'}</p>
                </div>

                {/* Chat arrow */}
                <button
  className="
    px-5 py-2.5
    rounded-xl
    bg-gradient-to-r from-[#ff7a00] to-[#ff9500]
    text-white font-semibold
    shadow-[0_0_20px_rgba(255,122,0,0.45)]
    hover:shadow-[0_0_30px_rgba(255,122,0,0.8)]
    hover:scale-105
    transition-all duration-300
  "
>
  💬 Chat
</button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}