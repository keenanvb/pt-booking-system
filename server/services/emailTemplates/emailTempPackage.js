module.exports = (packages) => {

    let list = packages.map((package, index) => {
        return (
            `
            <div>
            <div>
               Package user: ${package.users[0].name}
            </div>
            <div>
            type:${package.type}, clients : ${package.users.map(({ name }) => { return name })}
            </div>
             sessions: ${package.sesh.length}
                <div>
                    <a href="${process.env.REDIRECT_DOMAIN}/admin-packages/${package.users[0].user}"> Check package</a>
                <div>
            </div>
            `
        )
    });

    return `
    <html>
        <body>
            <div stype="text-align: center">
                <h3>Packages renewal</h3>
            <div>
            ${list.length ? list : 'There are no packages to renew'}
        </body>
    </html>
   `
};