import * as React from "react";
import { Body, Button, Container, Head, Heading, Hr, Html, Preview, Text } from "@react-email/components";

const colors = {
  green900: "#142B22",
  green800: "#1B3A2F",
  yellow500: "#FFC934",
  cream050: "#FBF7EF",
  muted: "#6B6558",
  border: "#EAE3D6",
};

export function WaitlistVerificationEmail({ verifyLink }: { verifyLink: string }) {
  return (
    <Html lang="sv">
      <Head />
      <Preview>Bekräfta din plats på Kassepris väntelista</Preview>
      <Body style={{ backgroundColor: colors.cream050, fontFamily: "Arial, Helvetica, sans-serif", margin: 0, padding: "40px 0" }}>
        <Container style={{ backgroundColor: "#ffffff", borderRadius: 12, padding: "40px 32px", maxWidth: 480, margin: "0 auto" }}>
          <Heading style={{ color: colors.green800, fontSize: 22, fontWeight: 700, margin: "0 0 16px" }}>
            Kassepris
          </Heading>
          <Text style={{ color: colors.green900, fontSize: 16, lineHeight: "24px", margin: "0 0 24px" }}>
            Hej! Klicka på knappen nedan för att bekräfta din e-postadress och ta din plats på väntelistan.
          </Text>
          <Button
            href={verifyLink}
            style={{
              backgroundColor: colors.yellow500,
              color: colors.green900,
              fontSize: 16,
              fontWeight: 700,
              padding: "14px 28px",
              borderRadius: 8,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Bekräfta min e-postadress
          </Button>
          <Hr style={{ borderColor: colors.border, margin: "32px 0 16px" }} />
          <Text style={{ color: colors.muted, fontSize: 13, lineHeight: "20px", margin: 0 }}>
            Om du inte begärde detta kan du bortse från det här mejlet.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
