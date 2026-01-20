import Navbar from "@/components/navbar/Navbar";
import useAuth from "@/hooks/auth/useAuth";
import useAuthForm from "@/hooks/auth/useAuthForm";
import useHandleAuth from "@/hooks/auth/useHandleAuth";
import React, { useEffect, useState } from "react";

const Profile: React.FC = () => {
    const {
        user
    } = useAuth();

    const {
        handleResetPassword
    } = useHandleAuth();

    const {
        resetPasswordForm,
        setResetPasswordForm
    } = useAuthForm();

    const [confirmedPassword, setConfirmedPassword] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (resetPasswordForm.newPassword.trim() !== '' && resetPasswordForm.newPassword === confirmedPassword) {
            setMessage("Matched");
        }

        if (resetPasswordForm.newPassword.trim() !== '' && resetPasswordForm.newPassword !== confirmedPassword) {
            setMessage("Mismatched");
            setSuccess(false);
        }

        if (resetPasswordForm.oldPassword.trim() !== '' && message === "Matched") {
            setSuccess(true);
        } else {
            setSuccess(false);
        }
    })

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
                        name="oldPassword"
                        placeholder="Current password"
                        value={resetPasswordForm.oldPassword}
                        onChange={(e) => {
                            setResetPasswordForm({
                                ...resetPasswordForm,
                                oldPassword: e.target.value
                            })
                        }}
                        required
                        className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New password"
                        value={resetPasswordForm.newPassword}
                        onChange={(e) => {
                            setResetPasswordForm({
                                ...resetPasswordForm,
                                newPassword: e.target.value
                            })
                        }}
                        required
                        className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        name="confirmNewPassword"
                        placeholder="Confirm new password"
                        value={confirmedPassword}
                        onChange={(e) => setConfirmedPassword(e.target.value)}
                        required
                        className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {message && <p className="text-sm text-red-600">{message}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                        disabled={!success}
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;