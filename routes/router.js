const express = require('express');
const router = new express.Router();
const nodemailer = require('nodemailer');
const path = require("path")

router.post("/register", async (req, res) => {
    const emailData = await req.body;
    const {email, name, zipCode, message, radioValue, imgUrl} = emailData;
    res.send({success: true, emailData});

    const attachmentAllFile = imgUrl.map(img => {
        const htmlImg = `
            <div>
                <img style="width: 100%; padding: 10px; border: 1px solid green;" src="${img.src}" alt="" />
            </div> 
        `
        return htmlImg;
    })

    // Try and Finaly -----------------------------
    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.Email,
                pass: process.env.Pass
            }
        });
        
        const mailOptions = {
            from : `${emailData.name} ${email}` ,
            to: process.env.Email,
            riplayto: emailData.email,
            subject: `Appliance Repair email from ${name}`,
            html: `
                <h2>You Got a new message From ${name}</h2>
                <h3>Contact Details</h3>
                <p className='my-2'>Name: ${name}</p>
                <p className='my-2'>Email: ${emailData.email}</p>
                <p className='my-2'>ZipCode: ${zipCode}</p>
                <p className='my-2'>How Come about me: ${radioValue}</p>
                <p>Client Message: ${message}</p>
                <h4>All Images</h4>
                ${attachmentAllFile}
            `,
            // attachments: attachmentAllFile
        }
        
        

        transporter.sendMail(mailOptions, (error,info) => {
            if(error){
                console.log("Error", error)
            }else{
                console.log("Email Sent" + info.response);
                // console.log(mailOptions)
            }
        })
    }
    finally{

    }
});


module.exports = router;