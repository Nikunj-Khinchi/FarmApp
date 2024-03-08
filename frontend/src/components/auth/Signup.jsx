// components/Signup.js
import  { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
 const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      const response = await axios.post('http://localhost:3000/signup', { name, email, password, confirmPassword });
      console.log(response.data);
      navigate('/');
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          className="border border-gray-300 rounded w-full px-3 py-2 mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded w-full px-3 py-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded w-full px-3 py-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="border border-gray-300 rounded w-full px-3 py-2 mb-4"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
          onClick={handleSignup}
        >
          Sign Up
        </button>
        <p className='mt-3'>Already Register   <Link to="/" className='text-blue-900 font-normal'> Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
