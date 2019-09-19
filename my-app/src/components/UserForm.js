import React, { useState, useEffect } from 'react'
import { withFormik, Form, Field } from "formik"
import * as Yup from 'yup'
import axios from 'axios'

const UserForm = ({ values, errors, touched, status }) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        if(status) {
            setUsers([...users, status])
        }
    }, [status])

    return (
        <div className="userForm">
            <Form>
                <div>
                    <Field type="text" name="yourName" placeholder="Your Name" />
                    {touched.yourName && errors.yourName && <p>{errors.yourName}</p>}
                </div>
                <div>
                    <Field type="email" name="email" placeholder="Email" />
                    {touched.email && errors.email && <p>{errors.email}</p>}
                </div>
                <div>
                    <Field type="password" name="password" placeholder="Password" />
                    {touched.password && errors.password && <p>{errors.password}</p>}
                </div>
                
                <label>
                    Terms of Service
                    <Field type="checkbox" name="terms" checked={values.terms}/>
                </label>
                

                <button >Submit</button>
            </Form>
            {users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.yourName}</li>
                    <li>Password: {user.password}</li>
                    <li>Email: {user.email}</li>
                </ul>
            ))}
        </div>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({ yourName, email, password, terms }) {
        return {
            yourName: yourName || "",
            email: email || '',
            password: password || '',
            terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        yourName: Yup.string().required('You must provide your name'),
        email: Yup.string().email('Email not valid').required('You must provide an email'),
        password: Yup.string().min(8, "Your password must be 8 characters long").required('Password is required'),
        // terms: Yup.required()
    }),
    handleSubmit(values, { setStatus, resetForm }) {
        axios
            .post("https://reqres.in/api/users/", values)
            .then(response => {
                setStatus(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
            resetForm()
    }

})(UserForm)
export default FormikUserForm