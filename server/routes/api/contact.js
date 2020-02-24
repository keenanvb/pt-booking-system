const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Contact = require('../../models/Contact');
let Mailer = require('../../services/Mailer');
let emailTemplate = require('../../services/emailTemplates/emailTempContact');


//@route    POST api/Contact
//@desc     contact form
//@access   public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('message', 'Message is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    try {

        let contact = await Contact.findOne({ email: req.body.email });

        if (contact) {
            return res.status(400).json({
                errors: [{
                    msg: 'Email has already been sent'
                }]
            })
        }

        const newContact = {
            name: req.body.name,
            message: req.body.message,
            email: req.body.email
        }

        await new Contact(newContact).save();

        const email = ({
            title: 'PT Contact',
            subject: 'PT Contact',
            body: 'PT Contact',
            // recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            recipients: [{ email: 'lrn.arries@gmai.com' }]
        });

        const mailer = new Mailer(email, emailTemplate(newContact));
        await mailer.send();

        res.json({ success: true });

    } catch (error) {
        res.status(500).send('Server Error')
    }

})

module.exports = router;