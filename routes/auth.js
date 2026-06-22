const express =
require("express");

const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");

const User =
require("../models/User");

const router =
express.Router();

/* ===================
SIGNUP
=================== */

router.post(
"/signup",

async(req,res)=>{

try{

const {

name,
email,
password

}=req.body;

/* VALIDATE */

if(
!name ||
!email ||
!password
){

return res
.status(400)
.json({

success:false,

message:
"Fill all fields"

});

}

/* EXISTS */

const exists =
await User
.findOne({
email
});

if(exists){

return res
.status(400)
.json({

success:false,

message:
"Email exists"

});

/* HASH */

const hashed =
await bcrypt
.hash(
password,
10
);

/* CREATE */

const user =
await User
.create({

name,

email,

password:
hashed

});

/* TOKEN */

const token =
jwt.sign(

{
id:
user._id
},

process
.env
.JWT_SECRET,

{
expiresIn:
"30d"
}

);

res.json({

success:true,

token,

user:{

id:
user._id,

name:
user.name,

email:
user.email

}

});

}catch(e){

res
.status(500)
.json({

success:false,

error:
e.message

});

}

}
);

/* ===================
LOGIN
=================== */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid login" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

}

const token =
jwt.sign(

{

id:
user._id

},

process
.env
.JWT_SECRET,

{

expiresIn:
"30d"

}

);

res.json({

success:true,

token,

user:{

name:
user.name,

email:
user.email

}

});

}catch(e){

res
.status(500)
.json({

error:
e.message

});

}

}
);

module.exports =
router;

