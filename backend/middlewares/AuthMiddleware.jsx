const { verify } = require("jsonwebtoken");
const { ArtistProfile, AdminProfile } = require("../models");

const validateToken = async (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in!" });

  // try {
  //   const validToken = verify(accessToken, "secret");
  //   req.artistProfile = validToken;
  //   if (validToken) {
  //     return next();
  //   }
  // } catch (err) {
  //   return res.json({ error: err });
  // }

  try {
    const validToken = verify(accessToken, "secret");
    req.user = validToken;

    let userProfile;
    if (validToken.role === 1) {
      userProfile = await ArtistProfile.findOne({
        where: { id: validToken.id },
        include: "artist"
      })
      req.artistProfile = userProfile;
    } else if (validToken.role === 0) {
      userProfile = await AdminProfile.findOne({ 
        where: { id: validToken.id } ,
        include: "admin"
      })
      req.adminProfile = userProfile;
    }

    if (!userProfile) {
      return res.status(404).json({ error: "User not found" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { validateToken };
