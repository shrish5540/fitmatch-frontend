import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await axios.post(`${API}/api/users/login`, { email, password })
      localStorage.setItem('token', res.data.token)
      const userId = res.data.user?._id ?? JSON.parse(atob(res.data.token.split('.')[1])).id
      localStorage.setItem('userId', userId)
      navigate('/swipe')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ backgroundColor: '#111111', minHeight: '100vh' }} className="flex items-center justify-center">
      <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }} className="w-full max-w-md p-8 rounded-2xl shadow-2xl">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🔥</div>
          <h1 className="text-3xl font-bold text-white">FitMatch</h1>
          <p style={{ color: '#888' }} className="mt-1 text-sm">Your premium fitness companion</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={{ backgroundColor: '#262626', border: '1px solid #333', color: '#fff' }}
              className="w-full px-4 py-3 rounded-xl outline-none focus:border-orange-500 transition"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{ backgroundColor: '#262626', border: '1px solid #333', color: '#fff' }}
              className="w-full px-4 py-3 rounded-xl outline-none focus:border-orange-500 transition"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: '#f97316' }}
            className="w-full py-3 rounded-xl text-white font-semibold text-base hover:opacity-90 transition mt-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="text-sm text-gray-400 text-center mt-4">
  Want to explore quickly?
</p>

<button
  type="button"
  onClick={() => {
    setEmail("demo@fitmatch.com")
    setPassword("Demo@123")
  }}
  className="w-full mt-3 border border-orange-500 text-orange-400 py-3 rounded-xl hover:bg-orange-500 hover:text-white transition font-medium"
>
  Use Demo Account
</button>

        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#f97316' }} className="font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}