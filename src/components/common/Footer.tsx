import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer className="container mx-auto flex flex-col items-center justify-end bg-light-gray py-10 text-sm text-dark-gray">
        <ul className="mb-6 flex gap-6">
          <li>
            <Link href="/faq">FAQ</Link>
          </li>
          <li>
            <Link href="/counsel">문의하기</Link>
          </li>
          <li>
            <Link href="policy">개인정보처리방침</Link>
          </li>
        </ul>
        <div>
          <p className="text-middle-gray">© 2024 MEETIE ALL RIGHTS RESERVED</p>
        </div>
      </footer>
    </>
  );
}
