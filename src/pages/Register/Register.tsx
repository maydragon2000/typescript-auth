import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, FastField, ErrorMessage } from "formik";

import Error from "../../components/Error/Error";
import {
  attemptRegister,
  attemptResendConfirmation,
  attemptResetRegister,
} from "../../store/thunks/auth";
import "./style.css";
const Register = () => {
  const [serverError, setServerError] = useState("");
  const [user, setUser] = useState({});
  const [registerStep, setRegisterStep] = useState("register"); // Use an enum with TS;
  interface IFormValues {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }
  const dispatch:any = useDispatch();

  const initialValues = {
    email: "",
    name: "",
    password: "",
    passwordConfirm:"",
  };
  const [loding, setLoading] = useState(false);
 
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter valid email")
      .required("Please enter your email"),
    name: Yup.string()
      .required("Please enter username")
      .min(5, "Your username is too short")
      .max(30, "Your username is too long"),
    password: Yup.string()
      .required("Please enter password")
      .min(5, "Your password is too short")
      .max(30, "Your password is too long"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password does not match")
      .required("Please retype password")
  });
  const onSubmit = (values:{}) => {
    setLoading(true);
    dispatch(attemptRegister(values))
      .then(() => {
        setLoading(false);
        setUser(values);
        setRegisterStep("resend");
      })
      .catch((error:any) => {
        if (error.response) {
          setLoading(false);
          setServerError(error.response.data.message);
        }
      });
  };

  const onResendEmail = () => {

    dispatch(attemptResendConfirmation(user))
      .then(() => {
        // setRegisterStep("reset");
      })
      .catch((error:any) => {
        if (error.response) {
          setServerError(error.response.data.message);
        }
      });
  };

  const onReset = () => {
    dispatch(attemptResetRegister()).catch((error:any) => {
      if (error.response) {
        setServerError(error.response.data.message);
      }
    });
  };
  function renderSwitch() {
    switch (registerStep) {
      case "register":
        return (
          <Formik<IFormValues>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <div className="register-area">
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-md-8">
                        <div className="card">
                          <div className="card-header">Register</div>

                          <div className="card-body">
                            <Form>
                              <div className="row mb-3">
                                <label
                                  htmlFor="name"
                                  className="col-md-4 col-form-label text-md-end"
                                >
                                  Name
                                </label>

                                <div className="col-md-6">
                                  <FastField
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="name"
                                  />
                                  <ErrorMessage
                                    name="name"
                                    component="div"
                                  />
                                </div>
                              </div>
                              <div className="row mb-3">
                                <label
                                  htmlFor="email"
                                  className="col-md-4 col-form-label text-md-end"
                                >
                                  Email Address
                                </label>

                                <div className="col-md-6">
                                  <FastField
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                  />
                                  <ErrorMessage
                                    name="email"
                                    component="div"
                                  />
                                </div>
                              </div>
                              <div className="row mb-3">
                                <label
                                  htmlFor="password"
                                  className="col-md-4 col-form-label text-md-end"
                                >
                                  Password
                                </label>
                                <div className="col-md-6">
                                  <FastField
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                  />
                                  <ErrorMessage
                                    name="password"
                                    component="div"
                                  />
                                </div>
                              </div>
                              <div className="row mb-3">
                                <label
                                  htmlFor="password-confirm"
                                  className="col-md-4 col-form-label text-md-end"
                                >
                                  Confirm Password
                                </label>

                                <div className="col-md-6">
                                  <FastField
                                    id="passwordConfirm"
                                    name="passwordConfirm"
                                    type="password"
                                    placeholder="passwordConfirm"
                                  />
                                  <ErrorMessage
                                    name="passwordConfirm"
                                    component="div"
                                  />
                                </div>
                              </div>
                              <div className="row mb-0">
                                <div className="col-md-6 offset-md-4">
                                  <button
                                    type="submit"
                                    className="btn btn-primary btn-register"
                                    disabled={!formik.dirty || !formik.isValid || loding}
                                  >
                                    Register
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
              );
            }}
          </Formik>
        );
      case "resend":
        return (
          <div className="verify">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-header">Verify Your Email Address</div>
                    <div className="card-body">
                      <div className="alert alert-success" role="alert">
                        A fresh verification link has been sent to your email address.
                      </div>
                      Before proceeding, please check your email for a verification link.
                      If you did not receive the email
                      <button onClick={onResendEmail} className="btn btn-link p-0 m-0 align-baseline">click here to request another</button>.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "reset":
        return (
          <div className="container">
            <p>Still not received an email? </p>
            <p>Try to register again. You may have given the wrong email. </p>
            <p>
              If you want to be able to use the same name, reset the
              registration :
            </p>
            <button onClick={onReset}>
              Click here to reset the registration
            </button>
            {serverError && <Error>{serverError}</Error>}
          </div>
        );
      default:
        break;
    }
  }
  return <>{renderSwitch()}</>;
};
export default Register;


