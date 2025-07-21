interface AuthErrorNoticeProps {
  error: string;
}

const errorMap: { [key: string]: React.ReactElement } = {
  Configuration: (
    <p>
      There was a problem trying to sign you in. Please contact the site admin
      and give them this error code: <code>Configuration</code>
    </p>
  ),
  OAuthCallbackError: (
    <p>
      Looks like there was a problem trying to sign you in. If you'd like, try
      again.
    </p>
  ),
  AccessDenied: (
    <p>
      Sorry, you can't claim a handle on this site as you're not on the
      allowlist.
    </p>
  ),
  TimedOut: <p>Sorry, your session timed out. You'll need to sign in again.</p>,
  Default: (
    <p>
      An unexpected error happened trying to sign you in. If this keeps
      happening, reach out to the site admin.
    </p>
  ),
};

export default function AuthErrorNotice({ error }: AuthErrorNoticeProps) {
  return errorMap[error] || errorMap.Default;
}
