import Header from '@/components/common/Header';
import NavLink from '@/components/study/NavLink';

export default function StudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="m-auto w-full max-w-[600px] py-2">
        <NavLink />

        {children}
      </div>
    </>
  );
}
