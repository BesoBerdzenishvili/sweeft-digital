import { styled, keyframes } from "../stitches.config";

const LoadingContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "50px",
});

const spin = keyframes({
  "100%": { transform: "rotate(360deg)" },
});

const LoadingSpinner = styled("div", {
  border: "5px solid rgba(0, 0, 0, 0.1)",
  borderTopColor: "rgba(0, 0, 0, 0.8)",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  animation: `${spin} 1s linear infinite`,
});

export default function Loading() {
  return (
    <LoadingContainer>
      <LoadingSpinner />
    </LoadingContainer>
  );
}
