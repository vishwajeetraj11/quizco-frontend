import { getIn } from "formik";
import { agentAdminEmail } from "./constants";

export const FormikError = (errors: any, touched: any, fieldName: any) => {
    const error = getIn(errors, fieldName);
    const touch = getIn(touched, fieldName);
    return touch && error ? error : null;
};

export const isAgentAdmin = (email?: string | null) =>
    (email || "").toLowerCase() === agentAdminEmail.toLowerCase();
