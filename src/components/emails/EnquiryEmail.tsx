import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export const EnquiryEmail = () => (
  <Html>
    <Head />
    <Preview>You received an enquiry from Sarang Sayang!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Img
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/logo.jpg`}
            width="49"
            height="21"
            alt="Stripe"
          />
          <Hr style={hr} />
          <Text style={paragraph}>
            Congrats! You&apos;ve received a new enquiry from Sarang Sayang.
          </Text>
          <Text style={paragraph}>
            Only if you are verified as a Supervendor, you can view your
            lead&apos;s contact and a variety of other information about their
            enquiry right from your CRM.
          </Text>
          <Button style={button} href="https://www.sarangsayang.com/sign-in">
            View your Sarang Sayang Dashboard
          </Button>
          <Hr style={hr} />
          <Text style={paragraph}>
            We&apos;ll be here to help you with any step along the way. You can
            find answers to most questions on our{" "}
            <Link style={anchor} href="https://www.sarangsayang.com/faq">
              FAQ page
            </Link>{" "}
            and get in touch with us by replying to this email address.
          </Text>
          <Text style={paragraph}>— The Sarang Sayang team</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default EnquiryEmail;

const main = {
  backgroundColor: "#f6f9fc",
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
  padding: "10 10",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
