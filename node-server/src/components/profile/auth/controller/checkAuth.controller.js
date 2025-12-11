import checkAuthService from "../service/checkAuth.service";

const checkAuthController = async (req, res) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    const result = await checkAuthService(userId);

    if (!result.success) {
        return res.status(401).json(result);
    }

    return res.status(200).json(result);
}

export default checkAuthController;