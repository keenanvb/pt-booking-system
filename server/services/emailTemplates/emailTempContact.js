module.exports = (contact) => {
    return (
        `
    <html>
        <body>
            <h3>Contact details</h3>
            <ul>
                <li>Name:${contact.name}</li>
                <li>Email:${contact.email} </li>
            </ul>
            <h2>Message</h2>
            <p>${contact.message}</p>
        </body>
    </html>
   `
    )
};