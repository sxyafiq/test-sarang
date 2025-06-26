import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  render,
} from "@react-email/components";
import * as React from "react";

export const WelcomeVendorEmail = () => (
  <Html>
    <Head />
    <Preview>Welcome on board! Here&apos;s what you can do.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Link href="https://www.sarangsayang.com">
          <Img
            src={"https://www.sarangsayang.com/email/welcomeVendor/1.jpg"}
            alt="WelcomeVendor1"
          />
          <Img
            src={"https://www.sarangsayang.com/email/welcomeVendor/2.jpg"}
            alt="WelcomeVendor2"
          />
          <Img
            src={"https://www.sarangsayang.com/email/welcomeVendor/3.jpg"}
            alt="WelcomeVendor3"
          />
        </Link>
      </Container>
    </Body>
  </Html>
);

export default WelcomeVendorEmail;

const main = {
  backgroundColor: "#C8E9F3",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const anchor = {
  color: "rgb(96 165 250)",
};

const button = {
  backgroundColor: "rgb(59 130 246)",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};
