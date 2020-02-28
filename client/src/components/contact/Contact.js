import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { addContact, updateContact } from '../../actions'

const Contact = ({ contact: { name, email, message }, updateContact, addContact }) => {

    const [formData, setFormData] = useState({
        formErrors: {
            name: '',
            email: '',
            message: ''
        }
    });


    const onChange = (e) => {
        const { name, value } = e.target;
        const { formErrors } = formData
        switch (name) {
            case "name":
                formErrors.name =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case "message":
                formErrors.message =
                    value.length > 120 ? "maximum 120 characaters required" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            default:
                break;
        }

        updateContact({ prop: name, value: value })
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const emailRegex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );



    const onSubmit = (e) => {
        e.preventDefault();
        addContact({ name, email, message })
    }

    const { formErrors } = formData

    return (
        // <Fragment>
        //     <div>
        //         <div className="contact-wrapper">
        //             <div className="contact-form-wrapper">
        //                 <h1 className="form-heading">Contact us</h1>
        //                 <form className="contact-form" onSubmit={onSubmit} noValidate>
        //                     <div className="name">
        //                         <label htmlFor="Name">Name</label>
        //                         <input
        //                             className={formErrors.name.length > 0 ? "error" : null}
        //                             placeholder="Name"
        //                             type="text"
        //                             name="name"
        //                             noValidate
        //                             maxlength={40}
        //                             value={name}
        //                             onChange={onChange}
        //                         />
        //                         {formErrors.name.length > 0 && (
        //                             <span className="errorMessage">{formErrors.name}</span>
        //                         )}
        //                     </div>
        //                     <div className="email">
        //                         <label htmlFor="email">Email</label>
        //                         <input
        //                             className={formErrors.email.length > 0 ? "error" : null}
        //                             placeholder="Email"
        //                             type="email"
        //                             name="email"
        //                             noValidate
        //                             value={email}
        //                             onChange={onChange}
        //                         />
        //                         {formErrors.email.length > 0 && (
        //                             <span className="errorMessage">{formErrors.email}</span>
        //                         )}
        //                     </div>
        //                     <div className="message">
        //                         <label htmlFor="message">Message</label>
        //                         <textarea
        //                             className={formErrors.message.length > 0 ? "error" : null}
        //                             placeholder="Message"
        //                             type="text"
        //                             name="message"
        //                             rows={4}
        //                             noValidate
        //                             maxlength={120}
        //                             value={message}
        //                             onChange={onChange}
        //                         />
        //                         {formErrors.message.length > 0 && (
        //                             <span className="errorMessage">{formErrors.message}</span>
        //                         )}
        //                     </div>

        //                     <div className="createAccount">
        //                         <button type="submit">Send</button>
        //                     </div>
        //                 </form>
        //             </div>
        //         </div>
        //     </div >
        // </Fragment>
        < Fragment >
            <div className="contact-container">
                <h1 className="large text-primary">Contact Us</h1>
                <p className="lead"><i className="far fa-envelope"></i> Got a question? we'd love to hear from you. Send us a message
                and we'll respond as soon as possible
            </p>
                <form className="form" onSubmit={(e) => onSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="Name">Name</label>
                        <input
                            className={formErrors.name.length > 0 ? "error" : null}
                            placeholder="Name"
                            type="text"
                            name="name"
                            noValidate
                            maxlength={40}
                            value={name}
                            onChange={onChange}
                        />
                        {formErrors.name.length > 0 && (
                            <span className="errorMessage">{formErrors.name}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="Email">Email</label>
                        <input
                            className={formErrors.email.length > 0 ? "error" : null}
                            placeholder="Email"
                            type="email"
                            name="email"
                            noValidate
                            value={email}
                            onChange={onChange}
                        />
                        {formErrors.email.length > 0 && (
                            <span className="errorMessage">{formErrors.email}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="Message">Message</label>
                        <textarea
                            className={formErrors.message.length > 0 ? "error" : null}
                            placeholder="Message"
                            type="text"
                            name="message"
                            rows={4}
                            noValidate
                            maxlength={120}
                            value={message}
                            onChange={onChange}
                        />
                        {formErrors.message.length > 0 && (
                            <span className="errorMessage">{formErrors.message}</span>
                        )}

                    </div>
                    <input type="submit" className="btn btn-primary" value="Send" />
                </form>
            </div>
        </Fragment >
    )
}

const mapStateToProps = (state) => {
    return {
        contact: state.contact
    }
}

export default connect(mapStateToProps, { addContact, updateContact })(Contact)