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
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface MessageUpdateFromUserEmailProps {
  vendorName: string;
  userName: string;
}

export const MessageUpdateFromUserEmail = ({
  vendorName,
  userName,
}: MessageUpdateFromUserEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reply {userName} on Sarang Sayang now!</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Img
              src={`https://www.sarangsayang.com/logopng.png`}
              width="60"
              height="60"
              alt="SarangSayang"
            />
            <Hr style={hr} />
            <Section style={{ paddingBottom: "20px" }}>
              <Text style={paragraph}>Hi {vendorName}!</Text>
              <Text style={heading}>
                You got a message from {userName}, here&apos;s what they said!
              </Text>
            </Section>
            <Section style={{ paddingBottom: "20px" }}>
              <Button style={button} href={"https://www.sarangsayang.com/"}>
                View Message on Sarang Sayang
              </Button>
            </Section>
            <Hr style={hr} />
            <Text style={footer}>
              This is an automated e-mail. Please use our chat function on
              Sarang Sayang to send messages directly to users.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

MessageUpdateFromUserEmail.PreviewProps = {
  userName: "Hairi",
  vendorName: "Fatimah Mokhsin",
} as MessageUpdateFromUserEmailProps;

export default MessageUpdateFromUserEmail;

const main = {
  backgroundColor: "#C8E9F3",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const box = {
  padding: "0 48px",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const userImage = {
  margin: "0 auto",
  marginBottom: "16px",
  borderRadius: "50%",
};

const heading = {
  fontSize: "20px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
};

const review = {
  ...paragraph,
  padding: "24px",
  backgroundColor: "#f2f3f3",
  borderRadius: "4px",
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

const link = {
  ...paragraph,
  color: "#ff5a5f",
  display: "block",
};

const reportLink = {
  fontSize: "14px",
  color: "#9ca299",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#9ca299",
  fontSize: "14px",
  marginBottom: "10px",
};
