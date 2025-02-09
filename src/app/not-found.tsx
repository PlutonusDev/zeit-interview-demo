import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <div className="flex-col space-y-2">
        <h1 className="text-4xl">Sorry!</h1>
        <h2 className="text-xl">We can't find the page you're looking for.</h2>
        <Link href="/" className="link link-animated text-brand-accent">Go Home</Link>
      </div>
    </div>
  );
}
