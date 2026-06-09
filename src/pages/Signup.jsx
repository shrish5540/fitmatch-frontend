import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export default function Signup() {
  const [form, setForm] = useState({
    name: '', email: '', password: '',
    age: '', gender: '', location: '',
    gymType: '', goal: '', fitnessLevel: '',
    availableTime: '', height: '', weight: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await axios.post(`${API}/api/users/signup`, form)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    backgroundColor: '#262626',
    border: '1px solid #333',
    color: '#fff'
  }

  const selectStyle = {
    backgroundColor: '#262626',
    border: '1px solid #333',
    color: '#fff'
  }

  return (
    <div style={{ backgroundColor: '#111111', minHeight: '100vh' }} className="flex items-center justify-center py-10 px-4">
      <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }} className="w-full max-w-md p-8 rounded-2xl shadow-2xl">

        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🔥</div>
          <h1 className="text-3xl font-bold text-white">FitMatch</h1>
          <p style={{ color: '#888' }} className="mt-1 text-sm">Create your fitness profile</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">

          {/* Required Fields */}
          <input name="name" placeholder="Full Name" required onChange={handleChange}
            style={inputStyle} className="w-full px-4 py-3 rounded-xl outline-none" />

          <input name="email" type="email" placeholder="Email" required onChange={handleChange}
            style={inputStyle} className="w-full px-4 py-3 rounded-xl outline-none" />

          <input name="password" type="password" placeholder="Password" required onChange={handleChange}
            style={inputStyle} className="w-full px-4 py-3 rounded-xl outline-none" />

          {/* Optional Fields */}
          <div className="grid grid-cols-2 gap-3">
            <input name="age" type="number" placeholder="Age" onChange={handleChange}
              style={inputStyle} className="w-full px-4 py-3 rounded-xl outline-none" />

            <select name="gender" onChange={handleChange} style={selectStyle} className="w-full px-4 py-3 rounded-xl outline-none">
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <input name="location" placeholder="Location (e.g. Delhi)" onChange={handleChange}
            style={inputStyle} className="w-full px-4 py-3 rounded-xl outline-none" />

          <select name="gymType" onChange={handleChange} style={selectStyle} className="w-full px-4 py-3 rounded-xl outline-none">
            <option value="">Gym Type</option>
            <option value="commercial">Commercial Gym</option>
            <option value="home">Home Gym</option>
            <option value="crossfit">CrossFit</option>
            <option value="outdoor">Outdoor</option>
          </select>

          <select name="goal" onChange={handleChange} style={selectStyle} className="w-full px-4 py-3 rounded-xl outline-none">
            <option value="">Goal</option>
            <option value="weight loss">Weight Loss</option>
            <option value="muscle gain">Muscle Gain</option>
            <option value="endurance">Endurance</option>
            <option value="flexibility">Flexibility</option>
          </select>

          <select name="fitnessLevel" onChange={handleChange} style={selectStyle} className="w-full px-4 py-3 rounded-xl outline-none">
            <option value="">Fitness Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <select name="availableTime" onChange={handleChange} style={selectStyle} className="w-full px-4 py-3 rounded-xl outline-none">
            <option value="">Available Time</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>

          <div className="grid grid-cols-2 gap-3">
            <input name="height" type="number" placeholder="Height (cm)" onChange={handleChange}
              style={inputStyle} className="w-full px-4 py-3 rounded-xl outline-none" />
            <input name="weight" type="number" placeholder="Weight (kg)" onChange={handleChange}
              style={inputStyle} className="w-full px-4 py-3 rounded-xl outline-none" />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button type="submit" disabled={loading}
            style={{ backgroundColor: '#f97316' }}
            className="w-full py-3 rounded-xl text-white font-semibold text-base hover:opacity-90 transition mt-2">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#f97316' }} className="font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}