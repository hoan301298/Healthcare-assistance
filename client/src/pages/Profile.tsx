import Navbar from "@/components/navbar/Navbar";
import useAuth from "@/hooks/auth/useAuth";
import React, { useState } from "react";

const Profile: React.FC = () => {
    const {
        user
    } = useAuth();

    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    };

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();

        if (password.newPassword !== password.confirmNewPassword) {
            setError("New passwords do not match");
            setSuccess(null);
            return;
        }

        setError(null);
        setSuccess("Password updated successfully");

        // TODO: call reset password API
        console.log("Reset password payload", password);

        setPassword({
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <Navbar />
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 space-y-8">
                <h1 className="text-2xl font-semibold text-center">Profile</h1>

                {/* User Info */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            value={user.name}
                            disabled
                            className="w-full rounded-lg border bg-gray-100 px-3 py-2 text-gray-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={user.email}
                            disabled
                            className="w-full rounded-lg border bg-gray-100 px-3 py-2 text-gray-600"
                        />
                    </div>
                </div>

                {/* Reset Password */}
                <form onSubmit={handleResetPassword} className="space-y-4">
                    <h2 className="text-lg font-medium">Reset Password</h2>

                    <input
                        type="password"
                        name="currentPassword"
                        placeholder="Current password"
                        value={password.currentPassword}
                        onChange={handlePasswordChange}
                        required
                        className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New password"
                        value={password.newPassword}
                        onChange={handlePasswordChange}
                        required
                        className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        name="confirmNewPassword"
                        placeholder="Confirm new password"
                        value={password.confirmNewPassword}
                        onChange={handlePasswordChange}
                        required
                        className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {error && <p className="text-sm text-red-600">{error}</p>}
                    {success && <p className="text-sm text-green-600">{success}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;