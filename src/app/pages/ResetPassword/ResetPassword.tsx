import Layout from "../../components/Layout/Layout";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <Layout>
      <ResetPasswordForm
        style={{
          margin: {
            textAlign: "center",
            lg: "auto",
            md: "auto",
            sm: "2rem auto",
            xs: "2rem auto",
          },
          width: { lg: "20%", md: "20%", sm: "80%", xs: "80%" },
        }}
      />
    </Layout>
  );
};
export default ResetPassword;
