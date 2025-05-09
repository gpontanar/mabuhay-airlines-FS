const User = require('../models/User');
// const bcrypt = require('bcryptjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../auth');

const { errorHandler } = auth;

module.exports.signUp = (req, res) => {
  const { email, mobileNumber, password, isAdmin} = req.body;
  
            // Validate email
  if (!email || !email.includes("@")) {
    return res.status(400).send({ message: "Email is invalid or missing" });
  }
  
            // Validate mobile number
  if (!mobileNumber || mobileNumber.length !== 11) {
    return res.status(400).send({ message: "Mobile number is invalid or missing" });
  }
  
            // Validate password
  if (!password || password.length < 8) {
    return res.status(400).send({ message: "Password must be at least 8 characters long" });
  }
  
            // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  // const newUser = new User({ email, password: hashedPassword, isAdmin });
  
  // Create a new user
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    prefix: req.body.prefix,
    gender: req.body.gender,
    mobileNumber: req.body.mobileNumber,
    dateOfBirth: req.body.dateOfBirth,
    address: req.body.address,
    email: req.body.email,
    password: hashedPassword,
  });
  
            // Save the user to the database
    return newUser
              .save()
              .then((result) => res.status(201).send({ message: "Registered Successfully", user: result }))
              .catch((error) => errorHandler(error, req, res));
          };
   
          module.exports.login = async (req, res) => {
            try {
              const user = await User.findOne({ email: req.body.email });
              if (!user) {
                return res.status(404).json({ error: 'User not found' });
              }
          
              const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
              if (!isPasswordCorrect) {
                return res.status(401).json({ error: 'Invalid credentials' });
              }
          
              const token = auth.createAccessToken(user);
              res.status(200).json({
                access: token,
                user: {
                  id: user._id,
                  prefix: user.prefix,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  gender: user.gender,
                  dateOfBirth: user.dateOfBirth,
                  email: user.email,
                  isAdmin: user.isAdmin, // Ensure this property is included
                },
              });
            } catch (err) {
              console.error('Error during login:', err);
              res.status(500).json({ error: 'Login failed' });
            }
          };
  

// module.exports.login = (req, res) => {
//   if (!req.body.email.includes("@")) {
//     return res.status(400).send({ error: "Invalid email format" });
//   }

 
//   return User.findOne({ email: req.body.email })
//     .then(result => {
//       if (result == null) {
//         return res.status(404).send({ error: "No Email Found" });
//       } else {
//         console.log("Stored password:", result.password);
//         console.log("Entered password:", req.body.password);
//         const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);
        
//         if (isPasswordCorrect) {
//           const token = auth.createAccessToken(result);
//           console.log("Generated token:", token); // Log the token to check if it's correct
//           console.log("User data:", result); // Log user data to ensure it has necessary fields

//           return res.send({
//             access: token,
//             user: {
//               id: result._id,
//               email: result.email,
//               role: result.isAdmin ? 'admin' : 'user',
//             }
//           });
//         } else {
//           return res.status(401).send({ error: "Email and password do not match" });
//         }
//       }
//     })
//     .catch(error => errorHandler(error, req, res));
// };

module.exports.getProfile = (req, res) => {
  
  User.findById(req.user.id)
    .then(user => {
      if (user) {
        user.password = undefined;
        res.json(user);  
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch(error => {
      errorHandler(error, req, res);
    });
};

module.exports.setUserAsAdmin = (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).send({
      error: "Permission Denied, Only Admin user can change permission."
    });
  }

  return User.findByIdAndUpdate(req.params.id, { isAdmin: true }, { new: true })
  .then(user => {
    if (user) {
      res.send({ updatedUser: user });
    } else {
      const err = new Error('User not found');
      err.status = 404;
      err.kind = 'ObjectId';
      err.value = req.params.id;
      err.path = '_id';
      err.name = 'CastError';
      throw err;
    }
  })
  .catch(error => errorHandler(error, req, res));
};

//[SECTION] Update password
module.exports.updatePassword = (req, res) => {
  const newPassword = bcrypt.hashSync(req.body.newPassword, 10);
  return User.findByIdAndUpdate(req.user.id, { password: newPassword }, { new: true })
  .then(user => res.send({ message: "Password updated successfully" }))
  .catch(error => errorHandler(error, req, res));
};

module.exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth.toISOString().split('T')[0], // Format to YYYY-MM-DD
      email: user.email,
    });
  } catch (err) {
    console.error('Error fetching user details:', err);
    res.status(500).json({ error: 'Failed to fetch user details' });
  }
};