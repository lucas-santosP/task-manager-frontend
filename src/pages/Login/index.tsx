import React, { useState } from "react";
import { PageContainer, PageTitle, CardWrapper } from "../../styles/shared";
import { Card, Form, Input, Link } from "../../components/ui";
import { useUserContext } from "../../contexts/user";
import { waitAsync } from "../../utils";

const formBottomText = (
  <>
    Dont have account yet ? <Link to="/register">Register here.</Link>
  </>
);

const Login: React.FC = () => {
  const { login } = useUserContext();
  const [userForm, setUserForm] = useState({ email: "email@email.com", password: "pass" });
  const [isLoading, setIsLoading] = useState(false);

  function handleUpdateUserForm(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  }

  async function submitUserForm() {
    try {
      setIsLoading(true);
      await login(userForm);
    } catch (error) {
      await waitAsync(500);
      alert(error?.response?.data);
      setIsLoading(false);
    }
  }

  return (
    <PageContainer>
      <PageTitle align="center">Lucid Task</PageTitle>

      <CardWrapper>
        <Card title="Login">
          <Form
            onSubmit={submitUserForm}
            isLoading={isLoading}
            buttonText={"Login"}
            bottomText={formBottomText}
          >
            <Input
              focused
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={userForm.email}
              onChange={handleUpdateUserForm}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={userForm.password}
              onChange={handleUpdateUserForm}
            />
          </Form>
        </Card>
      </CardWrapper>
    </PageContainer>
  );
};

export default Login;
