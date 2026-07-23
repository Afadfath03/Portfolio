import Link from "next/link";

export default function NotFound() {
  return (
    <div className="nf-wrap">
      <p className="nf-code">404</p>
      <p className="nf-msg">PAGE NOT FOUND</p>
      <p className="nf-sub">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="nf-home">
        BACK HOME
      </Link>
    </div>
  );
}
