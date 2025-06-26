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

interface MessageUpdateFromVendorEmailProps {
  vendorName: string;
  userName: string;
  message: string;
}

export const MessageUpdateFromVendorEmail = ({
  vendorName,
  userName,
  message,
}: MessageUpdateFromVendorEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reply {vendorName} on Sarang Sayang now!</Preview>

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
            <Section>
              <Text style={paragraph}>Hi {userName}!</Text>
              <Text style={heading}>
                You got a message from {vendorName}, here&apos;s what they said!
              </Text>
            </Section>
            <Section style={{ paddingBottom: "20px" }}>
              <Text style={review}>{message}</Text>
              <Button style={button} href={"https://www.sarangsayang.com/"}>
                View Message on Sarang Sayang
              </Button>
            </Section>
            <Hr style={hr} />
            <Text style={footer}>
              This is an auto-generated e-mail, please do not reply and only
              reply directly through our Sarang Sayang portal. All replies to
              this e-mail will be voided.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

MessageUpdateFromVendorEmail.PreviewProps = {
  userName: "Hairi",
  vendorName: "Fatimah Mokhsin",
  message: "Yeah, nice. See you Thursday!",
} as MessageUpdateFromVendorEmailProps;

export default MessageUpdateFromVendorEmail;

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
  width: "96%",
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
