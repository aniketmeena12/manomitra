import React, { useContext, useState } from 'react'
import ProfilePhotoSelector from '../../components/ProfilePhotoSelector';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { UserContext } from '../../context/usercontext';
import { API_PATHS } from '../../utilis/apipaths';
import axiosInstance from '../../utilis/axiosinstance';
import uploadImage from '../../utilis/uploadimage';
import { validateEmail } from '../../utilis/helper';
import { Button } from '@/components/ui/button';

const SignUp = ({setCurrentPage}) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();

  // Handle Signup Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";

  if (!fullName) {
    setError("Please enter full name.");
    return;
  }

  if (!validateEmail(email)) {
    setError("Please enter a valid email address.");
    return;
  }
  if (!password) {
    setError("Please enter a password.");
    return;
  }
  setError(""); // Clear any previous error

// SignUp API Call
    try {
      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageURL || "";
      }
      const response = await axiosInstance.post( API_PATHS.AUTH.REGISTER, {
        name:fullName,
        email,
        password,
        profileImageUrl,
      });
      const {token} = response.data;
      if(token){
        localStorage.setItem("token",token);
        updateUser(response.data);
        navigate("/dashboard");
      }
      console.log("Signup successful:", response.data);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Create an Account</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="Sandeep"
            type="text"
          />

          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="sandeep@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />
        </div>

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <Button type="submit"  className="text-white bg- hover:bg-[#b9cded] cursor-pointer"
          style={{ backgroundColor: '#7B9ACC' }}>
          SIGN UP
        </Button>

        <p className="text-[13px] text-slate-800 mt-3">
          Already an account?{" "}
          <button
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => {
              setCurrentPage("login");
            }}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;