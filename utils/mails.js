const nodemailer =
require(
"nodemailer"
);

async function sendTicketEmail({

email,
ticketCode,
qr

}){

try{

const transporter =
nodemailer
.createTransport({

service:
"gmail",

auth:{

user:
process
.env
.EMAIL_USER,

pass:
process
.env
.EMAIL_PASS

}

});

await transporter
.sendMail({

from:

process
.env
.EMAIL_USER,

to:
email,

subject:
"Your Event Ticket",

html:

`
<h2>
Payment Successful
</h2>

<p>

Ticket Code:

<b>

${ticketCode}

</b>

</p>

<p>

Present QR
at entrance

</p>

<img
src="${qr}"
width="250">

`

});

return true;

}catch(e){

console.log(
e
);

return false;

}

}

module.exports={
sendTicketEmail
};
