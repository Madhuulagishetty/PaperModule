  "use client";

  import { useState } from "react";
  import { useRouter } from "next/navigation";
  import { Eye,EyeOff } from 'lucide-react';




  export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const [hidepass,setHidepass]=useState(false)
    const handleLogin = (e) => {
      e.preventDefault();
      if (username === "admin123" && password === "admin123") {
        localStorage.setItem("auth", "true"); // Store auth state
        router.push("/GradeSelector"); // Redirect to protected page
      } else {
        setError("Invalid username or password!");
      }
    };
    const OnhideBtn=()=>{
      setHidepass(!hidepass)
    }

    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-lg shadow-md w-80"
        >
          <h2 className="text-xl font-bold mb-4 text-gray-500">Login</h2>
          {error && <p className="text-red-500">{error}</p>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded mb-4 text-black mt-4 "
            required
          />
          <input
            type={hidepass ? "Password":"text"}
            placeholder={'Password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4 text-black"
            required
          />
          <p className="absolute top-[53%] right-[42%]" onClick={OnhideBtn}>{hidepass ?  <Eye className="text-gray-400"/>:<EyeOff className="text-gray-400"/>} </p>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
