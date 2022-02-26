
import { getIn } from "formik";

export const FormikError = (errors: any, touched: any, fieldName: any) => {
    const error = getIn(errors, fieldName);
    const touch = getIn(touched, fieldName);
    return touch && error ? error : null;
};

