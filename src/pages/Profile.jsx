import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null)
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`${API}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUser(res.data)
        setForm({
  ...res.data,
  profileImage: res.data.profileImage || "",
})
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  
  const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onloadend = async () => {
    try {
      const res = await axios.post(
        `${API}/api/upload`,
        { image: reader.result },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setForm((prev) => ({
        ...prev,
        profileImage: res.data.imageUrl,
      }));
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    }
  };
};

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const token = localStorage.getItem('token')
      await axios.put(`${API}/api/users/me`, form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.log(err)
    } finally {
      setSaving(false)
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

  if (loading) return (
    <div style={{ backgroundColor: '#111111', minHeight: '100vh' }} className="flex items-center justify-center">
      <p className="text-gray-400">Loading...</p>
    </div>
  )

  return (
    <div style={{ backgroundColor: '#111111', minHeight: '100vh' }} className="flex items-center justify-center py-10 px-4">
      <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }} className="w-full max-w-md p-8 rounded-2xl shadow-2xl">

        <div className="text-center mb-8">
          <div className="text-4xl mb-2">💪</div>
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
          <p style={{ color: '#888' }} className="mt-1 text-sm">Update your fitness details</p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex flex-col items-center mb-4">
  {form.profileImage ? (
    <img
      src={form.profileImage}
      alt="Profile"
      className="w-32 h-32 rounded-full object-cover border-2 border-orange-500 mb-3"
    />
  ) : (
    <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-4xl text-white mb-3">
      💪
    </div>
  )}

  <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="text-white"
  />
</div>
          <input name="name" defaultValue={form.name} placeholder="Full Name" onChange={handleChange}
            style={inputStyle} className="w-full px-4 py-3 rounded-xl outline-none" />

          <input name="location" defaultValue={form.location} placeholder="Location" onChange={handleChange}
            style={inputStyle} className="w-full px-4 py-3 rounded-xl outline-none" />

          <select name="goal" value={form.goal || ''} onChange={handleChange} style={selectStyle} className="w-full px-4 py-3 rounded-xl outline-none">
            <option value="">Goal</option>
            <option value="weight loss">Weight Loss</option>
            <option value="muscle gain">Muscle Gain</option>
            <option value="endurance">Endurance</option>
            <option value="flexibility">Flexibility</option>
          </select>

          <select name="gymType" value={form.gymType || ''} onChange={handleChange} style={selectStyle} className="w-full px-4 py-3 rounded-xl outline-none">
            <option value="">Gym Type</option>
            <option value="commercial">Commercial Gym</option>
            <option value="home">Home Gym</option>
            <option value="crossfit">CrossFit</option>
            <option value="outdoor">Outdoor</option>
          </select>

          <select name="fitnessLevel" value={form.fitnessLevel || ''} onChange={handleChange} style={selectStyle} className="w-full px-4 py-3 rounded-xl outline-none">
            <option value="">Fitness Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <select name="availableTime" value={form.availableTime || ''} onChange={handleChange} style={selectStyle} className="w-full px-4 py-3 rounded-xl outline-none">
            <option value="">Available Time</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>

          <div className="grid grid-cols-2 gap-3">
            <input name="height" type="number" defaultValue={form.height} placeholder="Height (cm)" onChange={handleChange}
              style={inputStyle} className="w-full px-4 py-3 rounded-xl outline-none" />
            <input name="weight" type="number" defaultValue={form.weight} placeholder="Weight (kg)" onChange={handleChange}
              style={inputStyle} className="w-full px-4 py-3 rounded-xl outline-none" />
          </div>

          {success && <p className="text-green-400 text-sm text-center">Profile updated! ✅</p>}

          <button type="submit" disabled={saving}
            style={{ backgroundColor: '#f97316' }}
            className="w-full py-3 rounded-xl text-white font-semibold hover:opacity-90 transition">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>

          

          <button type="button" onClick={logout}
            className="w-full border border-red-500 text-red-400 font-semibold py-3 rounded-xl mt-4 hover:bg-red-500 hover:text-white transition">
            Logout
          </button>

        </form>
      </div>
    </div>
  )
}