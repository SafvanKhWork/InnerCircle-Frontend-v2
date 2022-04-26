import { Fragment, useState } from "react";

//
import VerifyEmail from "./state/VerifyEmail";
import UpdatePassword from "./state/UpdatePassword";

const ForgotPassword = (props) => {
  const [isValidOTP, setIsValidOTP] = useState(false);
  const status = {
    isValidOTP,
    setIsValidOTP,
  };
  return (
    <Fragment>
      {!isValidOTP ? <VerifyEmail status={status} /> : ""}
      {isValidOTP ? <UpdatePassword status={status} /> : ""}
    </Fragment>
  );
};

export default ForgotPassword;
