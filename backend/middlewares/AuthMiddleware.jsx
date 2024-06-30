const { verify } = require("jsonwebtoken");
const { ArtistProfile, AdminProfile } = require("../models");

const validateToken = async (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in!" });

  // pre dali lang gid check ko lang ni
  // diri gn comment out ko ang includes kay nd ya makita ang association daw sa artist kay nag users na ta daan
  try {
    const validToken = verify(accessToken, "secret");
    req.user = validToken;

    // let userProfile;
    //   if (validToken.role === 1) {
    //     userProfile = await ArtistProfile.findOne({
    //       where: { id: validToken.id },
    //       include: "user",
    //     });
    //     req.artistProfile = userProfile;
    //   } else if (validToken.role === 0) {
    //     userProfile = await AdminProfile.findOne({
    //       where: { id: validToken.id },
    //       include: "user",
    //     });
    //     req.adminProfile = userProfile;
    //   }

    //   if (!userProfile) {
    //     return res.status(404).json({ error: "User not found" });
    //   }

    //   return next();
    // } catch (err) {
    //   return res.status(401).json({ error: "Invalid token", err });
    // }

// working na ni nga auth middleware
    req.user = {
      id: validToken.id,
      role: validToken.role,
    };

    let userProfile;
    if (validToken.role === 1) {
      userProfile = await ArtistProfile.findOne({
        where: { id: validToken.id },
        include: "user",
      });
      req.artistProfile = userProfile;
    } else if (validToken.role === 0) {
      userProfile = await AdminProfile.findOne({
        where: { id: validToken.id },
        include: "user",
      });
      req.adminProfile = userProfile;
    }

    if (!userProfile) {
      return res.status(404).json({ error: "User not found" });
    }

    return next();
  } catch (err) {
    console.log("Error verifying token:", err);
    return res.status(401).json({ error: "Invalid token", err });
  }
};

module.exports = { validateToken };
