interface HostnameLandingContentProps {
  rootDomain: string;
}

export default function HostnameLandingContent({
  rootDomain,
}: HostnameLandingContentProps) {
  switch (rootDomain) {
    case "waypast.cool":
      return <WayPastCool />;
    default:
      return <div>welcome to {rootDomain}</div>;
  }
}

function WayPastCool() {
  return (
    <>
      {/** biome-ignore lint/a11y/useMediaCaption: nothing to caption */}
      <video controls loop>
        <source src="/static-assets/sonic-underground.webm" type="video/webm" />

        <source src="/static-assets/sonic-underground.mp4" type="video/mp4" />
      </video>
    </>
  );
}
