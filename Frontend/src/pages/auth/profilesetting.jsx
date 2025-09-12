import React, { useState } from "react";

export default function ProfilePage() {
  // Dummy profile data
  const [profile, setProfile] = useState({
    name: "Student123",
    email: "student@example.com",
    bio: "Striving for balance & focus 💡",
    profilePic: "/profile-pic.jpg",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Save changes
  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
    // 👉 Later: send this data to backend API with fetch/axios
  };

  return (
    <div
      className="p-6 bg-cover bg-center min-h-screen"
      style={{ backgroundImage: "url('/bg-trees.jpg')" }}
    >
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6">
        {/* Profile Header */}
        <div className="flex items-center gap-6">
          <img
            src={profile.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-purple-400 shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold text-purple-800">{profile.name}</h2>
            <p className="text-gray-600">{profile.bio}</p>
            <p className="text-gray-500 text-sm">{profile.email}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-2 px-4 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Wellness Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-purple-100 p-4 rounded-xl text-center">
            <h3 className="text-xl font-bold">🔥 7</h3>
            <p className="text-gray-700">Day Streak</p>
          </div>
          <div className="bg-green-100 p-4 rounded-xl text-center">
            <h3 className="text-xl font-bold">120</h3>
            <p className="text-gray-700">Wellness Points</p>
          </div>
          <div className="bg-pink-100 p-4 rounded-xl text-center">
            <h3 className="text-xl font-bold">😊</h3>
            <p className="text-gray-700">Current Mood</p>
          </div>
        </div>

        {/* Modal for Editing Profile */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-96 p-6">
              <h3 className="text-xl font-bold mb-4 text-purple-700">Edit Profile</h3>

              <label className="block mb-2 text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded-lg"
              />

              <label className="block mb-2 text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded-lg"
              />

              <label className="block mb-2 text-gray-700">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full p-2 mb-4 border rounded-lg"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
