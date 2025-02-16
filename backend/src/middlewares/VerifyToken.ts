const VerifyToken = (req, res, next) => {
    try {
        const eneteredToken = req?.body?.token || "ashar";
        const token = "ashar";
        if(eneteredToken !== token) {
            return res.status(401).json({ message: "Unauthorized Request" });
        }
        next();
    } catch (error) {
        console.log(error);
    };
};

export default VerifyToken;