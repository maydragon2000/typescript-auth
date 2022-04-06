import React, {  useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { attemptEmailVerify } from "../../store/thunks/auth"
const ForgotPassword = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const initialValues: {
        email:string
    } = {
        email: "",
    };
    const dispatch:any = useDispatch();
    const navigate = useNavigate();
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
    });
    const onSubmit = (values:any) => {
        setLoading(true);
        dispatch(attemptEmailVerify(values)).then((response:boolean) => {
            setLoading(false);
            if (response == true)
                navigate('/verifycode');
        }).catch(() => {
            setLoading(false);

        });
    };
    return (
        <Formik<{email:string}>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(formik) => {
                return (
                    <div className="login-area">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <div className="card">
                                        <div className="card-header">Forgot Password</div>
                                        <div className="card-body">
                                            <Form>
                                                <div className="row mb-3">
                                                    <label
                                                        htmlFor="email"
                                                        className="col-md-4 col-form-label text-md-end"
                                                    >
                                                        Email Address
                                                    </label>
                                                    <div className="col-md-6">
                                                        <Field
                                                            name="email"
                                                            type="email"
                                                            placeholder="email"
                                                        />
                                                        <ErrorMessage name="email" component="div" />
                                                    </div>
                                                </div>
                                                <div className="row mb-0 forgot">
                                                    <div className="col-md-8 offset-md-4">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary btn-login"
                                                            disabled={!formik.dirty || !formik.isValid || loading}
                                                        >
                                                            Next
                                                        </button>
                                                    </div>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }}
        </Formik>)
}

export default ForgotPassword;