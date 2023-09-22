const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Invitation = require('./models/Invitation');

router.post('/send-invitation', async (req, res) => {
  const { email, loggedInUserName, loggedInUserEmail } = req.body;
  const token = crypto.randomBytes(20).toString('hex');

  const newInvitation = new Invitation({
    email: email,
    token: token,
    expires: Date.now() + 3600000,  // 1 hour expiration
  });
  await newInvitation.save();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'w42onkdev@gmail.com',
      pass: 'oyfyzqwgmjqjbvum'
    }
  });

  const loggedInUser = {
    name: loggedInUserName || 'John Doe',
    email: loggedInUserEmail || 'john.doe@example.com'
  };
  
  const mailOptions = {
    from: 'w42onkdev@gmail.com',
    to: email,
    subject: 'Join My Team',
    text: `${loggedInUser.name} (${loggedInUser.email}) vous a invité à rejoindre notre application. Pour accepter l'invitation, cliquez sur le lien pour définir votre mot de passe et rejoindre l'équipe: http://yourapp.com/set-password?token=${token}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
      res.status(500).send('Error sending email.');
    } else {
      res.status(200).send('Invitation sent.');
      console.log('E-mail envoyé avec succès:' + info.response);
    }
  });
});

module.exports = router;
