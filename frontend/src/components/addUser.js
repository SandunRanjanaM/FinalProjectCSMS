import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // For displaying success or error messages

    useEffect(() => {
        console.log('Component mounted or email/password changed');
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8070/packagelogin/add', {
                email,
                password,
            });

            console.log('User added:', response.data);
            setMessage('User added successfully!');
            // Reset form fields after submission
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error adding user:', error);
            setMessage('Error adding user');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add User</button>
            {message && <p>{message}</p>} {/* Display message */}
        </form>
    );
};

export default AddUser;
