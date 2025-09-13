import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Input from "@/components/inputs/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    profilePic: "",
    height: "",
    weight: "",
    psychCategory: "",
    streak: 0,
    wellnessPoints: 0,
    currentMood: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
        setFormData(res.data);
      } catch (err) {
        toast.error("Failed to fetch profile");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:8000/api/user/profile",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(res.data);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  // Generate fallback avatar using DiceBear if no profilePic exists
  const avatarUrl =
    profile.profilePic ||
    `https://avatars.dicebear.com/api/initials/${encodeURIComponent(profile.name || "U")}.svg`;

  return (
    <div className="p-6 bg-cover bg-center min-h-screen" style={{ backgroundImage: "url('/bg-trees.jpg')" }}>
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 space-y-6">

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Avatar className="w-24 h-24 border-4 border-purple-400 shadow-md">
            <AvatarImage src={avatarUrl} alt={profile.name} />
            <AvatarFallback>{profile.name ? profile.name[0].toUpperCase() : "U"}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-purple-800">{profile.name}</h2>
            <p className="text-gray-600">{profile.bio}</p>
            <p className="text-gray-500 text-sm">{profile.email}</p>
            <p className="text-gray-500 text-sm">
              Height: {profile.height} cm | Weight: {profile.weight} kg
            </p>
            <p className="text-gray-500 text-sm">Category: {profile.psychCategory}</p>
            <Button className="mt-2" onClick={() => setIsEditing(true)}>Edit Profile</Button>
          </div>
        </div>

        {/* Wellness Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-purple-100 p-4 rounded-xl text-center">
            <h3 className="text-xl font-bold">🔥 {profile.streak}</h3>
            <p className="text-gray-700">Day Streak</p>
          </div>
          <div className="bg-green-100 p-4 rounded-xl text-center">
            <h3 className="text-xl font-bold">{profile.wellnessPoints}</h3>
            <p className="text-gray-700">Wellness Points</p>
          </div>
          <div className="bg-pink-100 p-4 rounded-xl text-center">
            <h3 className="text-xl font-bold">{profile.currentMood || "😊"}</h3>
            <p className="text-gray-700">Current Mood</p>
          </div>
        </div>

        {/* Edit Profile Modal */}
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-purple-700">Edit Profile</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
              <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" />
              <Textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />
              <Input name="height" type="number" value={formData.height} onChange={handleChange} placeholder="Height (cm)" />
              <Input name="weight" type="number" value={formData.weight} onChange={handleChange} placeholder="Weight (kg)" />
              <Input name="psychCategory" value={formData.psychCategory} onChange={handleChange} placeholder="Psychology Category" />
            </div>

            <DialogFooter className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
