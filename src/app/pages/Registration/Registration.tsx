import Layout from "../../components/Layout/Layout";
import { RegistrationForm } from "../../components/registrationForm/RegistrationForm";

const Registration = () => {
  return (
    <>
      <Layout>
        <RegistrationForm
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
    </>
  );
};

export default Registration;
